import { useEffect, useRef, useState } from "react";
import { Sun } from "./sun";
import { Moon } from "./moon";

type ThemeMode = "light" | "dark";
type IconPhase = "enter" | "exit";

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;

  if (typeof window !== "undefined") {
    localStorage.setItem("theme", mode);
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<IconPhase>("enter");
  const [ripple, setRipple] = useState(false);
  const animating = useRef(false);

  useEffect(() => {
    const resolved = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setMode(resolved);
    setMounted(true);
  }, []);

  function toggleMode() {
    if (animating.current) return;
    animating.current = true;

    setPhase("exit");
    setRipple(true);

    setTimeout(() => {
      const next: ThemeMode = mode === "light" ? "dark" : "light";
      setMode(next);
      applyThemeMode(next);
      setPhase("enter");
      setTimeout(() => {
        animating.current = false;
      }, 320);
    }, 180);
  }

  const isLight = mode === "light";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={!isLight}
      className={[
        "relative size-12 cursor-pointer overflow-hidden",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:scale-105 focus-visible:outline-none active:scale-95 active:animate-spin",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2",
        isLight
          ? "border-inverse-primary bg-surface"
          : "border-outline-variant",
      ].join(" ")}
      onAnimationEnd={() => setRipple(false)}
    >
      {/* Ripple */}
      {ripple && (
        <span
          aria-hidden="true"
          className={["absolute inset-0", "animate-theme-ripple"].join(" ")}
        />
      )}

      {/* Icon */}
      <span
        aria-hidden="true"
        suppressHydrationWarning
        className={[
          "absolute flex items-center justify-center",
          phase === "enter" ? "animate-theme-enter" : "animate-theme-exit",
          mounted ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {isLight ? <Sun /> : <Moon />}
      </span>
    </button>
  );
}
