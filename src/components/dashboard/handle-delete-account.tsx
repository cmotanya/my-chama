import { deleteAccountFn } from "#/server/delete-account";
import type { AnyRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface HandleDeleteProps {
  setIsDeleting: (value: boolean) => void;
  setConfirm: (value: boolean) => void;
  router: AnyRouter;
}

export const handleDeleteAccount = async ({
  setIsDeleting,
  setConfirm,
  router,
}: HandleDeleteProps) => {
  setIsDeleting(true);

  const result = await deleteAccountFn();

  if (result?.error) {
    toast.error(result.error);
    setIsDeleting(false);
    setConfirm(false);
    return;
  }

  toast.success("Account permanently deleted");

  await router.invalidate();
  router.navigate({ to: "/signup" });
};
