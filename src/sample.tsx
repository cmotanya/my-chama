import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 py-12">
      {/* 
         Main Shell: Using the 'rise-in' class for that subtle GSAP entry animation.
         Applying rounded-[2rem] for the 'Island' aesthetic.
      */}
      <section className="island-shell rise-in relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-2xl sm:p-16">
        {/* Branding & Introduction */}
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-950 text-white">
            {/* Simplified Shield Icon based on your logo concept */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-10 w-10"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v8M8 12h8" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
            My-Chama
          </h1>

          <div className="mt-6 space-y-5">
            <p className="text-lg leading-relaxed font-medium text-neutral-600">
              Precision tools for collective prosperity.
            </p>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-400">
              We bridge the gap between traditional communal saving and modern
              financial technology. My-Chama provides the transparency,
              security, and growth tracking your investment group deserves.
            </p>
          </div>
        </div>

        {/* Focused Action Area */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          <button className="group relative w-full max-w-xs overflow-hidden rounded-xl bg-neutral-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]">
            <span className="relative z-10">Sign In to Dashboard</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </button>

          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-300 uppercase">
            Unity • Investment • Growth
          </p>
        </div>

        {/* Subtle Background Bento Detail */}
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-neutral-50 blur-3xl" />
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-neutral-100/50 blur-3xl" />
      </section>
    </main>
  );
}
