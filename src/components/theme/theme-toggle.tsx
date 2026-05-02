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
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);
  const [phase, setPhase] = useState<IconPhase>("enter");
  const [ripple, setRipple] = useState(false);
  const animating = useRef(false);

  type IconPhase = "enter" | "exit";

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  function toggleMode() {
    if (animating.current) return;
    animating.current = true;

    setPhase("exit");
    setRipple(true);

    setTimeout(() => {
      const next: ThemeMode = mode === "light" ? "dark" : "light";
      setMode(next);
      setPhase("enter");
      localStorage.setItem("theme", next);
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
        "relative size-12 overflow-hidden",
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
          className={[
            "absolute inset-0",
            "animate-[theme-ripple_500ms_ease-out_forwards]",
          ].join(" ")}
        />
      )}

      {/* Icon */}
      <span
        aria-hidden="true"
        className={[
          "absolute flex items-center justify-center",
          phase === "enter"
            ? "animate-[theme-icon-enter_320ms_cubic-bezier(0.34,1.4,0.64,1)_forwards]"
            : "animate-[theme-icon-exit_200ms_cubic-bezier(0.4,0,1,1)_forwards]",
        ].join(" ")}
      >
        {isLight ? <Sun /> : <Moon />}
      </span>
    </button>
  );
}
