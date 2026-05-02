import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight02Icon } from "hugeicons-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="h-full py-15">
      <section className="flex h-full flex-col items-center justify-center space-y-8">
        <h1 className="px-4 text-center text-6xl leading-16 font-extrabold tracking-tighter">
          MY CHAMA{" "}
          <span className="text-muted-foreground font-bad_script">
            SYSTEM
          </span>{" "}
        </h1>

        <div className="space-y-4 px-4 text-center">
          <p className="font-semibold">
            Precision tools for collective prosperity.
          </p>
          <p className="text-muted-foreground">
            We bridge the gap between traditional communal savings and modern
            financial technology. My-Chama provides the transparency, security
            and growth tracking your investment group deserves.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 px-8 font-semibold tracking-widest">
          <Link to="/">
            <button className="bg-foreground text-background w-full rounded-2xl py-4.5 uppercase shadow-xl transition-all duration-200 ease-in-out hover:scale-95 active:scale-105">
              Sign In To Dashboard
            </button>
          </Link>

          <Link to="/about">
            <button className="w-full rounded-2xl border py-4 uppercase shadow-xl transition-all duration-200 ease-in-out hover:scale-95 active:scale-105">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
