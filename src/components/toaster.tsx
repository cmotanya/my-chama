import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        style: {
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          fontSize: "14px",
        },
        success: {
          duration: 3000,
          style: {
            background: "var(--success)",
            color: "var(--background)",
            border: "2px solid hsl(var(--success))",
          },
        },

        error: {
          duration: 3000,
          style: {
            background: "var(--error)",
            color: "var(--background)",
          },
        },
      }}
    />
  );
}
