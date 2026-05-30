"use client";

import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./hamburger";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="mobile navigation"
      className="relative md:hidden"
    >
      {/* Hamburger button */}
      {/* <div className="fixed top-10 right-3 -translate-y-1/2"> */}
      <HamburgerMenu onclick={toggleMenu} isOpen={isOpen} />
      {/* </div> */}

      {/* Mobile menu */}
      {isOpen && <div></div>}
    </nav>
  );
};

export default MobileNavigation;
