"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type HeroNavTheme = "immersive" | "light";

type HeroNavContextValue = {
  theme: HeroNavTheme;
  setTheme: (theme: HeroNavTheme) => void;
  pageHeroActive: boolean;
  setPageHeroActive: (active: boolean) => void;
};

const HeroNavContext = createContext<HeroNavContextValue | null>(null);

export function HeroNavProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<HeroNavTheme>("immersive");
  const [pageHeroActive, setPageHeroActive] = useState(false);
  const value = useMemo(
    () => ({ theme, setTheme, pageHeroActive, setPageHeroActive }),
    [theme, pageHeroActive],
  );
  return <HeroNavContext.Provider value={value}>{children}</HeroNavContext.Provider>;
}

export function useHeroNav() {
  return useContext(HeroNavContext);
}
