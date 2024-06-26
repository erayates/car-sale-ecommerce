"use client";

import HydrationLoading from "@/components/hydration-loading";
import { ReactNode, useEffect, useState } from "react";

const HydrationZustand = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : <HydrationLoading />}</>;
};

export default HydrationZustand;
