"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

export default function ThemeProvider() {
  const dark = useThemeStore((s) => s.dark);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [dark]);

  return null;
}
