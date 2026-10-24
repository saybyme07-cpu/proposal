"use client";

import { useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Script from "next/script";

interface PreviewClientProps {
  htmlContent: string;
  slug: string;
}

export default function PreviewClient({ htmlContent, slug }: PreviewClientProps) {
  const proposal = useQuery(api.proposals.getProposalBySlug, slug ? { slug } : "skip");
  const markAccepted = useMutation(api.proposals.markAccepted);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!proposal) return;

    // Set proposal data into sessionStorage
    sessionStorage.setItem("saybyme_sender", proposal.senderName || "");
    sessionStorage.setItem("saybyme_recipient", proposal.recipientName || "");
    sessionStorage.setItem("saybyme_question", proposal.question || "Will you be mine?");
    sessionStorage.setItem("saybyme_message", proposal.message || "");
    sessionStorage.setItem(
      "saybyme_celebrations",
      JSON.stringify(proposal.celebrations || ["memories", "fireworks"])
    );

    // Set global hooks for script.js
    (window as any).__SAYBYME_RECIPIENT_MODE__ = true;
    (window as any).__SAYBYME_ON_ACCEPT__ = () => {
      if (slug) {
        markAccepted({ slug }).catch((err) => console.error("Error marking accepted:", err));
      }
    };

    document.body.classList.add("recipient-view");

    // Only run initSayByMe ONCE! When markAccepted updates the proposal document in Convex,
    // useQuery triggers a re-render. Do NOT re-run initSayByMe or it will reset to the letter.
    if (!initializedRef.current) {
      initializedRef.current = true;
      if (typeof (window as any).initSayByMe === "function") {
        (window as any).initSayByMe();
      }
    }

    return () => {
      document.body.classList.remove("recipient-view");
    };
  }, [proposal, slug, markAccepted]);

  // Loading state
  if (proposal === undefined) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FFF5F7 0%, #FFCCD5 100%)",
          fontFamily: "'Quicksand', sans-serif",
          color: "#92364C",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div style={{ fontSize: "52px" }} className="sbm-bob">
          💌
        </div>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", marginTop: "16px" }}>
          Opening your surprise...
        </h2>
        <p style={{ fontSize: "14px", color: "#A45D6C", marginTop: "6px" }}>
          Preparing something special just for you ✨
        </p>
      </div>
    );
  }

  // Not found state
  if (proposal === null) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FFF5F7 0%, #FFCCD5 100%)",
          fontFamily: "'Quicksand', sans-serif",
          color: "#92364C",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ fontSize: "48px" }}>💔</div>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "34px", marginTop: "14px" }}>
          Surprise Not Found
        </h2>
        <p style={{ maxWidth: "340px", fontSize: "15px", color: "#A45D6C", marginTop: "8px", lineHeight: "1.4" }}>
          This love letter link may be invalid or no longer available.
        </p>
        <Link
          href="/"
          className="sbmPrimaryBtn sbm-pop"
          style={{
            marginTop: "24px",
            textDecoration: "none",
            padding: "12px 28px",
            fontSize: "15px",
            display: "inline-block",
          }}
        >
          Create your own surprise 💖
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="recipient-view" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/script.js?v=11" strategy="afterInteractive" />
    </>
  );
}
