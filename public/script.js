// ==============================================================================
// SayByMe — Exact Logic, Multi-step Navigation & Traced Background HEARTS
// ==============================================================================

// Heart SVG generator helper for ambient background hearts
function createHeartSvg(fill = "#ff5c6c", stroke = "#a8323f", sw = 1.5, className = "", style = {}) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 22");
  svg.setAttribute("aria-hidden", "true");
  if (className) svg.setAttribute("class", className);

  Object.assign(svg.style, style);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 21C5 15.5 1.5 11.8 1.5 7.4 1.5 4.2 4 2 6.8 2c2 0 3.7 1 5.2 3 1.5-2 3.2-3 5.2-3 2.8 0 5.3 2.2 5.3 5.4 0 4.4-3.5 8.1-10.5 13.600z"
  );
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", String(sw));
  path.setAttribute("stroke-linejoin", "round");

  svg.appendChild(path);
  return svg;
}

// Step 1 ambient background floating hearts (8 hearts)
const HEARTS_STEP1 = [
  { l: 11.5, t: 41, z: 32, c: "#ff9aa5", d: 0.8, u: 7, plain: true },
  { l: 21, t: 55.5, z: 20, c: "#ff9aa5", d: 1.2, u: 6, plain: true },
  { l: 12.5, t: 72, z: 20, c: "#ff7a88", d: 0.3, u: 6 },
  { l: 24, t: 82, z: 32, c: "#ff9aa5", d: 2, u: 7 },
  { l: 85, t: 26, z: 18, c: "#ffb0ba", d: 0.6, u: 6, plain: true },
  { l: 89.5, t: 52, z: 38, c: "#ff9aa5", d: 1.4, u: 7, plain: true },
  { l: 85.5, t: 67, z: 18, c: "#ff8d9b", d: 0.2, u: 5.5, plain: true },
  { l: 71, t: 83.5, z: 24, c: "#ff8d9b", d: 1, u: 6, plain: true },
];

// Step 2 ambient background floating hearts (15 hearts traced from reference)
const HEARTS_STEP2 = [
  { l: 12.5, t: 23.5, z: 36, c: "#ff8d9b", d: 0, u: 6, plain: true },
  { l: 11.8, t: 41, z: 18, c: "#ff7a88", d: 0.8, u: 6.5, plain: true },
  { l: 20.5, t: 51.5, z: 28, c: "#ff7a88", d: 1.2, u: 7 },
  { l: 7.8, t: 58.5, z: 16, c: "#ff9aa5", d: 0.4, u: 5.5, plain: true },
  { l: 13, t: 69.5, z: 20, c: "#ff8d9b", d: 1.8, u: 6, plain: true },
  { l: 26, t: 69, z: 20, c: "#ff7a88", d: 0.6, u: 6.5, plain: true },
  { l: 23.5, t: 80, z: 28, c: "#ff9aa5", d: 2, u: 7 },
  { l: 85, t: 26.5, z: 34, c: "#ff9aa5", d: 1, u: 6, plain: true },
  { l: 75.2, t: 40.5, z: 24, c: "#ff8d9b", d: 0.3, u: 5.5, plain: true },
  { l: 77.8, t: 54.5, z: 26, c: "#ff7280", d: 1.5, u: 6.5 },
  { l: 74.8, t: 58.5, z: 18, c: "#ff8d9b", d: 0.9, u: 5, plain: true },
  { l: 94.5, t: 47, z: 22, c: "#ff6a78", d: 0.2, u: 6 },
  { l: 77.3, t: 78.5, z: 16, c: "#ff8d9b", d: 1.1, u: 5.5, plain: true },
  { l: 62.8, t: 85.5, z: 26, c: "#ff9aa5", d: 1.7, u: 7, plain: true },
  { l: 85.3, t: 91.5, z: 20, c: "#ff8d9b", d: 0.5, u: 6, plain: true },
];

// Step 3 ambient background floating hearts (traced from Step 3 screenshot)
const HEARTS_STEP3 = [
  { l: 14, t: 24, z: 24, c: "#ff8d9b", d: 0.5, u: 6, plain: true },
  { l: 4.8, t: 36.5, z: 20, c: "#ff7a88", d: 1.2, u: 6.5, plain: true },
  { l: 5.2, t: 48, z: 24, c: "#ff8d9b", d: 0.2, u: 5.5, plain: true },
  { l: 24.5, t: 43.5, z: 18, c: "#ff7a88", d: 1.8, u: 6 },
  { l: 23, t: 50.5, z: 20, c: "#ff8d9b", d: 0.6, u: 6.5, plain: true },
  { l: 53.5, t: 61, z: 18, c: "#ff9aa5", d: 1.4, u: 7, plain: true },
  { l: 5, t: 61.5, z: 22, c: "#ff7280", d: 2, u: 7 },
  { l: 21.8, t: 76, z: 22, c: "#ff8d9b", d: 0.8, u: 5.8, plain: true },
  { l: 26.5, t: 90, z: 20, c: "#ff7a88", d: 1.1, u: 6.2, plain: true },
  { l: 87, t: 31, z: 28, c: "#ff8d9b", d: 0.3, u: 6.5, plain: true },
  { l: 77.2, t: 56, z: 22, c: "#ff7280", d: 1.5, u: 6 },
  { l: 94.5, t: 58, z: 20, c: "#ff8d9b", d: 0.9, u: 5.5, plain: true },
  { l: 76.5, t: 82, z: 20, c: "#ff8d9b", d: 1.7, u: 7, plain: true },
  { l: 87, t: 91.5, z: 22, c: "#ff7a88", d: 0.4, u: 6, plain: true },
];

// Step 4 ambient background floating hearts (traced from Step 4 screenshot)
const HEARTS_STEP4 = [
  { l: 17, t: 25.5, z: 24, c: "#ff8d9b", d: 0.5, u: 6, plain: true },
  { l: 13.8, t: 42, z: 18, c: "#ff7a88", d: 1.2, u: 6.5, plain: true },
  { l: 24.2, t: 52.8, z: 22, c: "#ff8d9b", d: 0.3, u: 5.5, plain: true },
  { l: 8.2, t: 60, z: 16, c: "#ff7a88", d: 1.8, u: 6 },
  { l: 28, t: 81, z: 18, c: "#ff8d9b", d: 0.6, u: 6.5, plain: true },
  { l: 85.5, t: 32.5, z: 26, c: "#ff9aa5", d: 1.4, u: 7, plain: true },
  { l: 91, t: 48, z: 16, c: "#ff7280", d: 2, u: 7 },
  { l: 75.8, t: 64, z: 22, c: "#ff8d9b", d: 0.8, u: 5.8, plain: true },
  { l: 92, t: 57, z: 18, c: "#ff7a88", d: 1.1, u: 6.2, plain: true },
  { l: 75.5, t: 84.5, z: 20, c: "#ff8d9b", d: 0.4, u: 6, plain: true },
  { l: 86.8, t: 92.5, z: 22, c: "#ff7a88", d: 1.6, u: 6.8, plain: true },
];

// Step 5 ambient background floating hearts (traced from Step 5 screenshot)
const HEARTS_STEP5 = [
  { l: 5, t: 18, z: 22, c: "#ff8d9b", d: 0.5, u: 6, plain: true },
  { l: 4, t: 28, z: 18, c: "#ff7a88", d: 1.2, u: 6.5, plain: true },
  { l: 2.5, t: 54, z: 18, c: "#ff9aa5", d: 0.3, u: 5.5, plain: true },
  { l: 8, t: 65, z: 22, c: "#ff7280", d: 1.8, u: 6 },
  { l: 21.5, t: 92, z: 20, c: "#ff8d9b", d: 0.6, u: 6.5, plain: true },
  { l: 60.5, t: 17, z: 16, c: "#ff8d9b", d: 1.4, u: 7, plain: true },
  { l: 94, t: 16, z: 18, c: "#ff7280", d: 2, u: 7 },
  { l: 61.5, t: 78.5, z: 16, c: "#ff8d9b", d: 0.8, u: 5.8, plain: true },
  { l: 75.5, t: 83.5, z: 18, c: "#ff7a88", d: 1.1, u: 6.2, plain: true },
  { l: 86.8, t: 91.5, z: 20, c: "#ff8d9b", d: 0.4, u: 6, plain: true },
];

function renderBackgroundHearts(heartsList) {
  const bgHeartsLayer = document.getElementById("background-hearts-layer");
  if (!bgHeartsLayer) return;
  bgHeartsLayer.innerHTML = "";

  heartsList.forEach((h) => {
    const heartSvg = createHeartSvg(
      h.c,
      h.plain ? "none" : "#a8323f",
      1.5,
      "float",
      {
        left: `${h.l}%`,
        top: `${h.t}%`,
        width: `${h.z}px`,
        animationDelay: `${h.d}s`,
        animationDuration: `${h.u}s`,
      }
    );
    bgHeartsLayer.appendChild(heartSvg);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const step4 = document.getElementById("step-4");
  const step5 = document.getElementById("step-5");
  const step7 = document.getElementById("step-7");
  const bearContainer = document.getElementById("bear-container");

  const homeForm = document.getElementById("home-form");
  const nameInput = document.getElementById("name-input");

  const recipientForm = document.getElementById("recipient-form");
  const recipientInput = document.getElementById("recipient-input");
  const backToStep1 = document.getElementById("back-to-step1");

  const questionForm = document.getElementById("question-form");
  const optionCards = document.querySelectorAll(".optionCard");
  const backToStep2 = document.getElementById("back-to-step2");

  const letterForm = document.getElementById("letter-form");
  const letterTextarea = document.getElementById("letter-input-text");
  const letterSalutation = document.getElementById("letterSalutation");
  const letterBodyDisplay = document.getElementById("letterBodyDisplay");
  const letterSenderName = document.getElementById("letterSenderName");
  const backToStep3 = document.getElementById("back-to-step3");
  const nudgeList = document.getElementById("nudgeList");

  const step5Form = document.getElementById("step5-form");
  const celebrateCards = document.querySelectorAll(".celebrateCard");
  const backToStep4 = document.getElementById("back-to-step4");

  // Step 7 Controls & Elements
  const previewRecipientHeading = document.getElementById("previewRecipientNameHeading");
  const summarySenderName = document.getElementById("summarySenderName");
  const summaryRecipientName = document.getElementById("summaryRecipientName");
  const summaryQuestion = document.getElementById("summaryQuestion");
  const summaryCelebrationPills = document.getElementById("summaryCelebrationPills");
  const btnBackToEdit = document.getElementById("btnBackToEdit");
  const btnGenerateLink = document.getElementById("btnGenerateLink");
  const btnReplayExperience = document.getElementById("btnReplayExperience");

  // Phone Internal Experience Stages
  const peStageWelcome = document.getElementById("peStageWelcome");
  const peWelcomeTitle = document.getElementById("peWelcomeTitle");
  const peWelcomeSubtitle = document.getElementById("peWelcomeSubtitle");
  const peWelEnvelopeWrap = document.getElementById("peWelEnvelopeWrap");
  const peWelEnvelope = document.getElementById("peWelEnvelope");
  const pePaperRecipient = document.getElementById("pePaperRecipient");
  const peWelSealBtn = document.getElementById("peWelSealBtn");
  const peSparksContainer = document.getElementById("peSparksContainer");
  const peTapHint = document.getElementById("peTapHint");

  function getHeartSvg(size = 20, className = "sbmHeartInline") {
    const h = Math.round((size * 30) / 32);
    return `<svg viewBox="0 0 32 30" width="${size}" height="${h}" class="${className}" fill="#FF728C" stroke="#92364C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 27 C14 24.5 3 17 3 9.5 C3 5 6.8 2 11.2 2 C13.6 2 15.2 3.2 16 4.5 C16.8 3.2 18.4 2 20.8 2 C25.2 2 29 5 29 9.5 C29 17 18 24.5 16 27 Z"/></svg>`;
  }

  const SPARKS = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return {
      dx: Math.round(Math.cos(a) * (88 + (i % 3) * 18)),
      dy: Math.round(Math.sin(a) * (66 + (i % 2) * 28)) - 20,
      emoji: i % 3 === 0 ? getHeartSvg(20, "bear-pop-heart") : "✨",
      delay: 0.5 + (i % 4) * 0.04,
    };
  });

  const peStageIntro = document.getElementById("peStageIntro");
  const peIntroTitle = document.getElementById("peIntroTitle");
  const peIntroSubtitle = document.getElementById("peIntroSubtitle");
  const peIntroReadBtn = document.getElementById("peIntroReadBtn");

  const peStageLetter = document.getElementById("peStageLetter");
  const peLetterCard = document.getElementById("peLetterCard");
  const peLetterDear = document.getElementById("peLetterDear");
  const peLetterTyped = document.getElementById("peLetterTyped");
  const peLetterCaret = document.getElementById("peLetterCaret");
  const peLetterRest = document.getElementById("peLetterRest");
  const peLetterSign = document.getElementById("peLetterSign");
  const peLetterContinueBtn = document.getElementById("peLetterContinueBtn");
  const peLetterSkipBtn = document.getElementById("peLetterSkipBtn");

  // Reusable human typing engine with punctuation pauses and skip
  function createTypingEngine({ text, speed, pauses = true, onUpdate, onDone }) {
    const chars = Array.from(text);
    let n = 0;
    let timer = null;
    let finished = false;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      n = chars.length;
      finished = true;
      onUpdate({ typed: text, rest: "", done: true });
      if (onDone) onDone();
      return { skip: () => {} };
    }

    function step() {
      if (finished) return;
      if (n >= chars.length) {
        finished = true;
        onUpdate({ typed: text, rest: "", done: true });
        if (onDone) onDone();
        return;
      }

      n++;
      const typed = chars.slice(0, n).join("");
      const rest = chars.slice(n).join("");
      const isDone = n >= chars.length;
      onUpdate({ typed, rest, done: isDone });

      if (isDone) {
        finished = true;
        if (onDone) onDone();
        return;
      }

      const prev = chars[n - 1] || "";
      let delay = speed;
      if (pauses) {
        if (/[.!?…]/.test(prev)) delay += 480;      // Thoughtful deep pause after sentences
        else if (/[,;:—]/.test(prev)) delay += 260; // Gentle tender pause at commas & pauses
        else if (prev === "\n") delay += 380;       // Breathing pause at new lines
      }
      timer = setTimeout(step, delay);
    }

    timer = setTimeout(step, speed);

    return {
      skip: () => {
        if (finished) return;
        finished = true;
        if (timer) clearTimeout(timer);
        onUpdate({ typed: text, rest: "", done: true });
        if (onDone) onDone();
      },
      cancel: () => {
        finished = true;
        if (timer) clearTimeout(timer);
      },
    };
  }

  const peStageQuestion = document.getElementById("peStageQuestion");
  const peQuestionText = document.getElementById("peQuestionText");
  const peYesBtn = document.getElementById("peYesBtn");
  const peThinkBtn = document.getElementById("peThinkBtn");
  const peThinkingBox = document.getElementById("peThinkingBox");
  const peThinkingDismiss = document.getElementById("peThinkingDismiss");
  const peBearContainer = document.getElementById("peBearContainer");
  const peBearPops = document.getElementById("peBearPops");
  const peThinkingText = document.getElementById("peThinkingText");

  const BEAR_INK = "#92364C";
  const BEAR_FUR = "#FFF6F2";
  const BEAR_BLUSH = "#F7A8B4";

  function getTeddyBearSvg(mood) {
    const blushOpacity = mood === "happy" ? 0.95 : 0.7;

    let eyesSvg = "";
    if (mood === "happy") {
      eyesSvg = `
        <g fill="none" stroke="${BEAR_INK}" stroke-width="3.2" stroke-linecap="round">
          <path d="M58 66 Q64 56 70 66" />
          <path d="M90 66 Q96 56 102 66" />
        </g>`;
    } else if (mood === "sad") {
      eyesSvg = `
        <g stroke="none">
          <circle cx="64" cy="65" r="5" fill="#3A1624" />
          <circle cx="96" cy="65" r="5" fill="#3A1624" />
          <circle cx="65.8" cy="63" r="1.8" fill="#fff" />
          <circle cx="97.8" cy="63" r="1.8" fill="#fff" />
          <g stroke="${BEAR_INK}" stroke-width="2.6" fill="none" stroke-linecap="round">
            <path d="M57 58 L71 52" />
            <path d="M103 58 L89 52" />
          </g>
        </g>`;
    } else {
      eyesSvg = `
        <g class="bear-eyes" stroke="none">
          <circle cx="64" cy="64" r="4.2" fill="#3A1624" />
          <circle cx="96" cy="64" r="4.2" fill="#3A1624" />
          <circle cx="65.4" cy="62.6" r="1.4" fill="#fff" />
          <circle cx="97.4" cy="62.6" r="1.4" fill="#fff" />
        </g>`;
    }

    const tearSvg = mood === "sad" ? `
      <path
        class="bear-tear"
        d="M62 72 Q57 80 62 84 Q67 80 62 72Z"
        fill="#A9D8F5"
        stroke="#5AA7D6"
        stroke-width="1.2"
      />` : "";

    let mouthSvg = "";
    if (mood === "happy") {
      mouthSvg = `
        <g>
          <path d="M69 85 Q80 104 91 85 Z" fill="#C23A5B" />
          <ellipse cx="80" cy="91" rx="6" ry="3" fill="${BEAR_BLUSH}" stroke="none" />
        </g>`;
    } else if (mood === "sad") {
      mouthSvg = `<path d="M73 93 Q80 85 87 93" fill="none" stroke="${BEAR_INK}" stroke-width="2.6" stroke-linecap="round" />`;
    } else {
      mouthSvg = `<path d="M73 86 Q80 93 87 86" fill="none" stroke="${BEAR_INK}" stroke-width="2.6" stroke-linecap="round" />`;
    }

    return `
      <svg
        viewBox="0 0 160 176"
        class="sbm-bear is-${mood}"
        aria-hidden="true"
        focusable="false"
        style="width: 100%; height: 100%; display: block;"
      >
        <defs>
          <linearGradient id="sbm-bear-heart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#FF7D93" />
            <stop offset="1" stop-color="#D2405E" />
          </linearGradient>
        </defs>

        <ellipse class="bear-shadow" cx="80" cy="169" rx="40" ry="5" fill="rgba(146,54,76,0.16)" />

        <g class="bear-body" stroke="${BEAR_INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
          <!-- feet -->
          <ellipse cx="58" cy="154" rx="15" ry="11" fill="${BEAR_FUR}" />
          <ellipse cx="102" cy="154" rx="15" ry="11" fill="${BEAR_FUR}" />
          <ellipse cx="58" cy="156" rx="6" ry="4.5" fill="${BEAR_BLUSH}" stroke="none" />
          <ellipse cx="102" cy="156" rx="6" ry="4.5" fill="${BEAR_BLUSH}" stroke="none" />

          <!-- body -->
          <ellipse cx="80" cy="124" rx="34" ry="32" fill="${BEAR_FUR}" />
          <ellipse cx="80" cy="131" rx="19" ry="19" fill="#FFE9E4" stroke="none" />

          <!-- heart -->
          <g transform="translate(80 128)">
            <g class="bear-heart">
              <path
                d="M0 12 C-26 -5 -19 -26 0 -12 C19 -26 26 -5 0 12Z"
                fill="url(#sbm-bear-heart)"
                stroke-width="2.2"
              />
              <path d="M-12 -9 Q-16 -4 -13 0" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="2.2" />
            </g>
          </g>

          <!-- arms (drawn after the heart so they hug it) -->
          <g transform="translate(55 108)">
            <g class="bear-arm arm-l">
              <ellipse cx="0" cy="16" rx="9" ry="19" fill="${BEAR_FUR}" />
              <ellipse cx="0" cy="30" rx="4.5" ry="3.5" fill="${BEAR_BLUSH}" stroke="none" />
            </g>
          </g>
          <g transform="translate(105 108)">
            <g class="bear-arm arm-r">
              <ellipse cx="0" cy="16" rx="9" ry="19" fill="${BEAR_FUR}" />
              <ellipse cx="0" cy="30" rx="4.5" ry="3.5" fill="${BEAR_BLUSH}" stroke="none" />
            </g>
          </g>

          <!-- head -->
          <g class="bear-head">
            <circle cx="50" cy="32" r="14" fill="${BEAR_FUR}" />
            <circle cx="110" cy="32" r="14" fill="${BEAR_FUR}" />
            <circle cx="50" cy="32" r="7.5" fill="${BEAR_BLUSH}" stroke="none" />
            <circle cx="110" cy="32" r="7.5" fill="${BEAR_BLUSH}" stroke="none" />
            <circle cx="80" cy="68" r="40" fill="${BEAR_FUR}" />
            <ellipse cx="80" cy="82" rx="17" ry="13" fill="#FFE9E4" stroke="none" />

            <ellipse cx="55" cy="78" rx="7.5" ry="4.8" fill="${BEAR_BLUSH}" fill-opacity="${blushOpacity}" stroke="none" />
            <ellipse cx="105" cy="78" rx="7.5" ry="4.8" fill="${BEAR_BLUSH}" fill-opacity="${blushOpacity}" stroke="none" />

            <!-- eyes -->
            ${eyesSvg}

            <!-- one gentle tear when sad -->
            ${tearSvg}

            <ellipse cx="80" cy="76" rx="5.5" ry="4" fill="#5B2233" stroke="none" />

            <!-- mouth -->
            ${mouthSvg}
          </g>
        </g>
      </svg>
    `;
  }

  function renderQuestionBear(mood) {
    if (peBearContainer) {
      peBearContainer.innerHTML = getTeddyBearSvg(mood);
    }
  }

  let peChoice = "none";
  let peCelebrating = false;

  const peStageAfterYes = document.getElementById("peStageAfterYes");
  const peAfterYesContent = document.getElementById("peAfterYesContent");

  const peCelebMessage = document.getElementById("peCelebMessage");
  const peCelebMsgDear = document.getElementById("peCelebMsgDear");
  const peCelebMsgTyped = document.getElementById("peCelebMsgTyped");
  const peCelebMsgSign = document.getElementById("peCelebMsgSign");
  const peNextCelebBtn1 = document.getElementById("peNextCelebBtn1");

  const peCelebLoveCard = document.getElementById("peCelebLoveCard");
  const peCardSender = document.getElementById("peCardSender");
  const peCardRecipient = document.getElementById("peCardRecipient");
  const peCardQuestion = document.getElementById("peCardQuestion");
  const peCardYesMsg = document.getElementById("peCardYesMsg");
  const peNextCelebBtn2 = document.getElementById("peNextCelebBtn2");

  const peCelebFireworks = document.getElementById("peCelebFireworks");
  const peSkyStars = document.getElementById("peSkyStars");
  const peFireworksCanvas = document.getElementById("peFireworksCanvas");
  const peFireworksHint = document.getElementById("peFireworksHint");
  const peFireworksOverlay = document.getElementById("peFireworksOverlay");
  const peFireworksHeading = document.getElementById("peFireworksHeading");
  const peFireworksMsg = document.getElementById("peFireworksMsg");
  const peNextCelebBtn3 = document.getElementById("peNextCelebBtn3");
  const btnNextToFireworks = document.getElementById("btnNextToFireworks");

  const peStageFinale = document.getElementById("peStageFinale");
  const peFinaleTitle = document.getElementById("peFinaleTitle");
  const peFinaleSubtitle = document.getElementById("peFinaleSubtitle");

  const DEFAULT_MESSAGE = "I still remember the first time I heard you laugh — I knew it was a moment I'd keep. I still do. Every little thing about you matters to me. You're my favourite person.";

  const LETTER_SUGGESTIONS = [
    "I still remember the first time I heard you laugh — I knew it was a moment I'd keep. I still do. Every little thing about you matters to me. You're my favourite person.",
    "You make even my ordinary days feel special. Sometimes, just talking to you is enough to turn my whole day around. I hope you know how much happiness you bring into my life. ❤️",
    "I don't think you realise how often you make me smile without even trying. It's the little things about you that mean the most to me. If I had to choose my favourite person all over again, it would still be you. 💕",
    "Maybe I'm not always the best at expressing how I feel, but you mean more to me than words can explain. I love the comfort, laughter, and happiness you bring into my life. Having you around is something I'll never take for granted. 💌",
  ];

  let selectedQuestion = "Will you be mine?";
  let selectedCelebrations = ["memories", "fireworks"];
  let celebrationQueue = [];
  let currentCelebIdx = 0;
  let typingTimer = null;
  let fireworksEngine = null;
  let fireworksMsgTimer = null;
  let fireworksHintTimer = null;
  let fireworksRo = null;
  let fireworksVisHandler = null;

  function showStep1() {
    step1.style.display = "flex";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
    step5.style.display = "none";
    step7.style.display = "none";
    bearContainer.style.display = "none";
    bearContainer.classList.remove("bearLeft");
    renderBackgroundHearts(HEARTS_STEP1);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function showStep2(fromName) {
    step1.style.display = "none";
    step2.style.display = "flex";
    step3.style.display = "none";
    step4.style.display = "none";
    step5.style.display = "none";
    step7.style.display = "none";
    bearContainer.style.display = "block";
    bearContainer.classList.remove("bearLeft");
    renderBackgroundHearts(HEARTS_STEP2);
    recipientInput.focus();
    const query = fromName ? `?name=${encodeURIComponent(fromName)}` : "";
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
  }

  function showStep3() {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "flex";
    step4.style.display = "none";
    step5.style.display = "none";
    step7.style.display = "none";
    bearContainer.style.display = "block";
    bearContainer.classList.add("bearLeft");
    renderBackgroundHearts(HEARTS_STEP3);
    const from = sessionStorage.getItem("saybyme_sender") || "";
    const to = sessionStorage.getItem("saybyme_recipient") || "";
    const query = `?name=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&step=3`;
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);

    const savedQ = sessionStorage.getItem("saybyme_question") || selectedQuestion;
    optionCards.forEach((c) => {
      const isSelected = c.getAttribute("data-question") === savedQ;
      c.classList.toggle("selected", isSelected);
      c.setAttribute("aria-checked", isSelected ? "true" : "false");
    });
  }

  function showStep4() {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "flex";
    step5.style.display = "none";
    step7.style.display = "none";
    bearContainer.style.display = "none";
    renderBackgroundHearts(HEARTS_STEP4);

    const from = sessionStorage.getItem("saybyme_sender") || "Someone Special";
    const to = sessionStorage.getItem("saybyme_recipient") || "Special One";
    const currentMsg = sessionStorage.getItem("saybyme_message") || DEFAULT_MESSAGE;

    letterSalutation.textContent = `Dear ${to},`;
    letterSenderName.innerHTML = `${from} <svg viewBox="0 0 24 22" class="valedictionHeart"><path d="M12 21C5 15.5 1.5 11.8 1.5 7.4 1.5 4.2 4 2 6.8 2c2 0 3.7 1 5.2 3 1.5-2 3.2-3 5.2-3 2.8 0 5.3 2.2 5.3 5.4 0 4.4-3.5 8.1-10.5 13.600z" fill="#d62e49" stroke="none"/></svg>`;
    letterBodyDisplay.textContent = currentMsg;
    letterTextarea.value = currentMsg;
    syncSuggestionCards();

    const query = `?name=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&step=4`;
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
  }

  function showStep5() {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
    step5.style.display = "flex";
    step7.style.display = "none";
    bearContainer.style.display = "none";
    renderBackgroundHearts(HEARTS_STEP5);

    const from = sessionStorage.getItem("saybyme_sender") || "Someone Special";
    const to = sessionStorage.getItem("saybyme_recipient") || "Special One";
    const query = `?name=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&step=5`;
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
  }

  /* ------------------------------------------------------------------ */
  /* STEP 7: PROPOSAL EXPERIENCE STATE MACHINE                          */
  /* ------------------------------------------------------------------ */
  function hideAllExperienceStages() {
    if (peStageWelcome) peStageWelcome.style.display = "none";
    if (peStageIntro) peStageIntro.style.display = "none";
    if (peStageLetter) peStageLetter.style.display = "none";
    if (peStageQuestion) peStageQuestion.style.display = "none";
    if (peStageAfterYes) peStageAfterYes.style.display = "none";
    if (peCelebMessage) peCelebMessage.style.display = "none";
    if (peCelebLoveCard) peCelebLoveCard.style.display = "none";
    if (peCelebFireworks) peCelebFireworks.style.display = "none";
    if (peFireworksOverlay) peFireworksOverlay.classList.remove("is-visible");
    if (peStageFinale) peStageFinale.style.display = "none";
    if (peThinkingBox) peThinkingBox.style.display = "none";
    if (typingTimer) { clearInterval(typingTimer); typingTimer = null; }
    if (fireworksEngine) { fireworksEngine.destroy(); fireworksEngine = null; }
    if (fireworksMsgTimer) { clearTimeout(fireworksMsgTimer); fireworksMsgTimer = null; }
    if (fireworksHintTimer) { clearTimeout(fireworksHintTimer); fireworksHintTimer = null; }
    if (fireworksRo) { fireworksRo.disconnect(); fireworksRo = null; }
    stopCardDeckAutoPlay();
  }

  function startProposalExperience() {
    hideAllExperienceStages();

    const sender = sessionStorage.getItem("saybyme_sender") || "You";
    const recipient = sessionStorage.getItem("saybyme_recipient") || "Your Love";
    const question = sessionStorage.getItem("saybyme_question") || "Will you be mine?";
    const letter = sessionStorage.getItem("saybyme_message") || DEFAULT_MESSAGE;
    const rawCelebs = sessionStorage.getItem("saybyme_celebrations");
    const celebs = rawCelebs ? JSON.parse(rawCelebs) : ["memories", "fireworks"];

    // Standard sequential order
    const ORDER = ["memories", "fireworks"];
    celebrationQueue = ORDER.filter((c) => celebs.includes(c));
    if (celebrationQueue.length === 0) {
      celebrationQueue = ["memories"];
    }
    currentCelebIdx = 0;

    // Populate Right-hand summary
    previewRecipientHeading.textContent = recipient;
    summarySenderName.textContent = sender;
    summaryRecipientName.textContent = recipient;
    summaryQuestion.textContent = question;

    const CELEB_LABELS = {
      memories: "🌸 Little Memories",
      fireworks: "🎆 Heart Fireworks",
      card: "🌸 Little Memories",
      message: "🌸 Little Memories",
    };
    summaryCelebrationPills.innerHTML = celebrationQueue
      .map((c) => `<span class="celebPill">${CELEB_LABELS[c] || c}</span>`)
      .join("");

    // Setup Stage 1: Welcome
    peWelcomeTitle.textContent = `A letter for ${recipient}`;
    peWelcomeSubtitle.textContent = `Sealed with love by ${sender}`;
    pePaperRecipient.textContent = `For ${recipient}`;
    peWelEnvelope.classList.remove("is-open");
    peWelEnvelopeWrap.classList.add("sbm-bob");
    peTapHint.style.opacity = "1";
    peSparksContainer.innerHTML = SPARKS.map(
      (s) => `<span class="sbm-wel-spark" style="--dx: ${s.dx}px; --dy: ${s.dy}px; animation-delay: ${s.delay}s;">${s.emoji}</span>`
    ).join("");
    peStageWelcome.style.display = "flex";

    // Setup Stage 2: Intro
    peIntroTitle.textContent = `Hi ${recipient}…`;
    peIntroSubtitle.textContent = `${sender} wrote something just for you. Take a quiet moment and read it slowly.`;

    // Setup Stage 3: Letter
    peLetterDear.textContent = `Dear ${recipient},`;
    peLetterTyped.textContent = "";
    peLetterSign.innerHTML = `— with all my love, ${sender} ${getHeartSvg(18, "sbmHeartInline")}`;

    // Setup Stage 4: Question
    peQuestionText.textContent = question;

    // Setup Celebrations & Finale
    const yesMsg = `You just made ${sender}'s whole world brighter. Thank you for saying yes! ${getHeartSvg(16, "sbmHeartInline")}`;
    peCardSender.textContent = sender;
    peCardRecipient.textContent = recipient;
    peCardQuestion.textContent = `“${question}”`;
    peCardYesMsg.textContent = yesMsg;

    peFireworksHeading.textContent = `${recipient} said YES!`;
    peFireworksMsg.textContent = yesMsg;
    peFinaleTitle.textContent = `Thank you, ${recipient}`;
    peFinaleSubtitle.textContent = `This is where ${sender} and you begin your next beautiful chapter.`;
  }

  function showExperienceIntro() {
    hideAllExperienceStages();
    peStageIntro.style.display = "flex";
    // Gentle auto-advance after 4.2s (tapping also advances)
    setTimeout(() => {
      if (peStageIntro.style.display === "flex") {
        showExperienceLetter();
      }
    }, 4200);
  }

  let letterTypingInstance = null;
  let celebTypingInstance = null;

  function showExperienceLetter() {
    hideAllExperienceStages();
    peStageLetter.style.display = "flex";

    const sender = sessionStorage.getItem("saybyme_sender") || "Someone Special";
    const recipient = sessionStorage.getItem("saybyme_recipient") || "Special One";
    const message = sessionStorage.getItem("saybyme_message") || DEFAULT_MESSAGE;

    peLetterDear.textContent = `Dear ${recipient},`;
    peLetterSign.innerHTML = `— with all my love, ${sender} ${getHeartSvg(18, "sbmHeartInline")}`;
    peLetterSign.style.opacity = "0";
    peLetterCaret.style.display = "inline-block";
    peLetterContinueBtn.style.display = "none";
    if (peLetterSkipBtn) peLetterSkipBtn.style.display = "none";

    peLetterTyped.textContent = "";
    if (peLetterRest) peLetterRest.textContent = "";

    const letterBodyElem = document.getElementById("peLetterBodyContainer");
    if (letterBodyElem) {
      letterBodyElem.scrollTop = 0;
    }

    if (letterTypingInstance) letterTypingInstance.cancel();

    // Slow, tender, romantic base typing speed (never rushed)
    const speed = 72;

    // Let the card settle for a calm, serene moment (0.7s) before the handwritten words begin
    setTimeout(() => {
      letterTypingInstance = createTypingEngine({
        text: message,
        speed: speed,
        pauses: true,
        onUpdate: ({ typed, rest, done }) => {
          peLetterTyped.textContent = typed;

          // Auto-scroll inside constant card only if long text actually overflows
          const letterBodyElem = document.getElementById("peLetterBodyContainer");
          if (letterBodyElem && letterBodyElem.scrollHeight > letterBodyElem.clientHeight) {
            letterBodyElem.scrollTop = letterBodyElem.scrollHeight;
          }

          if (done) {
            peLetterCaret.style.display = "none";
            peLetterSign.style.opacity = "1";
            if (peLetterSkipBtn) peLetterSkipBtn.style.display = "none";
            peLetterContinueBtn.style.display = "inline-flex";
          }
        },
      });
    }, 700);
  }

  function showExperienceQuestion() {
    hideAllExperienceStages();
    peStageQuestion.style.display = "flex";

    const question = sessionStorage.getItem("saybyme_question") || "Will you be mine? 🌹";
    peQuestionText.textContent = question;

    peChoice = "none";
    peCelebrating = false;
    peYesBtn.disabled = false;
    peThinkBtn.disabled = false;
    peThinkingBox.style.display = "none";
    if (peBearPops) peBearPops.innerHTML = "";
    renderQuestionBear("idle");
  }

  function playCurrentCelebration() {
    hideAllExperienceStages();
    if (peStageAfterYes) {
      peStageAfterYes.style.display = "flex";
      setTimeout(() => {
        if (cardDeck) cardDeck.scrollLeft = 0;
        startCardDeckAutoPlay();
      }, 50);
    }
  }

  /* ------------------------------------------------------------------ */
  /* ROMANTIC CARD DECK: CONTINUOUS AUTO-SCROLL & TOUCH/DRAG INTERACTION */
  /* ------------------------------------------------------------------ */
  const cardDeck = document.getElementById("sbmCardDeck");
  const deckDotsContainer = document.getElementById("sbmDeckDots");
  let deckAnimId = null;
  let deckResumeTimer = null;
  let autoScrollPaused = false;
  let isDeckDragging = false;
  let deckStartX = 0;
  let deckStartScroll = 0;

  function getSingleSetWidth() {
    if (!cardDeck) return 0;
    const cards = cardDeck.querySelectorAll(".sbmDeckCard");
    if (cards.length >= 6) {
      return cards[5].offsetLeft - cards[0].offsetLeft;
    }
    return cardDeck.scrollWidth / 2;
  }

  function initCardDeck() {
    if (!cardDeck) return;

    // Dot click navigation
    if (deckDotsContainer) {
      const dots = deckDotsContainer.querySelectorAll(".sbmDeckDot");
      dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
          autoScrollPaused = true;
          if (deckResumeTimer) clearTimeout(deckResumeTimer);
          const cards = cardDeck.querySelectorAll(".sbmDeckCard");
          if (cards[idx]) {
            const targetLeft = cards[idx].offsetLeft - (cardDeck.offsetWidth - cards[idx].offsetWidth) / 2;
            cardDeck.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
          }
          deckResumeTimer = setTimeout(() => {
            autoScrollPaused = false;
          }, 2500);
        });
      });
    }

    // Touch & Mouse Drag Handlers
    const onDragStart = (e) => {
      isDeckDragging = true;
      autoScrollPaused = true;
      if (deckResumeTimer) clearTimeout(deckResumeTimer);
      deckStartX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      deckStartScroll = cardDeck.scrollLeft;
      cardDeck.classList.add("is-dragging");
    };

    const onDragMove = (e) => {
      if (!isDeckDragging) return;
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const walk = (deckStartX - x);
      cardDeck.scrollLeft = deckStartScroll + walk;

      const setWidth = getSingleSetWidth();
      if (setWidth > 0) {
        if (cardDeck.scrollLeft >= setWidth) {
          cardDeck.scrollLeft -= setWidth;
          deckStartScroll -= setWidth;
        } else if (cardDeck.scrollLeft <= 0) {
          cardDeck.scrollLeft += setWidth;
          deckStartScroll += setWidth;
        }
      }
    };

    const onDragEnd = () => {
      if (!isDeckDragging) return;
      isDeckDragging = false;
      cardDeck.classList.remove("is-dragging");
      if (deckResumeTimer) clearTimeout(deckResumeTimer);
      deckResumeTimer = setTimeout(() => {
        autoScrollPaused = false;
      }, 1500);
    };

    cardDeck.addEventListener("mousedown", onDragStart);
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);

    cardDeck.addEventListener("touchstart", onDragStart, { passive: true });
    cardDeck.addEventListener("touchmove", onDragMove, { passive: true });
    cardDeck.addEventListener("touchend", onDragEnd, { passive: true });
    cardDeck.addEventListener("touchcancel", onDragEnd, { passive: true });
  }

  function updateActiveDot() {
    if (!cardDeck || !deckDotsContainer) return;
    const cards = cardDeck.querySelectorAll(".sbmDeckCard");
    if (!cards.length) return;

    const setWidth = getSingleSetWidth();
    if (setWidth <= 0) return;

    const normalizedScroll = cardDeck.scrollLeft % setWidth;
    const cardWidthWithGap = setWidth / 5;
    const activeIdx = Math.round(normalizedScroll / cardWidthWithGap) % 5;

    const dots = deckDotsContainer.querySelectorAll(".sbmDeckDot");
    dots.forEach((dot, idx) => {
      if (idx === activeIdx) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function startCardDeckAutoPlay() {
    stopCardDeckAutoPlay();
    autoScrollPaused = false;
    const speed = 0.8; // Smooth, gentle right-to-left scrolling

    const step = () => {
      if (peStageAfterYes && peStageAfterYes.style.display !== "none") {
        if (!autoScrollPaused && !isDeckDragging && cardDeck) {
          cardDeck.scrollLeft += speed;
          const setWidth = getSingleSetWidth();
          if (setWidth > 0 && cardDeck.scrollLeft >= setWidth) {
            cardDeck.scrollLeft -= setWidth;
          }
        }
        updateActiveDot();
        deckAnimId = requestAnimationFrame(step);
      } else {
        deckAnimId = null;
      }
    };
    deckAnimId = requestAnimationFrame(step);
  }

  function stopCardDeckAutoPlay() {
    if (deckAnimId) {
      cancelAnimationFrame(deckAnimId);
      deckAnimId = null;
    }
    if (deckResumeTimer) {
      clearTimeout(deckResumeTimer);
      deckResumeTimer = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /* SAYBYME FIREWORKS ENGINE (CANVAS 2D PHYSICS, ADDITIVE BLENDING)    */
  /* ------------------------------------------------------------------ */
  const TAU = Math.PI * 2;
  const MAX_PARTICLES = 1900;
  const TRAIL = 8;
  const GOLD = "#FFD9A0";
  const CREAM = "#FFE9C7";

  const DEFAULT_PALETTE = [
    "#FF4D6D",
    "#FF758F",
    "#FF8FA3",
    "#FFB3C1",
    "#FFD6A5",
    "#FFE5EC",
    "#C9A7FF",
  ];

  const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const makeParticle = () => ({
    x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1, size: 2, color: "#fff",
    drag: 1.8, gravity: 0, flicker: false, seed: 0, trail: 0, crackle: false,
    tx: new Array(TRAIL).fill(0), ty: new Array(TRAIL).fill(0),
  });

  const heartOutline = (t) => {
    const hx = 16 * Math.sin(t) ** 3;
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [hx / 17, (hy - 2.5) / 17]; // −2.5 centres the heart visually
  };
  const circleOutline = (t) => [Math.cos(t), Math.sin(t)];
  const discOutline = (t) => {
    const r = 0.45 + 0.55 * Math.sqrt(Math.random());
    return [Math.cos(t) * r, Math.sin(t) * r];
  };
  const starOutline = (t) => {
    const seg = TAU / 10;
    const idx = Math.floor((t % TAU) / seg);
    const a = ((t % TAU) % seg) / seg;
    const r = idx % 2 === 0 ? 1 - 0.58 * a : 0.42 + 0.58 * a;
    return [Math.cos(t - Math.PI / 2) * r, Math.sin(t - Math.PI / 2) * r];
  };

  class FireworksEngine {
    constructor(canvas, palette = DEFAULT_PALETTE) {
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported");
      this.canvas = canvas;
      this.palette = palette;
      this.ctx = ctx;
      this.w = 0;
      this.h = 0;
      this.dpr = 1;
      this.scale = 1;

      this.live = [];
      this.pool = [];
      this.rockets = [];
      this.flashes = [];
      this.rings = [];
      this.timeline = [];
      this.sprites = new Map();

      this.time = 0;
      this.last = 0;
      this.raf = 0;
      this.running = false;
      this.auto = false;
      this.nextAuto = 0;
    }

    resize() {
      const r = this.canvas.getBoundingClientRect();
      this.w = Math.max(1, Math.round(r.width));
      this.h = Math.max(1, Math.round(r.height));
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(this.w * this.dpr);
      this.canvas.height = Math.round(this.h * this.dpr);
      this.scale = clamp(Math.min(this.w, this.h * 0.55) / 340, 0.65, 1.7);
    }

    start() {
      if (this.running) return;
      this.running = true;
      this.last = performance.now();
      const loop = (now) => {
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

    schedule(delaySec, fn) {
      this.timeline.push({ t: this.time + delaySec, fn });
    }

    setAuto(on) {
      this.auto = on;
      this.nextAuto = this.time + 0.4;
    }

    launch(o = {}) {
      if (this.w === 0) return;
      const tx = o.x !== undefined ? o.x : rand(this.w * 0.18, this.w * 0.82);
      const ty = o.y !== undefined ? o.y : rand(this.h * 0.14, this.h * 0.46);
      const x0 = clamp(tx + rand(-0.12, 0.12) * this.w, 0, this.w);
      const y0 = this.h + 10;
      const dur = rand(0.7, 1.05);
      const vy = (-2 * (y0 - ty)) / dur; // apex lands exactly on the target
      this.rockets.push({
        x0, y0, vx: (tx - x0) / dur, vy, g: -vy / dur, dur,
        age: 0, px: x0, py: y0, acc: 0,
        kind: o.kind || this.randomKind(), big: !!o.big,
      });
    }

    playShow() {
      const script = [
        [0.25, "heart", 0.5, 0.28],
        [1.2, "peony", 0.22, 0.32],
        [1.5, "peony", 0.78, 0.36],
        [2.4, "star", 0.5, 0.2],
        [3.0, "double-heart", 0.5, 0.34],
        [3.5, "ring", 0.25, 0.22],
        [3.7, "ring", 0.75, 0.24],
        [4.6, "willow", 0.5, 0.3],
        [5.6, "heart", 0.3, 0.3],
        [5.8, "heart", 0.7, 0.3],
      ];
      script.forEach(([at, kind, fx, fy]) =>
        this.schedule(at, () => this.launch({ kind, x: this.w * fx, y: this.h * fy }))
      );
      this.schedule(6.4, () => this.setAuto(true));
      this.schedule(10.5, () => this.finale());
    }

    finale() {
      [0.15, 0.32, 0.5, 0.68, 0.85].forEach((fx, i) =>
        this.schedule(i * 0.16, () =>
          this.launch({
            x: this.w * fx,
            y: this.h * (0.2 + 0.1 * (i % 2)),
            kind: i % 2 ? "double-heart" : "heart",
          })
        )
      );
      this.schedule(1.1, () =>
        this.launch({ x: this.w * 0.5, y: this.h * 0.27, kind: "double-heart", big: true })
      );
      [0.2, 0.8].forEach((fx) =>
        this.schedule(1.4, () =>
          this.launch({ x: this.w * fx, y: this.h * 0.33, kind: "crackle" })
        )
      );
    }

    snapshot() {
      if (this.w === 0) this.resize();
      [
        [0.5, 0.28, "heart"],
        [0.25, 0.36, "double-heart"],
        [0.75, 0.34, "peony"],
      ].forEach(([fx, fy, kind]) =>
        this.explode(kind, this.w * fx, this.h * fy, false)
      );
      for (let i = 0; i < 45; i++) this.step(1 / 60);
      this.draw();
    }

    randomKind() {
      const r = Math.random();
      if (r < 0.3) return "heart";
      if (r < 0.45) return "double-heart";
      if (r < 0.65) return "peony";
      if (r < 0.75) return "ring";
      if (r < 0.85) return "star";
      if (r < 0.93) return "willow";
      return "crackle";
    }

    spawn(o) {
      if (this.live.length >= MAX_PARTICLES) return;
      const p = this.pool.pop() || makeParticle();
      p.x = o.x; p.y = o.y; p.vx = o.vx; p.vy = o.vy;
      p.life = o.life; p.size = o.size; p.color = o.color;
      p.drag = o.drag !== undefined ? o.drag : 1.8;
      p.gravity = o.gravity !== undefined ? o.gravity : 0;
      p.flicker = !!o.flicker;
      p.crackle = !!o.crackle;
      p.trail = o.trail || 0;
      p.age = 0;
      p.seed = Math.random() * TAU;
      if (p.trail > 0) {
        for (let k = 0; k < TRAIL; k++) { p.tx[k] = o.x; p.ty[k] = o.y; }
      }
      this.live.push(p);
    }

    shape(x, y, outline, n, radius, o) {
      const S = this.scale;
      const lambda = o.lambda !== undefined ? o.lambda : 2.3;
      const jitter = o.jitter !== undefined ? o.jitter : 0.02;
      const lifeRange = o.life || [1.6, 2.1];
      for (let i = 0; i < n; i++) {
        const [ux, uy] = outline((i / n) * TAU + rand(-0.01, 0.01));
        const j = 1 + rand(-jitter, jitter);
        this.spawn({
          x, y,
          vx: ux * radius * lambda * j,
          vy: uy * radius * lambda * j,
          life: rand(lifeRange[0], lifeRange[1]),
          size: (o.size !== undefined ? o.size : 2.4) * S,
          color: typeof o.color === "function" ? o.color() : o.color,
          drag: lambda,
          gravity: (o.gravity !== undefined ? o.gravity : 55) * S,
          trail: o.trail, flicker: o.flicker, crackle: o.crackle,
        });
      }
    }

    explode(kind, x, y, big) {
      const S = this.scale * (big ? 1.35 : 1);
      const c1 = pick(this.palette);
      const c2 = pick(this.palette.filter((c) => c !== c1)) || c1;

      this.flashes.push({ x, y, r: 150 * S, age: 0, life: 0.5, color: c1 });
      this.rings.push({ x, y, max: 130 * S, age: 0, life: 0.6, color: c1 });

      switch (kind) {
        case "heart":
          this.shape(x, y, heartOutline, 84, 92 * S, { color: c1 });
          this.shape(x, y, discOutline, 26, 48 * S, { color: "#FFFFFF", life: [0.7, 1.1], size: 1.6, flicker: true });
          break;
        case "double-heart":
          this.shape(x, y, heartOutline, 84, 96 * S, { color: c1 });
          this.shape(x, y, heartOutline, 54, 52 * S, { color: c2, life: [1.4, 1.8] });
          this.shape(x, y, discOutline, 22, 30 * S, { color: "#FFFFFF", life: [0.6, 0.9], size: 1.5, flicker: true });
          break;
        case "peony":
          this.shape(x, y, discOutline, 120, 118 * S, {
            color: () => (Math.random() < 0.75 ? c1 : "#FFFFFF"),
            lambda: 1.9, jitter: 0, life: [1.5, 2.2], gravity: 60,
          });
          break;
        case "ring":
          this.shape(x, y, circleOutline, 72, 108 * S, { color: c1, lambda: 2.1 });
          this.shape(x, y, circleOutline, 40, 64 * S, { color: c2, lambda: 2.1, life: [1.3, 1.7] });
          break;
        case "star":
          this.shape(x, y, starOutline, 110, 118 * S, { color: c1, lambda: 2.2, jitter: 0.01 });
          this.shape(x, y, discOutline, 20, 40 * S, { color: GOLD, life: [0.8, 1.2], size: 1.7, flicker: true });
          break;
        case "willow":
          this.shape(x, y, discOutline, 64, 120 * S, {
            color: () => (Math.random() < 0.6 ? GOLD : CREAM),
            lambda: 1.1, jitter: 0, life: [2.6, 3.4], gravity: 75, trail: TRAIL, size: 2.2,
          });
          break;
        case "crackle":
          this.shape(x, y, discOutline, 70, 115 * S, {
            color: () => (Math.random() < 0.5 ? "#FFFFFF" : GOLD),
            lambda: 1.8, jitter: 0, life: [1.2, 1.7], size: 2, crackle: true,
          });
          break;
      }
    }

    step(dt) {
      const S = this.scale;
      this.time += dt;

      // timeline
      if (this.timeline.length) {
        const due = this.timeline.filter((e) => e.t <= this.time).sort((a, b) => a.t - b.t);
        if (due.length) {
          this.timeline = this.timeline.filter((e) => e.t > this.time);
          due.forEach((e) => e.fn());
        }
      }

      // auto show
      if (this.auto && this.time >= this.nextAuto) {
        this.launch({});
        if (Math.random() < 0.3) this.launch({});
        this.nextAuto = this.time + rand(0.7, 1.5);
      }

      // rockets
      for (let i = this.rockets.length - 1; i >= 0; i--) {
        const r = this.rockets[i];
        r.age += dt;
        const t = Math.min(r.age, r.dur);
        r.px = r.x0 + r.vx * t;
        r.py = r.y0 + r.vy * t + 0.5 * r.g * t * t;
        r.acc += dt * 70;
        while (r.acc >= 1) {
          r.acc -= 1;
          this.spawn({
            x: r.px + rand(-1.5, 1.5), y: r.py,
            vx: rand(-18, 18) * S, vy: rand(10, 50) * S,
            life: rand(0.35, 0.7), size: 1.5 * S, color: GOLD,
            drag: 1.5, gravity: 60 * S, flicker: true,
          });
        }
        if (r.age >= r.dur) {
          this.rockets.splice(i, 1);
          this.explode(r.kind, r.px, r.py, r.big);
        }
      }

      // particles
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
            for (let j = 0; j < 3; j++) {
              this.spawn({
                x: p.x, y: p.y, vx: rand(-45, 45) * S, vy: rand(-45, 45) * S,
                life: rand(0.25, 0.5), size: 1.3 * S,
                color: Math.random() < 0.5 ? "#FFFFFF" : CREAM,
                drag: 3, gravity: 40 * S, flicker: true,
              });
            }
          }
          this.live[i] = this.live[this.live.length - 1];
          this.live.pop();
          this.pool.push(p);
        }
      }

      // flashes & rings
      for (let i = this.flashes.length - 1; i >= 0; i--) {
        this.flashes[i].age += dt;
        if (this.flashes[i].age >= this.flashes[i].life) this.flashes.splice(i, 1);
      }
      for (let i = this.rings.length - 1; i >= 0; i--) {
        this.rings[i].age += dt;
        if (this.rings[i].age >= this.rings[i].life) this.rings.splice(i, 1);
      }
    }

    sprite(color) {
      let s = this.sprites.get(color);
      if (s) return s;
      s = document.createElement("canvas");
      s.width = s.height = 64;
      const g = s.getContext("2d");
      if (!g) return s;
      const n = parseInt(color.slice(1), 16);
      const rgb = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.16, `rgba(${rgb},0.95)`);
      grad.addColorStop(0.45, `rgba(${rgb},0.3)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      this.sprites.set(color, s);
      return s;
    }

    draw() {
      const { ctx, w, h } = this;
      const S = this.scale;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      // burst flashes (light the sky)
      for (const f of this.flashes) {
        const t = f.age / f.life;
        const r = f.r * (0.6 + 0.4 * t);
        ctx.globalAlpha = Math.max(0, (1 - t) ** 2 * 0.5);
        ctx.drawImage(this.sprite(f.color), f.x - r, f.y - r, r * 2, r * 2);
      }

      // shock rings
      for (const g of this.rings) {
        const t = g.age / g.life;
        ctx.globalAlpha = Math.max(0, (1 - t) * 0.45);
        ctx.strokeStyle = g.color;
        ctx.lineWidth = 1.5 * S;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.max * (1 - (1 - t) ** 3), 0, TAU);
        ctx.stroke();
      }

      // rockets
      for (const r of this.rockets) {
        const t = Math.min(r.age, r.dur);
        const vy = r.vy + r.g * t;
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 2 * S;
        ctx.beginPath();
        ctx.moveTo(r.px, r.py);
        ctx.lineTo(r.px - r.vx * 0.035, r.py - vy * 0.035);
        ctx.stroke();
        ctx.globalAlpha = 1;
        const d = 13 * S;
        ctx.drawImage(this.sprite("#FFE9C7"), r.px - d / 2, r.py - d / 2, d, d);
      }

      // particles
      for (const p of this.live) {
        const lf = 1 - p.age / p.life;
        let a = Math.pow(Math.max(lf, 0), 0.8);
        if (p.flicker) a *= 0.55 + 0.45 * Math.sin(p.age * 38 + p.seed);
        if (a <= 0.01) continue;

        if (p.trail > 0) {
          ctx.strokeStyle = p.color;
          for (let k = 0; k < p.trail - 1; k++) {
            const f = 1 - k / p.trail;
            ctx.globalAlpha = a * f * 0.6;
            ctx.lineWidth = Math.max(0.6, p.size * f * 0.9);
            ctx.beginPath();
            ctx.moveTo(p.tx[k], p.ty[k]);
            ctx.lineTo(p.tx[k + 1], p.ty[k + 1]);
            ctx.stroke();
          }
        } else if (p.vx * p.vx + p.vy * p.vy > (70 * S) ** 2) {
          ctx.globalAlpha = a * 0.5;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.018, p.y - p.vy * 0.018);
          ctx.stroke();
        }

        ctx.globalAlpha = a;
        const d = p.size * 5.2 * (0.5 + 0.5 * lf);
        ctx.drawImage(this.sprite(p.color), p.x - d / 2, p.y - d / 2, d, d);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function initFireworksStars() {
    if (!peSkyStars || peSkyStars.children.length > 0) return;
    const STARS = Array.from({ length: 26 }, (_, i) => ({
      l: `${(i * 37 + 11) % 97}%`,
      t: `${(i * 23 + 7) % 52}%`,
      d: `${((i * 0.37) % 2.4).toFixed(2)}s`,
      s: i % 5 === 0 ? 12 : 8,
    }));
    peSkyStars.innerHTML = STARS.map(
      (s) => `<span class="sbm-twinkle" style="left: ${s.l}; top: ${s.t}; animation-delay: ${s.d}; font-size: ${s.s}px;" aria-hidden="true">✦</span>`
    ).join("");
  }

  function showFireworksCelebration() {
    stopCardDeckAutoPlay();
    hideAllExperienceStages();
    if (!peCelebFireworks || !peFireworksCanvas) return;

    initFireworksStars();
    peCelebFireworks.style.display = "block";

    const recipient = sessionStorage.getItem("saybyme_recipient") || "Special One";
    const sender = sessionStorage.getItem("saybyme_sender") || "Someone Special";
    if (peFireworksHeading) {
      peFireworksHeading.textContent = `${recipient} said YES!`;
    }
    if (peFireworksMsg) {
      peFireworksMsg.textContent = `You made ${sender}'s whole world brighter. Thank you for saying yes! 💗`;
    }

    if (peFireworksOverlay) {
      peFireworksOverlay.classList.remove("is-visible");
    }
    if (peFireworksHint) {
      peFireworksHint.style.opacity = "1";
    }

    // Initialize fireworks engine
    if (fireworksEngine) {
      fireworksEngine.destroy();
      fireworksEngine = null;
    }
    fireworksEngine = new FireworksEngine(peFireworksCanvas);
    fireworksEngine.resize();

    if (window.ResizeObserver) {
      if (fireworksRo) fireworksRo.disconnect();
      fireworksRo = new ResizeObserver(() => {
        if (fireworksEngine) fireworksEngine.resize();
      });
      fireworksRo.observe(peFireworksCanvas);
    }

    if (!fireworksVisHandler) {
      fireworksVisHandler = () => {
        if (!fireworksEngine) return;
        if (document.hidden) fireworksEngine.stop();
        else fireworksEngine.start();
      };
      document.addEventListener("visibilitychange", fireworksVisHandler);
    }

    // Tap the sky to launch hearts
    let lastTap = 0;
    peFireworksCanvas.onpointerdown = (e) => {
      const now = performance.now();
      if (now - lastTap < 140) return;
      lastTap = now;
      if (!fireworksEngine) return;
      const r = peFireworksCanvas.getBoundingClientRect();
      fireworksEngine.launch({
        x: e.clientX - r.left,
        y: Math.min(e.clientY - r.top, r.height * 0.62),
        kind: Math.random() < 0.55 ? "heart" : "double-heart",
      });
      if (peFireworksHint) {
        peFireworksHint.style.opacity = "0";
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fireworksEngine.snapshot();
      if (peFireworksOverlay) peFireworksOverlay.classList.add("is-visible");
      if (peFireworksHint) peFireworksHint.style.opacity = "0";
    } else {
      fireworksEngine.start();
      fireworksEngine.playShow();
      fireworksMsgTimer = setTimeout(() => {
        if (peFireworksOverlay) peFireworksOverlay.classList.add("is-visible");
      }, 3400);
      fireworksHintTimer = setTimeout(() => {
        if (peFireworksHint) peFireworksHint.style.opacity = "0";
      }, 9000);
    }
  }

  function showStep7() {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
    step5.style.display = "none";
    step7.style.display = "flex";
    bearContainer.style.display = "none";
    renderBackgroundHearts(HEARTS_STEP5);

    const from = sessionStorage.getItem("saybyme_sender") || "";
    const to = sessionStorage.getItem("saybyme_recipient") || "";
    const query = `?name=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&step=7`;
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);

    startProposalExperience();
  }

  let isWelcomeOpening = false;
  let welcomeOpenTimer = null;

  function handleOpenEnvelope() {
    if (isWelcomeOpening) return;
    isWelcomeOpening = true;
    peWelEnvelope.classList.add("is-open");
    peWelEnvelopeWrap.classList.remove("sbm-bob");
    peTapHint.style.opacity = "0";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (welcomeOpenTimer) clearTimeout(welcomeOpenTimer);
    // Skips the middle screen and gently reveals the letter directly as the envelope opens
    welcomeOpenTimer = setTimeout(() => {
      isWelcomeOpening = false;
      showExperienceLetter();
    }, reduce ? 250 : 1600);
  }

  // Hook up Experience Stage Transitions
  peWelSealBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleOpenEnvelope();
  });
  peWelEnvelope.addEventListener("click", handleOpenEnvelope);

  // Letter tap to finish typing
  if (peLetterSkipBtn) {
    peLetterSkipBtn.addEventListener("click", () => {
      if (letterTypingInstance) letterTypingInstance.skip();
    });
  }
  peLetterCard.addEventListener("click", () => {
    if (letterTypingInstance) letterTypingInstance.skip();
  });

  peLetterContinueBtn.addEventListener("click", showExperienceQuestion);

  // Question stage interactions (TeddyBear mood & POPS burst)
  peYesBtn.addEventListener("pointerenter", () => {
    if (!peCelebrating && peChoice !== "yes") {
      renderQuestionBear("happy");
    }
  });
  peYesBtn.addEventListener("pointerleave", () => {
    if (!peCelebrating && peChoice !== "yes") {
      renderQuestionBear(peChoice === "thinking" ? "sad" : "idle");
    }
  });
  peYesBtn.addEventListener("focus", () => {
    if (!peCelebrating && peChoice !== "yes") {
      renderQuestionBear("happy");
    }
  });
  peYesBtn.addEventListener("blur", () => {
    if (!peCelebrating && peChoice !== "yes") {
      renderQuestionBear(peChoice === "thinking" ? "sad" : "idle");
    }
  });

  peYesBtn.addEventListener("click", () => {
    if (peCelebrating || peChoice === "yes") return;
    peCelebrating = true;
    peChoice = "yes";
    peYesBtn.disabled = true;
    peThinkBtn.disabled = true;
    peThinkingBox.style.display = "none";
    renderQuestionBear("happy");

    const POPS = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return {
        dx: Math.round(Math.cos(a) * (62 + (i % 3) * 14)),
        dy: Math.round(Math.sin(a) * (46 + (i % 2) * 18)) - 24,
        emoji: i % 2 ? getHeartSvg(22, "bear-pop-heart") : "✨",
        delay: (i % 5) * 0.05,
      };
    });

    if (peBearPops) {
      peBearPops.innerHTML = POPS.map(
        (p) => `<span class="bear-pop" style="--dx: ${p.dx}px; --dy: ${p.dy}px; animation-delay: ${p.delay}s;" aria-hidden="true">${p.emoji}</span>`
      ).join("");
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      peCelebrating = false;
      playCurrentCelebration();
    }, reduce ? 300 : 1300);
  });

  peThinkBtn.addEventListener("click", () => {
    if (peCelebrating) return;
    peChoice = "thinking";
    renderQuestionBear("sad");
    const sender = sessionStorage.getItem("saybyme_sender") || "Your special one";
    if (peThinkingText) {
      peThinkingText.textContent = `Of course. There’s no rush at all, and no pressure. ${sender} will understand. Come back whenever your heart is ready. 🌷`;
    }
    peThinkingBox.style.display = "block";
  });

  peThinkingDismiss.addEventListener("click", () => {
    peChoice = "none";
    peThinkingBox.style.display = "none";
    renderQuestionBear("idle");
  });

  if (peNextCelebBtn1) {
    peNextCelebBtn1.addEventListener("click", () => {
      currentCelebIdx++;
      playCurrentCelebration();
    });
  }

  if (peNextCelebBtn2) {
    peNextCelebBtn2.addEventListener("click", () => {
      currentCelebIdx++;
      playCurrentCelebration();
    });
  }

  if (btnNextToFireworks) {
    btnNextToFireworks.addEventListener("click", showFireworksCelebration);
  }

  if (peNextCelebBtn3) {
    peNextCelebBtn3.addEventListener("click", () => {
      hideAllExperienceStages();
      if (peStageFinale) {
        peStageFinale.style.display = "flex";
      }
    });
  }

  btnReplayExperience.addEventListener("click", startProposalExperience);

  btnBackToEdit.addEventListener("click", () => {
    showStep5();
  });

  function showShareModal(shareUrl, recipient) {
    let modal = document.getElementById("sbmShareModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "sbmShareModal";
      modal.style.cssText = "position: fixed; inset: 0; background: rgba(30, 10, 20, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px; font-family: 'Quicksand', sans-serif;";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="background: #ffffff; border-radius: 28px; padding: 32px 26px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 25px 60px -12px rgba(146, 54, 76, 0.45); border: 2px solid #F7A8B4; animation: sbm-pop 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);">
        <div style="font-size: 52px; line-height: 1; margin-bottom: 8px;">🎉💌</div>
        <h3 style="font-family: 'Caveat', cursive; font-size: 34px; font-weight: 700; color: #92364C; margin: 6px 0;">
          Your Love Story Link is Ready!
        </h3>
        <p style="font-size: 14px; color: #A45D6C; margin: 0 0 16px 0; line-height: 1.45;">
          Share this unique link with <b>${recipient}</b> to open your surprise on any phone, tablet, or browser:
        </p>

        <div style="background: #FFF0F3; border: 1.5px dashed #F45D75; border-radius: 14px; padding: 12px 14px; font-size: 14px; font-weight: 600; color: #92364C; word-break: break-all; margin-bottom: 18px; user-select: all;">
          ${shareUrl}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button id="sbmModalCopyBtn" type="button" style="background: linear-gradient(135deg, #F45D75 0%, #D75070 100%); color: #ffffff; border: none; border-radius: 9999px; padding: 13px 24px; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 20px -4px rgba(244, 93, 117, 0.45); display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
            <span>Copy Link</span> 📋
          </button>

          <a href="${shareUrl}" target="_blank" rel="noopener noreferrer" style="background: #FFF5F7; color: #92364C; border: 1.5px solid #F7A8B4; border-radius: 9999px; padding: 11px 22px; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block;">
            Open Recipient Preview ↗
          </a>

          <button id="sbmModalCloseBtn" type="button" style="background: none; border: none; font-size: 13px; color: #A45D6C; cursor: pointer; margin-top: 6px; text-decoration: underline;">
            Done
          </button>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    const copyBtn = document.getElementById("sbmModalCopyBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(shareUrl);
        copyBtn.innerHTML = "<span>Copied! 💌</span>";
        setTimeout(() => {
          copyBtn.innerHTML = "<span>Copy Link</span> 📋";
        }, 2500);
      });
    }

    const closeBtn = document.getElementById("sbmModalCloseBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  }

  btnGenerateLink.addEventListener("click", async () => {
    const sender = sessionStorage.getItem("saybyme_sender") || "Someone Special";
    const recipient = sessionStorage.getItem("saybyme_recipient") || "Special One";
    const question = sessionStorage.getItem("saybyme_question") || "Will you be mine?";
    const message = sessionStorage.getItem("saybyme_message") || DEFAULT_MESSAGE;
    const rawCelebs = sessionStorage.getItem("saybyme_celebrations");
    const celebrations = rawCelebs ? JSON.parse(rawCelebs) : ["memories", "fireworks"];

    const origText = btnGenerateLink.innerHTML;
    btnGenerateLink.innerHTML = "<span>Saving to Convex... ✨</span>";
    btnGenerateLink.disabled = true;

    try {
      const res = await fetch("https://brazen-stoat-999.ap-southeast-2.convex.cloud/api/mutation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "proposals:createProposal",
          args: {
            senderName: sender,
            recipientName: recipient,
            question: question,
            message: message,
            celebrations: celebrations,
          },
          format: "json",
        }),
      });

      const data = await res.json();
      const slug = data.value?.slug || ("sbm_" + Math.random().toString(36).substring(2, 9));
      const shareUrl = `${window.location.origin}/preview/${slug}`;
      showShareModal(shareUrl, recipient);
    } catch (err) {
      console.error("Convex error:", err);
      const fallbackSlug = "sbm_" + Math.random().toString(36).substring(2, 9);
      const shareUrl = `${window.location.origin}/preview/${fallbackSlug}`;
      showShareModal(shareUrl, recipient);
    } finally {
      btnGenerateLink.innerHTML = origText;
      btnGenerateLink.disabled = false;
    }
  });

  // Step 4: 4 Suggestions Logic (Click + to add to letter, - to remove)
  function syncSuggestionCards() {
    const list = document.getElementById("suggestionList");
    if (!list) return;
    const currentVal = letterTextarea.value;
    const cards = list.querySelectorAll(".suggestionCard");
    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      const msg = LETTER_SUGGESTIONS[idx];
      const isPresent = Boolean(msg && currentVal.includes(msg.trim()));
      card.classList.toggle("active", isPresent);
      card.classList.toggle("added", isPresent);
      const btn = card.querySelector(".sugBtn");
      if (btn) {
        btn.textContent = isPresent ? "−" : "+";
        btn.setAttribute("aria-label", isPresent ? "Remove from letter" : "Add to letter");
        btn.title = isPresent ? "Remove from letter" : "Add to letter";
      }
    });
  }

  function toggleSuggestion(idx) {
    const chosenText = LETTER_SUGGESTIONS[idx];
    if (!chosenText) return;

    let currentVal = letterTextarea.value;
    const msg = chosenText.trim();
    const isAlreadyAdded = currentVal.includes(msg);

    if (isAlreadyAdded) {
      // Remove this sentence from the letter
      if (currentVal.includes("\n\n" + msg)) {
        currentVal = currentVal.replace("\n\n" + msg, "");
      } else if (currentVal.includes(msg + "\n\n")) {
        currentVal = currentVal.replace(msg + "\n\n", "");
      } else if (currentVal.includes("\n" + msg)) {
        currentVal = currentVal.replace("\n" + msg, "");
      } else if (currentVal.includes(msg + "\n")) {
        currentVal = currentVal.replace(msg + "\n", "");
      } else {
        currentVal = currentVal.replace(msg, "");
      }
      currentVal = currentVal.trim();
    } else {
      // Add as an entry into the letter
      const trimmed = currentVal.trim();
      if (!trimmed) {
        currentVal = msg;
      } else {
        currentVal = trimmed + "\n\n" + msg;
      }
    }

    letterTextarea.value = currentVal;
    letterBodyDisplay.textContent = currentVal;
    sessionStorage.setItem("saybyme_message", currentVal);
    syncSuggestionCards();
  }

  function attachSuggestionListeners() {
    const list = document.getElementById("suggestionList");
    if (!list) return;
    const cards = list.querySelectorAll(".suggestionCard");
    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      const btn = card.querySelector(".sugBtn");
      const handleAction = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggleSuggestion(idx);
      };
      card.onclick = handleAction;
      if (btn) btn.onclick = handleAction;
      card.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSuggestion(idx);
        }
      };
    });
  }

  // Initialize listeners for suggestions
  attachSuggestionListeners();

  // Live update of the letter paper as user types
  letterTextarea.addEventListener("input", (e) => {
    const text = e.target.value;
    letterBodyDisplay.textContent = text;
    sessionStorage.setItem("saybyme_message", text.trim());
    syncSuggestionCards();
  });

  // Step 5 celebration cards toggle
  celebrateCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-celebrate");
      card.classList.toggle("active");
      if (card.classList.contains("active")) {
        if (!selectedCelebrations.includes(type)) selectedCelebrations.push(type);
      } else {
        selectedCelebrations = selectedCelebrations.filter((t) => t !== type);
      }
    });
  });

  // Initial step setup
  const params = new URLSearchParams(window.location.search);
  const initialStep = params.get("step");
  const initialName = params.get("name") || sessionStorage.getItem("saybyme_sender");
  const initialTo = params.get("to") || sessionStorage.getItem("saybyme_recipient");

  if (initialStep === "7") {
    if (initialName) sessionStorage.setItem("saybyme_sender", initialName);
    if (initialTo) sessionStorage.setItem("saybyme_recipient", initialTo);
    showStep7();
  } else if (initialStep === "5") {
    if (initialName) sessionStorage.setItem("saybyme_sender", initialName);
    if (initialTo) sessionStorage.setItem("saybyme_recipient", initialTo);
    showStep5();
  } else if (initialStep === "4") {
    if (initialName) sessionStorage.setItem("saybyme_sender", initialName);
    if (initialTo) sessionStorage.setItem("saybyme_recipient", initialTo);
    showStep4();
  } else if (initialStep === "3" || (initialName && initialTo)) {
    if (initialName) sessionStorage.setItem("saybyme_sender", initialName);
    if (initialTo) sessionStorage.setItem("saybyme_recipient", initialTo);
    showStep3();
  } else if (initialName) {
    showStep2(initialName);
  } else {
    showStep1();
  }

  // Step 1: Submit -> Step 2
  homeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    sessionStorage.setItem("saybyme_sender", name);
    showStep2(name);
  });

  // Step 2: Back -> Step 1
  backToStep1.addEventListener("click", () => {
    showStep1();
  });

  // Step 2: Submit -> Step 3
  recipientForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const to = recipientInput.value.trim();
    if (!to) return;

    sessionStorage.setItem("saybyme_recipient", to);
    showStep3();
  });

  // Step 3: Option Card Selection
  optionCards.forEach((card) => {
    card.addEventListener("click", () => {
      optionCards.forEach((c) => {
        c.classList.remove("selected");
        c.setAttribute("aria-checked", "false");
      });
      card.classList.add("selected");
      card.setAttribute("aria-checked", "true");
      selectedQuestion = card.getAttribute("data-question");
    });
  });

  // Step 3: Back -> Step 2
  backToStep2.addEventListener("click", () => {
    const from = sessionStorage.getItem("saybyme_sender") || "";
    showStep2(from);
  });

  // Step 3: Submit -> Step 4
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("saybyme_question", selectedQuestion);
    showStep4();
  });

  // Step 4: Back -> Step 3
  backToStep3.addEventListener("click", () => {
    showStep3();
  });

  // Step 4: Submit -> Step 5
  letterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = letterTextarea.value.trim() || DEFAULT_MESSAGE;
    sessionStorage.setItem("saybyme_message", message);
    showStep5();
  });

  // Step 5: Back -> Step 4
  backToStep4.addEventListener("click", () => {
    showStep4();
  });

  // Step 5: Submit -> Step 7 (Final Proposal Preview)
  step5Form.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("saybyme_celebrations", JSON.stringify(selectedCelebrations));
    showStep7();
  });

  // Initialize Card Deck
  initCardDeck();
});





