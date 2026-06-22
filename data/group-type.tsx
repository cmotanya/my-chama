import { MoneySavingJarIcon, Payment02Icon } from "hugeicons-react";

export const groupType = [
  {
    value: "merry_go_round",
    label: "Merry-Go-Round",
    description: "Contributions rotate each cycle",
    icon: MoneySavingJarIcon,
    color: "text-success",
    bg: "bg-success/20",
    border: "border-success/50",
  },
  {
    value: "lending",
    label: "Lending",
    description: "Lend to members and external parties",
    icon: Payment02Icon,
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/50",
  },
];
