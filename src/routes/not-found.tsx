import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight02Icon } from "hugeicons-react";

export const Route = createFileRoute("/not-found")({
  component: NotFound,
});

export function NotFound() {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 py-18">
      <div className="fu1 space-y-2">
        <h1 className="text-primary font-unbounded text-center text-3xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="">
          The page you’re looking for doesn’t exist (or may have moved).
        </p>
      </div>

      <img
        src="/not-found.svg"
        alt="not-found"
        width="full"
        height="full"
        className="fu2 object-cover"
      />

      <div className="fu3 w-full px-5">
        <Link to="/" className="">
          <button className="btn-primary group flex items-center justify-center gap-2 font-semibold tracking-wider">
            Go home{" "}
            <ArrowRight02Icon
              strokeWidth={2}
              className="transition-transform duration-200 ease-in-out group-active:translate-x-1"
            />{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
