/**
 * SayByMe Fireworks Engine – Framework-free, Canvas 2D
 * 7 burst types: heart, double-heart, peony, ring, star, willow, crackle
 * Additive ("lighter") blending + cached glow sprites
 */

export type BurstKind =
  | "heart"
  | "double-heart"
  | "peony"
  | "ring"
  | "star"
  | "willow"
  | "crackle";

export type LaunchOptions = {
  x?: number;
  y?: number;
  kind?: BurstKind;
  big?: boolean;
};

export const DEFAULT_PALETTE = [
  "#FF4D6D",
  "#FF758F",
  "#FF8FA3",
  "#FFB3C1",
  "#FFD6A5",
  "#FFE5EC",
  "#C9A7FF",
];

const TAU = Math.PI * 2;
const MAX_PARTICLES = 160;
const TRAIL = 3;
const GOLD = "#FFD9A0";
const CREAM = "#FFE9C7";

const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type Particle = {
  x: number; y: number; vx: number; vy: number;
  age: number; life: number; size: number; color: string;
  drag: number; gravity: number; flicker: boolean; seed: number;
  trail: number; crackle: boolean; tx: number[]; ty: number[];
};

type SpawnOpts = {
  x: number; y: number; vx: number; vy: number;
  life: number; size: number; color: string;
  drag?: number; gravity?: number; flicker?: boolean; trail?: number; crackle?: boolean;
};

type Rocket = {
  x0: number; y0: number; vx: number; vy: number; g: number; dur: number;
  age: number; px: number; py: number; acc: number; kind: BurstKind; big: boolean;
};
type Flash = { x: number; y: number; r: number; age: number; life: number; color: string };
type Ring = { x: number; y: number; max: number; age: number; life: number; color: string };

const makeParticle = (): Particle => ({
  x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1, size: 2, color: "#fff",
  drag: 1.8, gravity: 0, flicker: false, seed: 0, trail: 0, crackle: false,
  tx: new Array(TRAIL).fill(0), ty: new Array(TRAIL).fill(0),
});

type Outline = (t: number) => [number, number];

// Pure mathematical heart equation (precise, symmetric, romantic)
const heartOutline: Outline = (t) => {
  const hx = 16 * Math.sin(t) ** 3;
  const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return [hx / 17, (hy - 2.5) / 17];
};
const circleOutline: Outline = (t) => [Math.cos(t), Math.sin(t)];
const starOutline: Outline = (t) => {
  const seg = TAU / 10;
  const idx = Math.floor((t % TAU) / seg);
  const a = ((t % TAU) % seg) / seg;
  const r = idx % 2 === 0 ? 1 - 0.58 * a : 0.42 + 0.58 * a;
  return [Math.cos(t - Math.PI / 2) * r, Math.sin(t - Math.PI / 2) * r];
};

export class FireworksEngine {
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private scale = 1;

  private live: Particle[] = [];
  private pool: Particle[] = [];
  private rockets: Rocket[] = [];
  private flashes: Flash[] = [];
  private rings: Ring[] = [];
  private timeline: { t: number; fn: () => void }[] = [];
  private sprites = new Map<string, HTMLCanvasElement>();

  private time = 0;
  private last = 0;
  private raf = 0;
  private running = false;
  private auto = false;
  private nextAuto = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private palette: string[] = DEFAULT_PALETTE,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D not supported");
    this.ctx = ctx;
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.w = Math.max(1, Math.round(r.width));
    this.h = Math.max(1, Math.round(r.height));
    // Fixed DPR 1.0 for instant 60 FPS on mobile and high-density retina displays
    this.dpr = 1;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.scale = clamp(Math.min(this.w, this.h * 0.55) / 320, 0.75, 1.25);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      const dt = Math.min((now - this.last) / 1000, 0.05);
      this.last = now;
      this.step(dt);
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    this.live = [];
    this.pool = [];
    this.rockets = [];
    this.flashes = [];
    this.rings = [];
    this.timeline = [];
    this.sprites.clear();
  }

  schedule(delaySec: number, fn: () => void) {
    this.timeline.push({ t: this.time + delaySec, fn });
  }

  setAuto(on: boolean) {
    this.auto = on;
    this.nextAuto = this.time + 0.6;
  }

  launch(o: LaunchOptions = {}) {
    if (this.w === 0) return;
    const tx = o.x !== undefined ? o.x : rand(this.w * 0.22, this.w * 0.78);
    const ty = o.y !== undefined ? o.y : rand(this.h * 0.16, this.h * 0.42);
    const x0 = clamp(tx + rand(-0.08, 0.08) * this.w, 0, this.w);
    const y0 = this.h + 8;
    // Faster, snappier rocket flight
    const dur = rand(0.55, 0.8);
    const vy = (-2 * (y0 - ty)) / dur;
    this.rockets.push({
      x0, y0, vx: (tx - x0) / dur, vy, g: -vy / dur, dur,
      age: 0, px: x0, py: y0, acc: 0,
      kind: o.kind ?? this.randomKind(), big: !!o.big,
    });
  }

  playShow() {
    // Minimal, graceful choreography: each burst has breathing room
    const script: [number, BurstKind, number, number][] = [
      [0.2, "heart", 0.5, 0.28],
      [1.5, "double-heart", 0.5, 0.32],
      [3.0, "heart", 0.3, 0.26],
      [3.3, "heart", 0.7, 0.26],
      [4.8, "star", 0.5, 0.25],
    ];
    script.forEach(([at, kind, fx, fy]) =>
      this.schedule(at, () => this.launch({ kind, x: this.w * fx, y: this.h * fy })),
    );
    this.schedule(5.8, () => this.setAuto(true));
  }

  snapshot() {
    if (this.w === 0) this.resize();
    ([
      [0.5, 0.28, "heart"],
      [0.28, 0.34, "double-heart"],
      [0.72, 0.34, "star"],
    ] as [number, number, BurstKind][]).forEach(([fx, fy, kind]) =>
      this.explode(kind, this.w * fx, this.h * fy, false),
    );
    for (let i = 0; i < 35; i++) this.step(1 / 60);
    this.draw();
  }

  private randomKind(): BurstKind {
    const r = Math.random();
    if (r < 0.45) return "heart";
    if (r < 0.75) return "double-heart";
    if (r < 0.9) return "star";
    return "ring";
  }

  private spawn(o: SpawnOpts) {
    if (this.live.length >= MAX_PARTICLES) return;
    const p = this.pool.pop() ?? makeParticle();
    p.x = o.x; p.y = o.y; p.vx = o.vx; p.vy = o.vy;
    p.life = o.life; p.size = o.size; p.color = o.color;
    p.drag = o.drag ?? 2.2; p.gravity = o.gravity ?? 0;
    p.flicker = o.flicker ?? false; p.crackle = o.crackle ?? false;
    p.trail = o.trail ?? 0; p.age = 0; p.seed = Math.random() * TAU;
    if (p.trail > 0) for (let k = 0; k < TRAIL; k++) { p.tx[k] = o.x; p.ty[k] = o.y; }
    this.live.push(p);
  }

  // Precision shape emitter: zero jitter so geometry is razor-sharp
  private shape(
    x: number, y: number, outline: Outline, n: number, radius: number,
    o: {
      color: string | (() => string);
      lambda?: number; life?: [number, number]; size?: number; gravity?: number;
      trail?: number; flicker?: boolean; crackle?: boolean;
    },
  ) {
    const S = this.scale;
    const lambda = o.lambda ?? 2.3;
    for (let i = 0; i < n; i++) {
      const [ux, uy] = outline((i / n) * TAU);
      this.spawn({
        x, y,
        vx: ux * radius * lambda,
        vy: uy * radius * lambda,
        life: rand(...(o.life ?? [1.3, 1.8])),
        size: (o.size ?? 2.3) * S,
        color: typeof o.color === "function" ? o.color() : o.color,
        drag: lambda,
        gravity: (o.gravity ?? 45) * S,
        trail: o.trail, flicker: o.flicker, crackle: o.crackle,
      });
    }
  }

  private explode(kind: BurstKind, x: number, y: number, big: boolean) {
    const S = this.scale * (big ? 1.25 : 1);
    const c1 = pick(this.palette);
    const c2 = pick(this.palette.filter((c) => c !== c1)) || c1;

    this.flashes.push({ x, y, r: 80 * S, age: 0, life: 0.35, color: c1 });
    this.rings.push({ x, y, max: 95 * S, age: 0, life: 0.45, color: c1 });

    switch (kind) {
      case "heart":
        // 34 precision perimeter particles forming a clean, razor-sharp heart contour
        this.shape(x, y, heartOutline, 34, 88 * S, { color: c1, life: [1.3, 1.7], size: 2.3 });
        // 1 bright twinkling center spark
        this.spawn({
          x, y, vx: 0, vy: -5 * S, life: 0.7, size: 2.2 * S, color: "#FFFFFF", flicker: true,
        });
        break;
      case "double-heart":
        // Outer heart (32 sparks) + Inner concentric heart (20 sparks)
        this.shape(x, y, heartOutline, 32, 92 * S, { color: c1, life: [1.3, 1.7], size: 2.3 });
        this.shape(x, y, heartOutline, 20, 52 * S, { color: c2, life: [1.1, 1.5], size: 2.0 });
        break;
      case "star":
        this.shape(x, y, starOutline, 30, 95 * S, { color: c1, lambda: 2.2, life: [1.2, 1.6], size: 2.2 });
        break;
      case "ring":
        this.shape(x, y, circleOutline, 28, 90 * S, { color: c1, lambda: 2.1, life: [1.2, 1.6], size: 2.2 });
        break;
      case "peony":
        this.shape(x, y, circleOutline, 36, 92 * S, {
          color: () => (Math.random() < 0.75 ? c1 : "#FFFFFF"),
          lambda: 1.9, life: [1.2, 1.7], gravity: 45, size: 2.0,
        });
        break;
      case "willow":
        this.shape(x, y, circleOutline, 22, 90 * S, {
          color: () => GOLD,
          lambda: 1.1, life: [2.0, 2.6], gravity: 65, trail: TRAIL, size: 2.0,
        });
        break;
      case "crackle":
        this.shape(x, y, circleOutline, 24, 88 * S, {
          color: () => GOLD,
          lambda: 1.8, life: [1.0, 1.4], size: 1.8, crackle: true,
        });
        break;
    }
  }

  private step(dt: number) {
    const S = this.scale;
    this.time += dt;

    if (this.timeline.length) {
      const due = this.timeline.filter((e) => e.t <= this.time).sort((a, b) => a.t - b.t);
      if (due.length) {
        this.timeline = this.timeline.filter((e) => e.t > this.time);
        due.forEach((e) => e.fn());
      }
    }

    if (this.auto && this.time >= this.nextAuto) {
      this.launch({ kind: Math.random() < 0.65 ? "heart" : "double-heart" });
      this.nextAuto = this.time + rand(1.8, 2.8);
    }

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.age += dt;
      const t = Math.min(r.age, r.dur);
      r.px = r.x0 + r.vx * t;
      r.py = r.y0 + r.vy * t + 0.5 * r.g * t * t;
      // Minimal rocket spark trail: 10 sparks/sec
      r.acc += dt * 10;
      while (r.acc >= 1) {
        r.acc -= 1;
        this.spawn({
          x: r.px, y: r.py,
          vx: rand(-8, 8) * S, vy: rand(5, 25) * S,
          life: rand(0.2, 0.4), size: 1.3 * S, color: GOLD,
          drag: 1.5, gravity: 40 * S, flicker: true,
        });
      }
      if (r.age >= r.dur) {
        this.rockets.splice(i, 1);
        this.explode(r.kind, r.px, r.py, r.big);
      }
    }

    for (let i = this.live.length - 1; i >= 0; i--) {
      const p = this.live[i];
      const k = Math.exp(-p.drag * dt);
      p.vx *= k;
      p.vy = p.vy * k + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.age += dt;
      if (p.trail > 0) {
        for (let j = p.trail - 1; j > 0; j--) { p.tx[j] = p.tx[j - 1]; p.ty[j] = p.ty[j - 1]; }
        p.tx[0] = p.x; p.ty[0] = p.y;
      }
      if (p.age >= p.life) {
        if (p.crackle) {
          this.spawn({
            x: p.x, y: p.y, vx: rand(-25, 25) * S, vy: rand(-25, 25) * S,
            life: rand(0.15, 0.3), size: 1.2 * S,
            color: "#FFFFFF",
            drag: 3, gravity: 30 * S, flicker: true,
          });
        }
        this.live[i] = this.live[this.live.length - 1];
        this.live.pop();
        this.pool.push(p);
      }
    }

    for (let i = this.flashes.length - 1; i >= 0; i--) {
      this.flashes[i].age += dt;
      if (this.flashes[i].age >= this.flashes[i].life) this.flashes.splice(i, 1);
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      this.rings[i].age += dt;
      if (this.rings[i].age >= this.rings[i].life) this.rings.splice(i, 1);
    }
  }

  // Pre-rendered 20x20 crisp glow sprite (extremely lightweight on mobile GPUs)
  private sprite(color: string) {
    let s = this.sprites.get(color);
    if (s) return s;
    s = document.createElement("canvas");
    s.width = s.height = 20;
    const g = s.getContext("2d");
    if (!g) return s;
    const n = parseInt(color.slice(1), 16);
    const rgb = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
    const grad = g.createRadialGradient(10, 10, 0, 10, 10, 10);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, `rgba(${rgb},0.95)`);
    grad.addColorStop(0.6, `rgba(${rgb},0.25)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 20, 20);
    this.sprites.set(color, s);
    return s;
  }

  private draw() {
    const { ctx, w, h } = this;
    const S = this.scale;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    // Shock rings
    for (const g of this.rings) {
      const t = g.age / g.life;
      ctx.globalAlpha = Math.max(0, (1 - t) * 0.35);
      ctx.strokeStyle = g.color;
      ctx.lineWidth = 1.2 * S;
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.max * (1 - (1 - t) ** 3), 0, TAU);
      ctx.stroke();
    }

    // Sky flashes
    for (const f of this.flashes) {
      const t = f.age / f.life;
      const r = f.r * (0.6 + 0.4 * t);
      ctx.globalAlpha = Math.max(0, (1 - t) ** 2 * 0.4);
      ctx.drawImage(this.sprite(f.color), f.x - r, f.y - r, r * 2, r * 2);
    }

    // Rockets
    for (const r of this.rockets) {
      const t = Math.min(r.age, r.dur);
      const vy = r.vy + r.g * t;
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.6 * S;
      ctx.beginPath();
      ctx.moveTo(r.px, r.py);
      ctx.lineTo(r.px - r.vx * 0.03, r.py - vy * 0.03);
      ctx.stroke();
      ctx.globalAlpha = 1;
      const d = 10 * S;
      ctx.drawImage(this.sprite("#FFE9C7"), r.px - d / 2, r.py - d / 2, d, d);
    }

    // Pass 1: Batched willow trails
    for (let i = 0; i < this.live.length; i++) {
      const p = this.live[i];
      if (p.trail > 1) {
        const lf = 1 - p.age / p.life;
        if (lf <= 0.01) continue;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = lf * 0.5;
        ctx.lineWidth = Math.max(0.6, p.size * 0.65);
        ctx.beginPath();
        ctx.moveTo(p.tx[0], p.ty[0]);
        for (let k = 1; k < p.trail; k++) {
          ctx.lineTo(p.tx[k], p.ty[k]);
        }
        ctx.stroke();
      }
    }

    // Pass 2: Precision glowing particle sprites
    for (let i = 0; i < this.live.length; i++) {
      const p = this.live[i];
      const lf = 1 - p.age / p.life;
      if (lf <= 0.01) continue;

      let a = lf;
      if (p.flicker) {
        a *= 0.55 + 0.45 * Math.sin(p.age * 38 + p.seed);
      }
      if (a <= 0.02) continue;

      ctx.globalAlpha = Math.min(1, a);
      const d = p.size * 3.8 * (0.6 + 0.4 * lf);
      ctx.drawImage(this.sprite(p.color), p.x - d / 2, p.y - d / 2, d, d);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
