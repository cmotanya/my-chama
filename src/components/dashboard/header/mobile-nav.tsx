import { useEffect, useState } from "react";
import HamburgerMenu from "./hamburger";
import { cn } from "../../../../lib/utils/cn";
import { navigation_links } from "../../../../data/navigation-links";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { Logout03Icon, UserCircle02Icon } from "hugeicons-react";
import { logoutFn } from "#/server/logout";
import ThemeToggle from "#/components/theme/theme-toggle";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <nav aria-label="mobile navigation" className="relative md:hidden">
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
            "bg-muted fixed inset-0 flex w-3/4 flex-col overflow-hidden border-r py-2 shadow-xl transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* theme and close button */}
          <div className="flex items-center justify-between px-3">
            <ThemeToggle />

            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              {" "}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="var(--error)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* chama name */}
          <div className="border-b px-5 py-5 text-sm font-medium uppercase">
            <p className="text-muted-foreground text-[10px] tracking-widest">
              Active Group:
            </p>
            <h2 className="text-primary font-bold tracking-widest">
              {user.chamaName ?? "No active group"}
            </h2>
          </div>

          {/* link navigation */}
          <ul className="flex-1 p-2">
            {navigation_links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to} className="w-full">
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="mb-0.5 flex items-center gap-3 rounded-2xl px-3 py-[11px] text-[14px] transition-colors"
                    activeProps={{
                      className:
                        "text-muted-foreground border-muted-foreground/20 bg-muted-foreground/15 border border-r-0 font-medium",
                    }}
                  >
                    <Icon strokeWidth={2} />
                    <span className="">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* user profile identity */}
          <div className="space-y-4 border-t px-2 pt-4 pb-2">
            <div className="bg-muted item-center mt-auto flex rounded-3xl">
              <div className="flex w-full shrink-0 items-center justify-start gap-4 p-3">
                <UserCircle02Icon
                  color="var(--muted-foreground)"
                  fill="var(--border)"
                  strokeWidth={2}
                />
                <div className="flex min-w-0 flex-col tracking-tight">
                  <p className="text-primary text-sm font-semibold">
                    {user.name}
                  </p>
                  <p className="text-muted-foreground/90 text-[10px]">
                    Role: <span className="capitalize">{user.role}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* sign out button */}
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
