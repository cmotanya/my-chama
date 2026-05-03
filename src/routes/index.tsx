import { createFileRoute, Link } from "@tanstack/react-router";
import {
  advantages,
  plannedReleases,
  releasedProducts,
  stats,
  steps,
  testimonials,
} from "../../data/landing";
import { cn } from "../../lib/cn";
import { CheckmarkBadge01Icon, QuoteUpIcon, Tick01Icon } from "hugeicons-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="h-screen flex-1 py-15">
      <section className="h-full space-y-8">
        <div className="flex justify-center">
          <div className="fu1 bg-muted inline-flex items-center gap-1.5 rounded-full border px-1.5 py-1">
            <span className="relative flex size-2">
              <span className="bg-success/50 absolute inline-flex size-full animate-ping rounded-full" />
              <span className="bg-success relative inline-flex size-2 rounded-full" />
            </span>
            <span className="text-muted-foreground text-xs">
              Now in Private Beta
            </span>
          </div>
        </div>

        <h1 className="fu2 px-4 text-center text-6xl font-extrabold tracking-tighter">
          <span className="font-bad_script text-muted-foreground">
            Where Your{" "}
          </span>
          <span className="text-primary font-unbounded">
            Chama Thrives
          </span>{" "}
        </h1>

        <div className="fu3 text-primary px-4 text-center">
          <p>
            Automate contributions, loan approvals, track real-time M-Pesa
            payments, and manage all your complexities in one platform.
          </p>
        </div>

        <div className="fu4 flex w-full flex-col gap-4 px-8 font-semibold tracking-widest">
          <Link to="/">
            <button className="btn-primary shadow-xl">Launch Test Demo</button>
          </Link>

          <Link to="/about">
            <button className="btn-outline shadow-xl">Explore Features</button>
          </Link>
        </div>

        <div className="fu5 my-15 grid grid-cols-2 gap-3 px-4">
          {stats.map(({ value, label, color, bg, border, icon: Icon }) => (
            <div
              key={value}
              className="bg-muted flex w-full flex-col items-center gap-3.5 rounded-3xl border p-4"
            >
              <p className={cn("text-primary text-3xl font-semibold", color)}>
                {value}
              </p>
              <div className="flex w-full items-center justify-center gap-4">
                <Icon
                  strokeWidth={2}
                  size={30}
                  className={cn("rounded-lg border p-1", bg, border)}
                />
                <p className="text-xs font-medium tracking-widest uppercase">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Who is it for? */}
        <div className="my-15 space-y-3 px-4">
          <div className="fu6 space-y-3">
            <h2 className="text-primary text-center text-4xl font-bold">
              Who Is It For?
            </h2>

            <p>
              Our automated system is a game-changer in the financial management
              of informal chama groups in rural and urban areas in Kenya.
            </p>
            <p className="text-muted-foreground font-bad_script relative ps-6 text-lg font-bold">
              {" "}
              What took hours of manual reconciliation now happens in minutes.
              Our platform makes those conversations unnecessary.
            </p>
          </div>

          <div className="fu7 mt-10 space-y-5">
            <h3 className="text-xl font-semibold">
              Our completed products include:
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {releasedProducts.map(({ title, body, icon: Icon }) => (
                <div key={title} className="space-y-3 rounded-3xl border p-5">
                  <div className="flex items-center gap-3">
                    <Icon strokeWidth={2} color="#417505" />
                    <h4 className="text-primary font-bold">{title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fu8 mt-10 space-y-5">
            <h3 className="text-xl font-semibold">
              Features planned for future releases include:
            </h3>

            <div className="grid grid-cols-1 gap-4 select-none">
              {plannedReleases.map(({ title, body, icon: Icon }) => (
                <div key={title} className="relative rounded-3xl border p-5">
                  <div className="space-y-3 opacity-30">
                    <div className="flex items-center gap-3">
                      <Icon strokeWidth={2} />
                      <h4 className="text-primary font-bold">{title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">{body}</p>
                  </div>

                  <span className="bg-success text-background absolute -top-2.5 right-0 z-50 rounded-lg p-1 text-[10px] font-semibold tracking-wider backdrop-blur-sm">
                    Coming soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How is it used? */}
        <div className="fu9 my-15 space-y-5 px-4">
          <div className="space-y-3">
            <h2 className="text-primary text-center text-4xl font-bold">
              How is it used?
            </h2>
            <p>
              Get your group up and running in four simple steps, from{" "}
              <span className="text-foreground font-bold"> registration</span>{" "}
              to your first{" "}
              <span className="text-foreground font-bold">transaction</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {steps.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="bg-muted space-y-3 rounded-3xl border p-5"
              >
                <div className="flex gap-3">
                  <Icon strokeWidth={2} color="#8b572a" />
                  <p className="font-semibold">{title}</p>
                </div>
                <p className="text-primary text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="fu10 my-15 space-y-5">
          <div className="space-y-3">
            <h2 className="text-primary text-center text-4xl font-bold">
              What Sets Us Apart
            </h2>
            <p className="px-4">
              Most tools force you to adapt to their structure.{" "}
              <strong>My-Chama</strong> not only fits, it <strong>grows</strong>{" "}
              with your vision and ensures your collective{" "}
              <strong>success</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-4 px-4">
            {advantages.map(({ body }) => (
              <div key={body} className="flex items-start gap-2">
                <CheckmarkBadge01Icon
                  strokeWidth={2}
                  className="-mt-0.5 shrink-0"
                  color="#417505"
                />

                <p className="text-muted-foreground font-bad_script text-lg font-bold">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Customers Say */}
        <div className="fu11 my-15 space-y-5 px-4">
          <h2 className="text-primary text-center text-4xl font-bold">
            What people say
          </h2>
          <p>
            Feedback from what <strong>treasures</strong> and{" "}
            <strong>chairpersons</strong> running their groups on My-Chama
            share.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-muted space-y-4 rounded-3xl border p-5"
              >
                <div className="flex items-start gap-8">
                  <span className="bg-success text-background font-unbounded flex size-10 shrink-0 items-center justify-center rounded-full font-bold uppercase">
                    {t.name
                      .split("")
                      .slice(0, 2)
                      .map((n) => n.charAt(0))
                      .join("")}
                  </span>
                  <p className="text-muted-foreground font-bad_script font-bold">
                    {t.quote}
                  </p>
                </div>

                <div className="text-sm font-bold">
                  <p>{t.name}</p>
                  <p>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
