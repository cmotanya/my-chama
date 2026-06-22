import { useEffect, useRef, useState } from "react";
import { Sun } from "./sun";
import { Moon } from "./moon";

type ThemeMode = "light" | "dark";
type IconPhase = "enter" | "exit";

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;
  localStorage.setItem("theme", mode);
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
      aria-label="Toggle interface theme mode"
      className={[
        "relative size-12 cursor-pointer overflow-hidden",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:scale-105 focus-visible:outline-none active:scale-95",
        "focus-visible:ring-primary rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2",
        isLight
          ? "border-inverse-primary bg-surface"
          : "border-outline-variant",
      ].join(" ")}
      onAnimationEnd={() => setRipple(false)}
    >
      {ripple && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-[theme-ripple_500ms_ease-out_forwards]"
        />
      )}

      {/* Icon Container: The structural shape is completely identical between SSR and Client.
        We safely switch the actual icon using a standard visibility class once mounted.
      */}
      <span
        aria-hidden="true"
        className={[
          "absolute flex items-center justify-center transition-opacity duration-200",
          phase === "enter"
            ? "animate-[theme-icon-enter_320ms_cubic-bezier(0.34,1.4,0.64,1)_forwards]"
            : "animate-[theme-icon-exit_200ms_cubic-bezier(0.4,0,1,1)_forwards]",
          mounted ? "opacity-100" : "opacity-0", // ◄ Fades elements cleanly once client context mounts
        ].join(" ")}
      >
        {isLight ? <Sun /> : <Moon />}
      </span>
    </button>
  );
}
