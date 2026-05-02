import type { ErrorComponentProps } from "@tanstack/react-router";

export function RouteErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
