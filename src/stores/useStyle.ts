import { create } from "zustand";

interface GlobalStyle {
  footerColor: "lightGray" | "white";
}

export const useGlobalStyle = create<GlobalStyle>(set => ({
  footerColor: "lightGray",
  setFooterColor: (newColor: "lightGray" | "white") =>
    set(prev => ({
      ...prev,
      footerColor: newColor,
    })),
}));
