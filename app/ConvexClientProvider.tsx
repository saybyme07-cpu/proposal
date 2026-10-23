"use client";

import { ReactNode, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl =
    process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder-build.convex.cloud";

  const convex = useMemo(() => {
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
