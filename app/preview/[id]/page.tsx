import fs from "fs";
import path from "path";
import PreviewClient from "./PreviewClient";

export default async function ProposalPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "public", "main-content.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return <PreviewClient htmlContent={htmlContent} slug={id} />;
}
