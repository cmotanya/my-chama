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
  size = 64,
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
    <div className="relative z-100 inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open account menu"
        className={cn(
          "relative h-full w-full cursor-pointer rounded-full p-0.5 ring ring-offset-1 transition-all duration-200",
          isOpen
            ? "ring-success ring-offset-success"
            : "ring-muted ring-offset-background",
        )}
      >
        <img
          src={avatarUrl}
          alt="User avatar"
          width={size}
          height={size}
          loading="lazy"
          className={cn("inline-block object-cover select-none", className)}
        />

        <span className="bg-success border-background absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2" />
      </button>

      {isOpen && (
        <div className="bg-background absolute right-0 mt-2 flex w-56 flex-col items-start gap-1 overflow-hidden rounded-3xl border p-1.5 text-sm whitespace-nowrap shadow-md">
          <Link
            to="/profile"
            className="fu1 hover:bg-success/10 flex h-full w-full items-center gap-3 p-2 font-medium transition-all duration-200 active:scale-105"
            activeProps={{ className: "bg-success/15 rounded-2xl" }}
          >
            {" "}
            <span className="bg-success/30 ring-success/80 flex size-7 shrink-0 items-center justify-center rounded-xl ring">
              <UserEdit01Icon
                size={20}
                strokeWidth={2.5}
                className="text-success"
              />{" "}
            </span>
            Profile Setting
          </Link>

          <button
            onClick={handleLogout}
            className="fu2 hover:bg-error/10 flex w-full cursor-pointer items-center gap-3 rounded-2xl p-2 font-medium transition-all duration-200 active:scale-105"
          >
            <span className="bg-error/20 ring-error/60 flex size-7 shrink-0 items-center justify-center rounded-xl ring">
              <Logout03Icon
                size={20}
                strokeWidth={2.5}
                className="text-error"
              />
            </span>{" "}
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
