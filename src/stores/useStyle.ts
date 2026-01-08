import { create } from "zustand";

interface GlobalStyle {
  footerColor: "lightGray" | "white";
  setFooterColor: (newColor: "lightGray" | "white") => void;
}

export const useGlobalStyle = create<GlobalStyle>(set => ({
  footerColor: "lightGray",
  setFooterColor: (newColor: "lightGray" | "white") =>
    set(prev => ({
      ...prev,
      footerColor: newColor,
    })),
}));
