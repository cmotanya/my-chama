import { revalidateLogic, useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { onboardingSchema } from "../../../lib/validations/schema";
import TextField from "#/components/text-field";
import { cn } from "../../../lib/utils/cn";
import { groupType } from "../../../data/group-type";
import { Tick04Icon } from "hugeicons-react";
import { chamaFn } from "#/server/chama";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authed/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  const router = useRouter();
  const defaultUser = {
    name: "",
    memberCount: 0,
    contributionAmount: 0,
    contributionFrequency: "weekly" as "weekly" | "monthly",
    groupType: "merry_go_round" as "merry_go_round" | "lending",
  };

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      const result = await chamaFn({ data: value });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      await router.invalidate({ sync: true });
      router.navigate({ to: "/dashboard" });
    },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: onboardingSchema },

    onSubmitInvalid() {
      const invalidInput = document.querySelector<HTMLInputElement>(
        '[aria-invalid="true"]',
      );

      if (invalidInput) {
        invalidInput.focus();
      }
    },
  });

  return (
    <section className="mb-16">
      <h1 className="fu1 font-unbounded px-10 pt-10 pb-8 text-center text-3xl font-bold">
        Setup Your Workspace
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
        noValidate
        className="fu2 space-y-6 px-5"
      >
        <Field
          name="name"
          children={(field) => (
            <TextField
              label="Chama Name"
              field={field}
              type="text"
              placeholder="e.g. Umoja Mwanzo"
            />
          )}
        />

        <div className="flex shrink-0 gap-3">
          <Field
            name="memberCount"
            children={(field) => (
              <TextField
                label="Target Member Count"
                field={field}
                type="number"
                inputMode="numeric"
                numeric
                placeholder="e.g. 20"
              />
            )}
          />

          <Field
            name="contributionAmount"
            children={(field) => (
              <TextField
                label="Contribution Amount (KES)"
                field={field}
                type="number"
                inputMode="numeric"
                numeric
                placeholder="Enter Amount"
              />
            )}
          />
        </div>

        <Field
          name="contributionFrequency"
          children={(field) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-primary text-sm font-bold uppercase">
                Contribution Cycle
              </label>
              <select
                name={field.name}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value as "weekly" | "monthly")
                }
                className="f w-full cursor-pointer rounded-2xl border p-3 font-medium transition-colors outline-none"
              >
                <option value="weekly">Weekly Contributions</option>
                <option value="monthly">Monthly Contributions</option>
              </select>
            </div>
          )}
        />

        <Field
          name="groupType"
          children={(field) => (
            <>
              <label
                htmlFor={field.name}
                className="text-primary text-sm font-bold uppercase"
              >
                Type of Group
              </label>
              <div className="grid grid-cols-2 gap-2">
                {groupType.map(
                  ({
                    value,
                    label,
                    description,
                    icon: Icon,
                    color,
                    bg,
                    border,
                  }) => (
                    <button
                      type="button"
                      key={label}
                      onClick={() =>
                        field.handleChange(
                          value as "merry_go_round" | "lending",
                        )
                      }
                      className={cn(
                        "bg-muted relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 transition-all duration-200 ease-in-out",
                        field.state.value === value
                          ? `${border} scale-[102%] shadow-md`
                          : "border-border",
                      )}
                    >
                      <span
                        className={cn("rounded-lg border-2 p-1", bg, border)}
                      >
                        <Icon strokeWidth={2} size={30} className={cn(color)} />
                      </span>
                      <span
                        className={cn(
                          "text-primary font-unbounded text-[10px] font-bold uppercase",
                          color,
                        )}
                      >
                        {field.state.value === value && (
                          <span className="absolute top-2 right-2">
                            <Tick04Icon strokeWidth={2} fill={color} />
                          </span>
                        )}
                        {label}
                      </span>
                      <span className="text-muted-foreground text-[10px] leading-3 font-semibold">
                        {description}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </>
          )}
        />

        <Subscribe
          selector={(state) => [
            state.values.memberCount,
            state.values.contributionAmount,
          ]}
          children={([memberCount, contributionAmount]) => {
            const projectedPool = memberCount * contributionAmount;

            return (
              <div
                className={cn(
                  "bg-muted space-y-3 rounded-3xl border p-4",
                  memberCount && contributionAmount
                    ? "border-success"
                    : "border-error",
                )}
              >
                <p className="text-muted-foreground font-bold uppercase">
                  Projected pool per cycle
                </p>

                <div className="space-y-2">
                  <p
                    className={cn(
                      "font-unbounded font-semibold",
                      memberCount && contributionAmount
                        ? "text-success"
                        : "text-muted-foreground/50",
                    )}
                  >
                    KES{" "}
                    <span className="tracking-widest">
                      {projectedPool.toLocaleString()}
                    </span>
                  </p>

                  <p
                    className={cn(
                      "text-[10px] font-medium tracking-wider transition-all duration-200 ease-in-out",
                      memberCount && contributionAmount
                        ? "text-success"
                        : "text-error",
                    )}
                  >
                    {memberCount && contributionAmount
                      ? `${memberCount} members × KES ${contributionAmount.toLocaleString()}`
                      : "Enter member count and amount to calculate"}
                  </p>
                </div>
              </div>
            );
          }}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className={cn(
                "bg-foreground fu3 text-background w-full cursor-pointer rounded-3xl py-3.5 font-medium uppercase",
                (!canSubmit || isSubmitting) &&
                  "bg-muted-foreground/60 pointer-events-none transition-all duration-200 ease-in-out",
              )}
            >
              {isSubmitting ? "Proceeding..." : "Proceed to Dashboard"}
            </button>
          )}
        />
      </form>
    </section>
  );
}
