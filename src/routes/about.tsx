import { createFileRoute } from "@tanstack/react-router";
import {
  AnalyticsDownIcon,
  AnalyticsUpIcon,
  Home01Icon,
  Wifi01Icon,
} from "hugeicons-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <h1>About</h1>

        <Home01Icon />
        <Wifi01Icon />
        <AnalyticsDownIcon />
        <AnalyticsUpIcon />
      </section>
    </main>
  );
}
