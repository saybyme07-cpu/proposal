"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ProposalExperience } from "@/components/ProposalExperience";

export default function ProposalPreviewPage() {
  const params = useParams();
  const slug = (params?.id as string) || "";

  // Convex query
  const proposal = useQuery(api.proposals.getProposalBySlug, slug ? { slug } : "skip");
  const markAccepted = useMutation(api.proposals.markAccepted);

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

  // Loaded proposal experience
  return (
    <ProposalExperience
      senderName={proposal.senderName}
      recipientName={proposal.recipientName}
      question={proposal.question}
      message={proposal.message}
      celebrations={proposal.celebrations}
      isStandalone={true}
      onAccept={() => {
        if (slug) markAccepted({ slug });
      }}
    />
  );
}
