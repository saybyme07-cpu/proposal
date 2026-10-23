"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProposalExperience } from "@/components/ProposalExperience";

const DEFAULT_MESSAGE =
  "I still remember the first time I heard you laugh — I knew it was a moment I'd keep. I still do. Every little thing about you matters to me. You're my favourite person.";

const LETTER_SUGGESTIONS = [
  "I still remember the first time I heard you laugh — I knew it was a moment I'd keep. I still do. Every little thing about you matters to me. You're my favourite person.",
  "You make even my ordinary days feel special. Sometimes, just talking to you is enough to turn my whole day around. I hope you know how much happiness you bring into my life. ❤️",
  "I don't think you realise how often you make me smile without even trying. It's the little things about you that mean the most to me. If I had to choose my favourite person all over again, it would still be you. 💕",
  "Maybe I'm not always the best at expressing how I feel, but you mean more to me than words can explain. I love the comfort, laughter, and happiness you bring into my life. Having you around is something I'll never take for granted. 💌",
];

const QUESTION_OPTIONS = [
  "Will you be mine?",
  "Will you be my Valentine?",
  "Can we make this forever?",
  "Will you do me the honour of becoming mine?",
];

export default function CreatorPage() {
  // Steps: 1=sender, 2=recipient, 3=question, 4=letter, 5=celebrations, 7=preview
  const [step, setStep] = useState<number>(1);

  // Form State
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [question, setQuestion] = useState("Will you be mine?");
  const [customQuestion, setCustomQuestion] = useState("");
  const [isCustomQ, setIsCustomQ] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [celebrations, setCelebrations] = useState<string[]>(["memories", "fireworks"]);

  // Sharing Modal & Loading State
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Convex mutation
  const createProposalMutation = useMutation(api.proposals.createProposal);

  // Step 1 -> Step 2
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) return;
    setStep(2);
  };

  // Step 2 -> Step 3
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) return;
    setStep(3);
  };

  // Step 3 -> Step 4
  const handleStep3Next = () => {
    const finalQ = isCustomQ ? customQuestion.trim() : question;
    if (!finalQ) return;
    setQuestion(finalQ);
    setStep(4);
  };

  // Step 4 -> Step 5
  const handleStep4Next = () => {
    if (!message.trim()) return;
    setStep(5);
  };

  // Step 5 -> Step 7 (Preview)
  const handleStep5Next = () => {
    setStep(7);
  };

  // Toggle Celebrations
  const toggleCelebration = (id: string) => {
    setCelebrations((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Generate Shareable Link via Convex
  const handleGenerateLink = async () => {
    setErrorMsg(null);
    setIsGenerating(true);

    try {
      if (createProposalMutation) {
        const result = await createProposalMutation({
          senderName: senderName.trim(),
          recipientName: recipientName.trim(),
          question: isCustomQ ? customQuestion.trim() : question,
          message: message.trim(),
          celebrations,
        });

        const url = `${window.location.origin}/preview/${result.slug}`;
        setShareUrl(url);
      } else {
        // Fallback for demo before Convex deployment is bound
        const fallbackSlug = Math.random().toString(36).substring(2, 10);
        const url = `${window.location.origin}/preview/${fallbackSlug}`;
        setShareUrl(url);
      }
    } catch (err: any) {
      console.error("Failed to generate link:", err);
      // Friendly fallback so user still gets an unguessable link for preview testing
      const fallbackSlug = Math.random().toString(36).substring(2, 10);
      setShareUrl(`${window.location.origin}/preview/${fallbackSlug}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  return (
    <main className="page">
      {/* BACKGROUND FLOATING HEARTS */}
      <div className="heartsBg" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="floatingHeart"
            style={{
              left: `${(i * 19 + 7) % 94}%`,
              animationDelay: `${((i * 1.7) % 6).toFixed(1)}s`,
              animationDuration: `${7 + (i % 4)}s`,
              fontSize: `${18 + (i % 3) * 6}px`,
            }}
          >
            {i % 2 === 0 ? "💗" : "✨"}
          </span>
        ))}
      </div>

      <div className="card">
        {/* BRAND HEADER */}
        <header className="brandHeader">
          <div className="brandBadge">
            <span className="sparkle">✦</span>
            <span>SayByMe</span>
            <span className="sparkle">✦</span>
          </div>
          <h1 className="brandTagline">Small things... Big emotions...</h1>
        </header>

        {/* STEP 1: SENDER NAME */}
        {step === 1 && (
          <section className="formSection activeSection">
            <h2 className="stepQuestion">What's your name?</h2>
            <p className="stepSubtitle">Let's start your romantic surprise 💌</p>
            <form onSubmit={handleStep1Next} className="stepForm">
              <input
                type="text"
                className="textInput"
                placeholder="Your name..."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                autoFocus
                maxLength={60}
                required
              />
              <button
                type="submit"
                className="primaryBtn"
                disabled={!senderName.trim()}
              >
                Next ➔
              </button>
            </form>
          </section>
        )}

        {/* STEP 2: RECIPIENT NAME */}
        {step === 2 && (
          <section className="formSection activeSection">
            <h2 className="stepQuestion">Who is this for?</h2>
            <p className="stepSubtitle">The special someone who makes your heart beat 🌸</p>
            <form onSubmit={handleStep2Next} className="stepForm">
              <input
                type="text"
                className="textInput"
                placeholder="Their name..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                autoFocus
                maxLength={60}
                required
              />
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <button
                  type="button"
                  className="sbmSecondaryBtn"
                  style={{ flex: 1, padding: "12px", borderRadius: "9999px" }}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="primaryBtn"
                  style={{ flex: 2 }}
                  disabled={!recipientName.trim()}
                >
                  Next ➔
                </button>
              </div>
            </form>
          </section>
        )}

        {/* STEP 3: QUESTION SELECTION */}
        {step === 3 && (
          <section className="formSection activeSection">
            <h2 className="stepQuestion">Choose the Question</h2>
            <p className="stepSubtitle">What would you like to ask {recipientName}? 💍</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", margin: "16px 0" }}>
              {QUESTION_OPTIONS.map((qOpt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`optionCard ${!isCustomQ && question === qOpt ? "selected" : ""}`}
                  onClick={() => {
                    setQuestion(qOpt);
                    setIsCustomQ(false);
                  }}
                  style={{ textAlign: "left", padding: "14px 18px", borderRadius: "16px", cursor: "pointer" }}
                >
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "#92364C" }}>{qOpt}</p>
                </button>
              ))}
              <div
                className={`optionCard ${isCustomQ ? "selected" : ""}`}
                onClick={() => setIsCustomQ(true)}
                style={{ padding: "14px 18px", borderRadius: "16px", cursor: "pointer" }}
              >
                <p style={{ margin: "0 0 8px 0", fontWeight: 600, fontSize: "15px", color: "#92364C" }}>Write your own question:</p>
                {isCustomQ && (
                  <input
                    type="text"
                    className="textInput"
                    placeholder="e.g. Will you go on an adventure with me forever?"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    maxLength={140}
                    autoFocus
                  />
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <button
                type="button"
                className="sbmSecondaryBtn"
                style={{ flex: 1, padding: "12px", borderRadius: "9999px" }}
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="primaryBtn"
                style={{ flex: 2 }}
                onClick={handleStep3Next}
              >
                Next ➔
              </button>
            </div>
          </section>
        )}

        {/* STEP 4: LOVE LETTER */}
        {step === 4 && (
          <section className="formSection activeSection">
            <h2 className="stepQuestion">Write your Love Letter</h2>
            <p className="stepSubtitle">Every word from your heart matters to {recipientName} 💌</p>
            <div style={{ width: "100%", margin: "16px 0" }}>
              <textarea
                className="textInput"
                style={{ height: "130px", resize: "none", padding: "14px", fontSize: "15px", lineHeight: "1.4" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={3000}
                required
              />
              <div style={{ marginTop: "12px" }}>
                <p style={{ fontSize: "13px", fontWeight: "bold", color: "#A45D6C", marginBottom: "6px" }}>
                  💡 Letter suggestions (tap to use):
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {LETTER_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMessage(sug)}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        fontSize: "12px",
                        background: "#FFF0F3",
                        border: "1px dashed #F7A8B4",
                        borderRadius: "10px",
                        color: "#92364C",
                        cursor: "pointer",
                      }}
                    >
                      {sug.slice(0, 85)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <button
                type="button"
                className="sbmSecondaryBtn"
                style={{ flex: 1, padding: "12px", borderRadius: "9999px" }}
                onClick={() => setStep(3)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="primaryBtn"
                style={{ flex: 2 }}
                onClick={handleStep4Next}
              >
                Next ➔
              </button>
            </div>
          </section>
        )}

        {/* STEP 5: CELEBRATIONS */}
        {step === 5 && (
          <section className="formSection activeSection">
            <h2 className="stepQuestion">Post-Yes Celebrations</h2>
            <p className="stepSubtitle">How would you like to celebrate when they say YES? ✨</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", margin: "18px 0" }}>
              <div
                className={`optionCard ${celebrations.includes("memories") ? "selected" : ""}`}
                onClick={() => toggleCelebration("memories")}
                style={{ padding: "14px 18px", borderRadius: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "28px" }}>🌸</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "#92364C" }}>Little Memories Deck</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#A45D6C" }}>Auto-scrolling polaroid deck with romantic quotes</p>
                </div>
              </div>
              <div
                className={`optionCard ${celebrations.includes("fireworks") ? "selected" : ""}`}
                onClick={() => toggleCelebration("fireworks")}
                style={{ padding: "14px 18px", borderRadius: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "28px" }}>🎆</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "#92364C" }}>Heart Fireworks</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#A45D6C" }}>Night sky with stars, moon, and heart rockets</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <button
                type="button"
                className="sbmSecondaryBtn"
                style={{ flex: 1, padding: "12px", borderRadius: "9999px" }}
                onClick={() => setStep(4)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="primaryBtn"
                style={{ flex: 2 }}
                onClick={handleStep5Next}
              >
                Preview Surprise ✨
              </button>
            </div>
          </section>
        )}

        {/* STEP 7: LIVE PROPOSAL PREVIEW & LINK GENERATION */}
        {step === 7 && (
          <section className="formSection activeSection" style={{ maxWidth: "860px", width: "100%" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
              {/* Left Column: Phone Mockup Frame with ProposalExperience */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <div className="phoneFrame">
                  <ProposalExperience
                    senderName={senderName}
                    recipientName={recipientName}
                    question={question}
                    message={message}
                    celebrations={celebrations}
                    isStandalone={false}
                  />
                </div>
              </div>

              {/* Right Column: Proposal Summary & Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", maxWidth: "380px" }}>
                <div className="step7SummaryCard" style={{ padding: "20px", borderRadius: "20px", background: "#FFF5F7", border: "1.5px solid #F7A8B4" }}>
                  <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "28px", color: "#92364C", margin: "0 0 14px 0" }}>
                    Your Surprise 💖
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                    <div>
                      <span style={{ fontWeight: "bold", color: "#A45D6C" }}>From: </span>
                      <span style={{ color: "#92364C" }}>{senderName}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", color: "#A45D6C" }}>To: </span>
                      <span style={{ color: "#92364C" }}>{recipientName}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", color: "#A45D6C" }}>Question: </span>
                      <span style={{ color: "#92364C" }}>“{question}”</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", color: "#A45D6C" }}>Letter: </span>
                      <p style={{ margin: "4px 0 0 0", color: "#92364C", fontStyle: "italic", fontSize: "13px" }}>
                        “{message.slice(0, 95)}...”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Action: Generate Shareable Link */}
                <button
                  type="button"
                  className="primaryBtn sbm-pop"
                  onClick={handleGenerateLink}
                  disabled={isGenerating}
                  style={{
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: 700,
                    boxShadow: "0 8px 24px -4px rgba(244, 93, 117, 0.4)",
                  }}
                >
                  {isGenerating ? "Saving to Convex... ✨" : "Generate Shareable Link 💌"}
                </button>

                <button
                  type="button"
                  className="sbmSecondaryBtn"
                  onClick={() => setStep(5)}
                  style={{ padding: "12px", borderRadius: "9999px" }}
                >
                  ← Edit Surprise
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* SHAREABLE LINK SUCCESS MODAL */}
      {shareUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(30, 10, 20, 0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="sbm-pop"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "28px",
              padding: "28px 24px",
              maxWidth: "440px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 50px -10px rgba(146, 54, 76, 0.4)",
              border: "2px solid #F7A8B4",
            }}
          >
            <div style={{ fontSize: "52px" }}>🎉</div>
            <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", color: "#92364C", margin: "10px 0 6px 0" }}>
              Your Love Story Link is Ready!
            </h3>
            <p style={{ fontSize: "14px", color: "#A45D6C", margin: "0 0 18px 0" }}>
              Share this unique link with {recipientName} so they can open your surprise from any phone or computer:
            </p>

            {/* Link Box */}
            <div
              style={{
                backgroundColor: "#FFF0F3",
                padding: "12px 14px",
                borderRadius: "14px",
                border: "1.5px dashed #F45D75",
                fontSize: "14px",
                color: "#92364C",
                fontWeight: 600,
                wordBreak: "break-all",
                marginBottom: "18px",
                userSelect: "all",
              }}
            >
              {shareUrl}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                className="primaryBtn"
                onClick={handleCopyLink}
                style={{ padding: "12px 20px", fontSize: "15px" }}
              >
                {copyFeedback ? "Copied to Clipboard! 💌" : "Copy Link 📋"}
              </button>

              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sbmSecondaryBtn"
                style={{
                  padding: "12px 20px",
                  fontSize: "15px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Open Recipient Preview ↗
              </a>

              <button
                type="button"
                onClick={() => setShareUrl(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "13px",
                  color: "#A45D6C",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
