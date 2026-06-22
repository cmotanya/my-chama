import Header from "#/components/header";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft02Icon, Unlink04Icon } from "hugeicons-react";
import { THEME_INIT_SCRIPT } from "../../lib/utils/theme-script";

export const Route = createFileRoute("/not-found")({
  component: notFound,
});

function notFound() {
  return (
    <section className="h-dvh w-full">
      <Header />

      <div className="flex flex-col items-center justify-center gap-10 px-5 py-18">
        <div className="fu1 space-y-2">
          <h1 className="text-primary font-unbounded flex items-center gap-4 text-center text-3xl font-extrabold tracking-tight">
            Page not found{" "}
            <Unlink04Icon
              strokeWidth={2}
              size={30}
              color="var(--muted-foreground)"
              className="animate-pulse opacity-70"
            />
          </h1>
          <p className="">
            The page you’re looking for doesn’t exist (or may have been moved).
          </p>
        </div>

        <img
          src="/not-found.svg"
          alt="not-found"
          width="full"
          height="full"
          className="fu2 object-cover"
        />

        <div className="fu3 w-full px-5" onClick={() => window.history.back()}>
          <button className="btn-primary group flex items-center justify-center gap-2 font-medium tracking-wider">
            <ArrowLeft02Icon
              strokeWidth={2}
              className="transition-transform duration-200 ease-in-out group-active:translate-x-1"
            />{" "}
            Back to Previous Page{" "}
          </button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
    </section>
  );
}
