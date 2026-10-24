"use client";

import { useEffect, useRef, useState } from "react";
import { FireworksEngine } from "@/lib/fireworksEngine";

export interface ProposalExperienceProps {
  senderName: string;
  recipientName: string;
  question: string;
  message: string;
  celebrations?: string[];
  isStandalone?: boolean; // full-screen recipient view vs preview inside phone frame
  onAccept?: () => void;
}

const CARDS_DATA = [
  { img: "/images/memory_1.gif", title: "Forever", quote: "With you, forever feels too short. 💖" },
  { img: "/images/memory_2.gif", title: "Every Moment", quote: "Every smile we share is my favourite memory. ✨" },
  { img: "/images/memory_3.gif", title: "My Whole World", quote: "You make ordinary days feel like poetry. 🌸" },
  { img: "/images/memory_4.gif", title: "Our Story", quote: "The sweetest chapter began the day I met you. 💌" },
  { img: "/images/memory_5.gif", title: "Always You", quote: "If I lived a thousand lives, I'd choose you in every one. 💗" },
];

export function ProposalExperience({
  senderName,
  recipientName,
  question,
  message,
  celebrations = ["memories", "fireworks"],
  isStandalone = false,
  onAccept,
}: ProposalExperienceProps) {
  // Stages: 1=welcome, 2=intro, 3=letter, 4=question, 5=memories, 6=fireworks, 7=finale
  const [stage, setStage] = useState<number>(1);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [tapHintVisible, setTapHintVisible] = useState(true);

  // Question Stage No Button evasion state
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);

  // Memories Deck Autoplay
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckActiveDot, setDeckActiveDot] = useState(0);
  const deckAnimRef = useRef<number | null>(null);
  const deckPausedRef = useRef(false);
  const deckResumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fireworks
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FireworksEngine | null>(null);
  const [fireworksOverlayVisible, setFireworksOverlayVisible] = useState(false);
  const [fireworksHintVisible, setFireworksHintVisible] = useState(true);
  const lastTapRef = useRef(0);

  // Envelope Open Interaction
  const handleEnvelopeClick = () => {
    if (envelopeOpen) return;
    setEnvelopeOpen(true);
    setTapHintVisible(false);
    setTimeout(() => {
      setStage(3); // Directly to letter
    }, 900);
  };

  // Evasive "No" Button
  const handleNoEvade = () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 55 + Math.random() * 55;
    const x = Math.round(Math.cos(angle) * dist);
    const y = Math.round(Math.sin(angle) * dist);
    setNoPos({ x, y });
  };

  // "Yes" Click
  const handleYes = () => {
    if (onAccept) onAccept();
    setStage(5); // Go to Memories
  };

  // Auto-scroll loop for Polaroid Deck in Stage 5
  useEffect(() => {
    if (stage !== 5) {
      if (deckAnimRef.current) cancelAnimationFrame(deckAnimRef.current);
      if (deckResumeTimerRef.current) clearTimeout(deckResumeTimerRef.current);
      return;
    }

    const deck = deckRef.current;
    if (!deck) return;

    let pos = deck.scrollLeft;
    const speed = 0.55;

    const scrollLoop = () => {
      if (!deckPausedRef.current && deck) {
        const singleSetWidth = (deck.scrollWidth || 0) / 2;
        if (singleSetWidth > 0) {
          pos += speed;
          if (pos >= singleSetWidth) {
            pos -= singleSetWidth;
          }
          deck.scrollLeft = pos;
          const idx = Math.floor((pos / singleSetWidth) * 5) % 5;
          setDeckActiveDot(idx);
        }
      }
      deckAnimRef.current = requestAnimationFrame(scrollLoop);
    };

    deckAnimRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (deckAnimRef.current) cancelAnimationFrame(deckAnimRef.current);
      if (deckResumeTimerRef.current) clearTimeout(deckResumeTimerRef.current);
    };
  }, [stage]);

  // Touch / Drag handler for Polaroid Deck
  const handleDeckTouchStart = () => {
    deckPausedRef.current = true;
    if (deckResumeTimerRef.current) clearTimeout(deckResumeTimerRef.current);
  };

  const handleDeckTouchEnd = () => {
    deckResumeTimerRef.current = setTimeout(() => {
      deckPausedRef.current = false;
      if (deckRef.current) {
        // sync position
        const singleSetWidth = (deckRef.current.scrollWidth || 0) / 2;
        if (singleSetWidth > 0 && deckRef.current.scrollLeft >= singleSetWidth) {
          deckRef.current.scrollLeft -= singleSetWidth;
        }
      }
    }, 1800);
  };

  // Fireworks Engine in Stage 6
  useEffect(() => {
    if (stage !== 6) {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FireworksEngine(canvas);
    engineRef.current = engine;
    engine.resize();

    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(canvas);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      engine.snapshot();
      setFireworksOverlayVisible(true);
      setFireworksHintVisible(false);
    } else {
      engine.start();
      engine.playShow();
      const t1 = setTimeout(() => setFireworksOverlayVisible(true), 3400);
      const t2 = setTimeout(() => setFireworksHintVisible(false), 9000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        ro.disconnect();
        engine.destroy();
        engineRef.current = null;
      };
    }
  }, [stage]);

  // Canvas Tap to launch custom rocket
  const handleCanvasTap = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const now = performance.now();
    if (now - lastTapRef.current < 140) return;
    lastTapRef.current = now;
    if (!engineRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    engineRef.current.launch({
      x: e.clientX - r.left,
      y: Math.min(e.clientY - r.top, r.height * 0.62),
      kind: Math.random() < 0.55 ? "heart" : "double-heart",
    });
    setFireworksHintVisible(false);
  };

  // 26 Twinkling Stars
  const stars = Array.from({ length: 26 }, (_, i) => ({
    l: `${(i * 37 + 11) % 97}%`,
    t: `${(i * 23 + 7) % 52}%`,
    d: `${((i * 0.37) % 2.4).toFixed(2)}s`,
    s: i % 5 === 0 ? 12 : 8,
  }));

  const containerStyle: React.CSSProperties = isStandalone
    ? {
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFF5F7 0%, #FFCCD5 50%, #FFB3C1 100%)",
        overflow: "hidden",
      }
    : {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      };

  return (
    <div style={containerStyle}>
      <div
        className={isStandalone ? "phoneFrame standaloneExperienceFrame" : "phoneScreen"}
        style={isStandalone ? { width: "100%", maxWidth: "420px", height: "92vh", maxHeight: "860px", margin: "auto", position: "relative" } : { width: "100%", height: "100%" }}
      >
        {/* STAGE 1: WELCOME ENVELOPE */}
        {stage === 1 && (
          <div className="sbmStageBox" style={{ display: "flex" }}>
            <div className="sbmStageContent">
              <div
                className={`sbmEnvelope ${envelopeOpen ? "is-open" : "sbm-bob"}`}
                onClick={handleEnvelopeClick}
                style={{ cursor: "pointer" }}
              >
                <div className="sbmEnvelopeBack" />
                <div className="sbmStamp">💌</div>
                <div className="sbmEnvelopeFlap" />
                <div className="sbmWaxSeal">♥</div>
                <div className="sbmEnvelopeFront" />
                <div className="sbmEnvelopeLabel">
                  <span>For {recipientName}</span>
                </div>
              </div>
              <p
                className="sbmSubtext sbm-fade"
                style={{
                  marginTop: "22px",
                  fontSize: "14px",
                  opacity: tapHintVisible ? 0.8 : 0,
                  transition: "opacity 0.4s",
                }}
              >
                Tap to open ✨
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: HANDWRITTEN LOVE LETTER */}
        {stage === 3 && (
          <div className="sbmStageBox" style={{ display: "flex" }}>
            <div className="sbmStageContent" style={{ width: "100%", padding: "20px 18px" }}>
              <div className="sbmLetterPaper sbm-fade" style={{ maxHeight: "440px", overflowY: "auto" }}>
                <p className="sbmHandTitle" style={{ fontSize: "24px", color: "#D75070" }}>
                  Dear {recipientName},
                </p>
                <p
                  className="sbmHandwriting"
                  style={{ marginTop: "12px", fontSize: "19px", lineHeight: "1.45", color: "#92364C", whiteSpace: "pre-wrap" }}
                >
                  {message}
                </p>
                <p className="sbmHandwriting" style={{ marginTop: "16px", textAlign: "right", fontSize: "18px", color: "#A45D6C" }}>
                  — {senderName} 💗
                </p>
              </div>
              <button
                type="button"
                className="sbmPrimaryBtn sbm-pop"
                style={{ marginTop: "18px", padding: "10px 28px", fontSize: "15px" }}
                onClick={() => setStage(4)}
              >
                <span>Continue</span>
                <span>💕</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: PROPOSAL QUESTION */}
        {stage === 4 && (
          <div className="sbmStageBox" style={{ display: "flex" }}>
            <div className="sbmStageContent" style={{ width: "100%", padding: "10px 20px" }}>
              <div style={{ fontSize: "52px", marginBottom: "8px" }} className="sbm-bob">
                🧸
              </div>
              <h2 className="sbmHandTitle" style={{ fontSize: "30px", color: "#92364C", lineHeight: "1.2" }}>
                {question}
              </h2>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px", position: "relative" }}>
                <button
                  type="button"
                  className="sbmPrimaryBtn sbm-pop"
                  style={{ padding: "12px 30px", fontSize: "16px" }}
                  onClick={handleYes}
                >
                  <span>Yes</span>
                  <span>💖</span>
                </button>
                <button
                  type="button"
                  className="sbmNoBtn"
                  style={{
                    padding: "10px 24px",
                    fontSize: "15px",
                    background: "#FFF0F3",
                    border: "1.5px solid #F7A8B4",
                    borderRadius: "9999px",
                    color: "#A45D6C",
                    transform: noPos ? `translate(${noPos.x}px, ${noPos.y}px)` : "none",
                    transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  onMouseEnter={handleNoEvade}
                  onTouchStart={handleNoEvade}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: MEMORIES POLAROID DECK */}
        {stage === 5 && (
          <div className="sbmStageBox" style={{ display: "flex", background: "linear-gradient(180deg, #FFF0F3 0%, #FFE5EC 100%)" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "20px 0 16px 0", boxSizing: "border-box" }}>
              {/* Header Title */}
              <div style={{ textAlign: "center", padding: "0 16px", marginBottom: "4px" }}>
                <h3 className="sbmHandTitle" style={{ fontSize: "25px", color: "#92364C", margin: 0 }}>
                  Cute GIFs 💖
                </h3>
              </div>

              {/* Card Deck Scroll Container */}
              <div
                ref={deckRef}
                className="sbmDeckTrack"
                onTouchStart={handleDeckTouchStart}
                onTouchEnd={handleDeckTouchEnd}
                onMouseDown={handleDeckTouchStart}
                onMouseUp={handleDeckTouchEnd}
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "14px",
                  overflowX: "auto",
                  padding: "10px 18px",
                  scrollBehavior: "smooth",
                  cursor: "grab",
                }}
              >
                {/* 2 Sets of 5 cards for continuous infinite scroll */}
                {[...CARDS_DATA, ...CARDS_DATA].map((card, idx) => (
                  <div
                    key={idx}
                    className="sbmDeckCard"
                    style={{
                      flex: "0 0 200px",
                      background: "#ffffff",
                      padding: "10px 10px 14px 10px",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px -6px rgba(146, 54, 76, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      border: "1px solid rgba(247, 168, 180, 0.4)",
                      userSelect: "none",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{
                        width: "180px",
                        height: "170px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        pointerEvents: "none",
                      }}
                    />
                    <p className="sbmHandwriting" style={{ margin: "10px 0 0 0", fontSize: "17px", fontWeight: "bold", color: "#92364C" }}>
                      {card.title}
                    </p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#A45D6C", textAlign: "center", lineHeight: "1.3" }}>
                      {card.quote}
                    </p>
                  </div>
                ))}
              </div>

              {/* Deck Dots */}
              <div style={{ display: "flex", gap: "6px", margin: "6px 0" }}>
                {CARDS_DATA.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: deckActiveDot === i ? "18px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: deckActiveDot === i ? "#F45D75" : "#F7A8B4",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Romantic Quote */}
              <div style={{ padding: "0 18px", textAlign: "center", maxWidth: "310px", background: "transparent" }}>
                <p className="sbmHandwriting" style={{ fontSize: "15px", color: "#92364C", lineHeight: "1.4", margin: 0 }}>
                  “Every little moment, every cute cuddle, every sweet heartbeat — your love story deserves to be celebrated with these adorable cute GIFs. 💗”
                </p>
              </div>

              {/* Next Button */}
              <button
                type="button"
                className="sbmPrimaryBtn sbm-pop"
                onClick={() => setStage(6)}
                style={{ margin: "8px 0 2px 0", padding: "10px 28px", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>Next</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 6: HEART FIREWORKS CELEBRATION */}
        {stage === 6 && (
          <div className="sbmFireworksView" style={{ display: "block" }}>
            {/* Stars */}
            <div className="sbmSkyStars">
              {stars.map((s, idx) => (
                <span
                  key={idx}
                  className="sbm-twinkle"
                  style={{ left: s.l, top: s.t, animationDelay: s.d, fontSize: `${s.s}px` }}
                >
                  ✦
                </span>
              ))}
            </div>

            {/* Moon */}
            <div className="sbmMoon" />

            {/* Hills SVG */}
            <svg aria-hidden="true" className="sbmHillsSvg" viewBox="0 0 340 160" preserveAspectRatio="none">
              <path d="M0 70 C50 40 90 60 140 52 C200 42 250 20 340 56 L340 160 L0 160Z" fill="#1c0e30" />
              <path d="M0 110 C60 84 110 100 170 92 C230 84 280 70 340 96 L340 160 L0 160Z" fill="#150a26" />
              <circle cx="30" cy="128" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="58" cy="122" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="96" cy="126" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="150" cy="118" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="214" cy="112" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="262" cy="120" r="1.4" fill="#FFD6A5" opacity="0.85" />
              <circle cx="304" cy="114" r="1.4" fill="#FFD6A5" opacity="0.85" />
            </svg>

            {/* Canvas */}
            <canvas ref={canvasRef} className="sbmFireworksCanvas" onPointerDown={handleCanvasTap} />

            {/* Tap Hint */}
            {fireworksHintVisible && (
              <p className="sbmFireworksHint" style={{ opacity: 1 }}>
                Tap the sky ✨
              </p>
            )}

            {/* Overlay Message */}
            <div className={`sbmFireworksBottom ${fireworksOverlayVisible ? "is-visible" : ""}`}>
              <p className="sbmFireworksTitle">{recipientName} said YES!</p>
              <p className="sbmFireworksMsg">
                You made {senderName}'s whole world brighter. Thank you for saying yes! 💗
              </p>
              <button
                type="button"
                className="sbmPrimaryBtn sbm-pop"
                onClick={() => setStage(7)}
                style={{ marginTop: "15px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>Finish 💗</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 7: FINALE */}
        {stage === 7 && (
          <div className="sbmStageBox" style={{ display: "flex" }}>
            <div className="sbmStageContent" style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "56px" }} className="sbm-pop">
                💖
              </div>
              <h2 className="sbmHandTitle" style={{ fontSize: "32px", color: "#92364C", marginTop: "12px" }}>
                Thank you, {recipientName}
              </h2>
              <p className="sbmSubtext" style={{ maxWidth: "260px", marginTop: "10px", fontSize: "16px", color: "#A45D6C" }}>
                This is where {senderName} and you begin your next beautiful chapter.
              </p>
              <button
                type="button"
                className="sbmPrimaryBtn sbm-pop"
                onClick={() => setStage(1)}
                style={{ marginTop: "24px", padding: "10px 24px", fontSize: "14px" }}
              >
                <span>Replay ↻</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
