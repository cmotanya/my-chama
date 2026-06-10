import { cn } from "../../../../lib/cn";
import { MenuCircleIcon } from "hugeicons-react";

type HamburgerProps = {
  onClick: () => void;
  isOpen: boolean;
};

const HamburgerMenu = ({ onClick, isOpen }: HamburgerProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn("cursor-pointer transition-colors duration-300")}
    >
      <MenuCircleIcon color="var(--muted-foreground)" strokeWidth={2} />
    </button>
  );
};

export default HamburgerMenu;
