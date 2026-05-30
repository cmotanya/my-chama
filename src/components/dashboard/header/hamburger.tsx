import { useEffect, useState } from "react";
import { cn } from "../../../../lib/cn";

const HamburgerMenu = ({
  onclick,
  isOpen,
}: {
  onclick: () => void;
  isOpen: boolean;
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      onClick={onclick}
      aria-label={cn(isOpen ? "Close Menu" : "Open Menu")}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        "relative flex size-12 cursor-pointer flex-col items-center justify-center transition-colors duration-300",
        hasScrolled && isOpen
          ? "bg-error rounded-full"
          : hasScrolled
            ? "bg-primary rounded-lg"
            : isOpen
              ? "bg-error rounded-full"
              : "bg-secondary/30 rounded-lg",
      )}
    >
      <div className="relative size-7">
        <span
          className={cn(
            "absolute left-0 h-1 w-full transform transition duration-300",
            isOpen ? "top-1/2 -rotate-45 bg-white" : "bg-success top-1",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
        <span
          className={cn(
            "absolute top-3 left-0 h-1 w-full transform transition duration-300",
            isOpen ? "opacity-0" : "bg-success",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
        <span
          className={cn(
            "absolute right-0 h-1 w-3/4 transform transition duration-300",
            isOpen
              ? "top-1/2 w-full rotate-45 bg-white"
              : "bg-success top-[1.2rem]",
            hasScrolled ? "bg-white" : "",
          )}
        ></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;
