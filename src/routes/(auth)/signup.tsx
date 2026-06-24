import { revalidateLogic, useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { registerSchema } from "../../../lib/validations/schema";
import TextField from "#/components/text-field";
import { cn } from "../../../lib/utils/cn";
import { ArrowRight02Icon } from "hugeicons-react";
import { useState } from "react";
import { registerFn } from "#/server/register";
import toast from "react-hot-toast";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupPage,
});

function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const defaultUser = {
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      console.log(value);

      const result = await registerFn({ data: value });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      await router.invalidate({ sync: true });
      router.navigate({ to: "/onboarding" });
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: registerSchema,
    },
    onSubmitInvalid() {
      const invalidInput = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLInputElement;

      invalidInput.focus();
    },
  });

  return (
    <section className="flex-1 space-y-10 py-8">
      <h1 className="fu1 font-unbounded px-3 text-center text-3xl font-bold">
        Start Managing Your Chama in Minutes
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
        noValidate
        className="fu2 space-y-6 px-8"
      >
        <Field
          name="name"
          children={(field) => (
            <TextField
              label="Name"
              field={field}
              type="text"
              placeholder="Enter Your Name"
            />
          )}
        />

        <Field
          name="phone"
          children={(field) => (
            <TextField
              label="Phone Number"
              field={field}
              type="tel"
              inputMode="numeric"
              placeholder="Enter Your Phone Number"
            />
          )}
        />

        <Field
          name="password"
          children={(field) => (
            <TextField
              label="password"
              field={field}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
        />

        <Field
          name="confirmPassword"
          children={(field) => (
            <TextField
              label="confirm password"
              field={field}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
          )}
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
              {isSubmitting ? "Creating Workspace..." : "Create Workspace"}
            </button>
          )}
        />
      </form>

      <div className="border-t py-5">
        <div className="fu4 flex items-baseline justify-center gap-3">
          <p className="text-muted-foreground text-[10px] font-semibold">
            Already have one yet?
          </p>
          <Link
            to="/login"
            preload="intent"
            className="font-unbounded text-primary flex cursor-pointer items-center gap-1 text-sm font-bold uppercase underline underline-offset-4"
          >
            Sign In here <ArrowRight02Icon size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
