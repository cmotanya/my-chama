import {
  Home01Icon,
  UserAccountIcon,
  Payment02Icon,
  MoneyReceive01Icon,
  UserGroupIcon,
} from "hugeicons-react";

export const navigation_links = [
  { label: "Dashboard", to: "/dashboard", icon: Home01Icon },
  { label: "Members", to: "/members", icon: UserGroupIcon },
  { label: "Contributions", to: "/contributions", icon: Payment02Icon },
  { label: "Loans", to: "/loans", icon: MoneyReceive01Icon },
  { label: "Profile", to: "/profile", icon: UserAccountIcon },
];
