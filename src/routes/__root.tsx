import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { NotFound } from "./not-found";
import { RouteErrorComponent } from "#/components/error-component";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My-Chama — Where Your Chama Thrives" },
      {
        name: "description",
        content:
          "Modern platform for managing Kenyan investment groups — automate contributions, track loans, and reconcile M-Pesa payments in one place.",
      },
      { name: "author", content: "Cornelius Motanya" },
      { name: "theme-color", content: "#C8A96E" },
      { property: "og:title", content: "My-Chama — Where Your Chama Thrives" },
      {
        property: "og:description",
        content:
          "Automate contributions, approve loans, and track M-Pesa payments in one platform built for Kenyan investment groups.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_KE" },
      { property: "og:site_name", content: "My-Chama" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/icons/site.webmanifest" },
      { rel: "icon", href: "/icons/favicon.ico" },
      { rel: "shortcut icon", href: "/icons/favicon-16x16.png" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
    ],
  }),
  errorComponent: RouteErrorComponent,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sora flex min-h-dvh flex-col antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
