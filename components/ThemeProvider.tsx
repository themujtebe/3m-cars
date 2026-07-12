"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

export default function ThemeProvider() {
  const dark = useThemeStore((s) => s.dark);

  // First visit (no saved preference yet): adopt system preference once.
  useEffect(() => {
    if (localStorage.getItem("3mcars-theme")) return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    useThemeStore.setState({ dark: prefersDark });
  }, []);

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
