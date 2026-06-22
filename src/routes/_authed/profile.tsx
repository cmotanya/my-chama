import { revalidateLogic, useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { updateProfileSchema } from "../../../lib/validations/schema";
import TextField from "#/components/text-field";
import { cn } from "../../../lib/utils/cn";
import { useEffect, useState } from "react";
import { Avatar } from "#/components/dashboard/avatar";
import { updateProfileFn } from "#/server/update-profile";
import { handleDeleteAccount } from "#/components/dashboard/handle-delete-account";

export const Route = createFileRoute("/_authed/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const router = useRouter();
  const users = Route.useRouteContext();
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWarningExpanded, setIsWarningExpanded] = useState(false);

  const user = users.user;
  const defaultUser = { name: user.name, phone: user.phone };

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      const result = await updateProfileFn({ data: value });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      await router.invalidate({ sync: true });
      router.navigate({ to: "/dashboard" });
    },

    validationLogic: revalidateLogic(),
    validators: { onDynamic: updateProfileSchema },

    onSubmitInvalid() {
      const invalidInput = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLInputElement;

      invalidInput.focus();
    },
  });

  useEffect(() => {
    if (confirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [confirm]);

  return (
    <section className="my-10 space-y-10">
      <div className="space-y-2 px-5">
        <div className="flex items-center justify-center gap-4">
          <Avatar
            name="avataaars"
            seed="rtqggwjj"
            size={40}
            className="fu2 -mt-3"
          />
          <h1 className="text-primary font-unbounded fu3 text-center text-3xl font-bold">
            Your Profile
          </h1>
        </div>
        <p className="fu4">Manage your personal information.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
        noValidate
        className="fu5 space-y-6 px-8"
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
              label="phone number"
              field={field}
              type="tel"
              inputMode="numeric"
              placeholder="Enter Your Phone Number"
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
                !canSubmit &&
                  isSubmitting &&
                  "bg-muted-foreground/60 pointer-events-none transition-all duration-200 ease-in-out",
              )}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          )}
        />
      </form>

      <div className="bg-muted space-y-5 border px-5 py-14">
        <div className="space-y-2">
          <h2 className="font-unbounded fu4 text-error text-center text-3xl font-bold">
            Account Deletion
          </h2>
          <p className="fu5">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setConfirm(true)}
          className="bg-error fu6 text-background w-full cursor-pointer rounded-3xl py-3.5 font-medium uppercase transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:opacity-85 active:scale-95"
        >
          Delete Account
        </button>
      </div>

      {confirm && (
        <div
          onClick={() => setConfirm(false)}
          className="fixed inset-0 z-50 flex items-center justify-center rounded-3xl border p-5 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-muted w-full space-y-7 rounded-3xl border p-6 shadow-md"
          >
            <div className="space-y-2">
              <h3 className="text-error fu1 font-unbounded text-center text-2xl font-bold">
                Delete Account?
              </h3>
              <p className="fu2">
                This action will permanently delete your account and all your
                data.
              </p>
            </div>

            <div className="bg-background fu2 overflow-hidden rounded-xl border p-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWarningExpanded(!isWarningExpanded);
                }}
                className="flex w-full justify-between tracking-wider"
              >
                <span className="text-error text-[10px] font-bold uppercase">
                  Account Warning
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "text-error size-4 animate-bounce transition-transform duration-300 ease-in-out",
                    isWarningExpanded &&
                      "text-muted-foreground rotate-180 animate-none",
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-in-out",
                  isWarningExpanded
                    ? "grid-rows-[1fr] pt-3 opacity-100"
                    : "pointer-events-none grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 space-y-1 leading-3">
                  <div className="fu3 flex gap-1">
                    <span className="text-success font-bold">✓</span>
                    <p className="text-muted-foreground text-[10px]">
                      Chama members can safely delete profile accounts.
                    </p>
                  </div>

                  <div className="fu4 flex gap-2">
                    <span className="text-error ms-1 font-bold">!</span>
                    <p className="text-muted-foreground text-[10px]">
                      Chama Owners cannot delete profile while managing an
                      active group. Please{" "}
                      <strong className="decoration-error underline decoration-2">
                        {" "}
                        contact admin to delete your profile
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fu5 flex justify-between">
              <button
                onClick={() =>
                  handleDeleteAccount({ setIsDeleting, setConfirm, router })
                }
                disabled={isDeleting}
                className="bg-error text-background rounded-2xl px-2.5 py-2 font-medium"
              >
                Yes, delete my account
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="rounded-2xl border p-2 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
