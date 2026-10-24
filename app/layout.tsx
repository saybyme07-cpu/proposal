import type { Metadata, Viewport } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "../style.css";

export const metadata: Metadata = {
  title: "SayByMe — Small things... Big emotions...",
  description: "Create personalized romantic proposals with interactive love letters, memories photo deck, and heart fireworks.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Itim&family=Quicksand:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/audio/bgm.m4a" as="fetch" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
