import { Link } from "@tanstack/react-router";
import ThemeToggle from "./theme/theme-toggle";

export default function Header() {
  return (
    <header className="bg-muted sticky top-0 z-50 p-2 shadow-xl backdrop-blur-lg">
      <nav className="flex items-center justify-between">
        <Link to={"/"}>
          <img src="/logo.webp" alt="logo" width={80} height={80} />
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
}
