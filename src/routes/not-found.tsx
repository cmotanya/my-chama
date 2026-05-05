import { Link } from "@tanstack/react-router";
import { ArrowRight02Icon } from "hugeicons-react";

export function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 space-y-8 px-5 py-24">
      <div className="fu1 space-y-2">
        <h1 className="text-primary font-unbounded text-center text-3xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="">
          The page you’re looking for doesn’t exist (or may have moved).
        </p>
      </div>

      <div className="fu2 w-full">
        <Link to="/" className="">
          <button className="btn-primary group flex items-center justify-center gap-2 font-semibold tracking-wider">
            Go home{" "}
            <ArrowRight02Icon className="transition-transform duration-200 ease-in-out group-active:translate-x-1" />{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
