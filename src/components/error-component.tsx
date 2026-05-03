import type { ErrorComponentProps } from "@tanstack/react-router";

export function RouteErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
      <p className="text-error">{error.message}</p>
      <button
        onClick={reset}
        className="bg-foreground text-background w-full rounded-2xl py-3.5 font-semibold uppercase transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}
