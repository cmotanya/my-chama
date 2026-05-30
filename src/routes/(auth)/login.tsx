import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { loginSchema } from "../../../lib/validations/schema";
import TextField from "#/components/text-field";
import { ArrowRight02Icon } from "hugeicons-react";
import { useState } from "react";
import { LoginFn } from "#/server/login";
import toast from "react-hot-toast";
import { cn } from "../../../lib/cn";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const defaultUser = { phone: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      const result = await LoginFn({ data: value });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      await router.invalidate({ sync: true });
      router.navigate({ to: "/dashboard" });
    },

    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: loginSchema,
    },
    onSubmitInvalid() {
      const invalidInput = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLInputElement;

      invalidInput.focus();
    },
  });
  return (
    <div className="my-16 space-y-10">
      <h1 className="fu1 font-unbounded px-3 text-center text-3xl font-bold">
        Sign in to Your Chama Dashboard{" "}
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
          name="phone"
          children={(field) => (
            <TextField
              label="phone number"
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

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex w-full justify-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "bg-foreground fu3 text-background w-fit cursor-pointer rounded-3xl px-5 py-2.5 font-medium",
                  !canSubmit &&
                    isSubmitting &&
                    "bg-muted-foreground/60 pointer-events-none transition-all duration-200 ease-in-out",
                )}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </div>
          )}
        />
      </form>

      <div className="border-t py-5">
        <div className="fu4 flex items-baseline justify-center gap-2">
          <p className="text-muted-foreground self-baseline text-[10px] font-semibold">
            Don't have one yet?
          </p>
          <Link
            to="/signup"
            preload="intent"
            className="font-unbounded text-primary flex items-center gap-1 text-sm font-bold uppercase"
          >
            Create A Workspace <ArrowRight02Icon size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
