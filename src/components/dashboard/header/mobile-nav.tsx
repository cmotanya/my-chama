"use client";

import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./hamburger";
import { cn } from "../../../../lib/cn";
import { navigation_links } from "../../../../data/navigation-links";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { Logout03Icon } from "hugeicons-react";
import { logoutFn } from "#/server/logout";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const { user } = useRouteContext({ from: "/_authed" });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsOpen(false);
    await logoutFn();

    await router.invalidate({ sync: true });
    router.navigate({ to: "/login" });
  };

  return (
    <nav
      ref={navRef}
      aria-label="mobile navigation"
      className="relative md:hidden"
    >
      <HamburgerMenu onClick={toggleMenu} isOpen={isOpen} />

      <div
        onClick={toggleMenu}
        className={cn(
          "fixed inset-0 z-200 backdrop-blur-sm transition-opacity duration-100 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-muted fixed inset-0 w-3/4 space-y-10 border-r py-10 shadow-xl transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="text-primary font-unbounded flex items-center gap-2 px-5 text-sm font-medium uppercase">
            <p className="">Active Group:</p>
            <span className="">{user.name}</span>
          </div>

          <ul className="flex flex-col">
            {navigation_links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to} className="w-full">
                  <Link
                    to={link.to}
                    className="flex w-full items-center gap-4 p-4"
                  >
                    <Icon strokeWidth={2} />
                    <span className="font-unbounded">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-5">
            <button
              onClick={handleSignOut}
              type="button"
              className="bg-foreground text-background flex w-full items-center justify-center gap-2 rounded-3xl border py-3.5 font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-80 active:scale-95"
            >
              Sign Out
              <Logout03Icon size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
