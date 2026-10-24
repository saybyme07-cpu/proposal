import fs from "fs";
import path from "path";
import Script from "next/script";

export default function Page() {
  const filePath = path.join(process.cwd(), "public", "main-content.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/script.js?v=6" strategy="afterInteractive" />
    </>
  );
}
