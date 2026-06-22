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
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <img
          src={avatarUrl}
          alt="User avatar"
          width={size}
          height={size}
          loading="lazy"
          className={cn("inline-block object-cover select-none", className)}
        />
      </button>

      {isOpen && (
        <div className="bg-muted text-muted-foreground absolute right-0 mt-2 flex w-35 flex-col items-start gap-5 rounded-2xl border px-2 py-4 text-sm backdrop-blur-xl">
          <Link to="/profile" className="flex w-full items-center gap-1.5">
            {" "}
            <UserEdit01Icon size={20} strokeWidth={2} /> Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-1.5"
          >
            <Logout03Icon size={20} strokeWidth={2} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
