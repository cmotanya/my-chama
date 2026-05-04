import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Footer from "../components/footer";
import Header from "../components/header";

import appCss from "../styles.css?url";
import { RouteErrorComponent } from "#/components/error-component";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

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
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", href: "/icons/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  errorComponent: RouteErrorComponent,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sora flex min-h-dvh flex-col antialiased">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
