import { logoutFn } from "#/server/logout";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Logout03Icon, UserEdit01Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils/cn";

interface AvatarProps {
  seed: string;
  name?: "avataaars";
  size?: number;
  className?: string;
}

export const Avatar = ({
  seed,
  name = "avataaars",
  size = 44,
  className,
}: AvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { location } = useRouterState();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logoutFn();
    await router.invalidate({ sync: true });
    router.navigate({ to: "/login" });
  };

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const avatarUrl = `https://api.dicebear.com/10.x/${name}/svg?hairColor=a55728,2c1b18,b58143,d6b370,724133,4a312c,f59797,ecdcbf&skinColor=614335,d08b5b,edb98a&clothesColor=262e33,65c9ff,5199e4,25557c,e6e6e6,a7ffc4,ffafb9,ffffb1&seed=${encodeURIComponent(seed)}`;

  return (
    <div className="relative z-50 inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open account menu"
        className={cn(
          "relative cursor-pointer rounded-full p-0.5 transition-all duration-200",
          "ring-offset-background ring-2 ring-offset-2",
          isOpen
            ? "ring-emerald-500"
            : "ring-transparent hover:ring-neutral-200 dark:hover:ring-neutral-800",
        )}
      >
        <img
          src={avatarUrl}
          alt="User avatar"
          width={size}
          height={size}
          loading="lazy"
          className={cn(
            "inline-block rounded-full object-cover select-none",
            className,
          )}
        />
        {/* Online indicator dot */}
        <span className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-emerald-500" />
      </button>

      {isOpen && (
        <div className="bg-background absolute right-0 z-50 mt-3 w-56 origin-top-right overflow-hidden rounded-3xl border border-neutral-200 p-1.5 shadow-xl shadow-black/5 dark:border-neutral-800 dark:shadow-black/30">
          <Link
            to="/profile"
            className="group text-foreground flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            activeProps={{
              className:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/15">
              <UserEdit01Icon
                size={16}
                strokeWidth={2.5}
                className="text-blue-600 dark:text-blue-400"
              />
            </span>
            Profile Settings
          </Link>

          <div className="my-1 h-px bg-neutral-100 dark:bg-neutral-900" />

          <button
            onClick={handleLogout}
            className="text-foreground flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 transition-colors group-hover:bg-rose-500/15">
              <Logout03Icon
                size={16}
                strokeWidth={2.5}
                className="text-rose-600 dark:text-rose-400"
              />
            </span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
