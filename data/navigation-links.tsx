import {
  Home01Icon,
  Money02Icon,
  CreditCardIcon,
  UserAccountIcon,
  UserGroupIcon,
} from "hugeicons-react";

export const navigation_links = [
  { label: "Dashboard", to: "/dashboard", icon: Home01Icon },
  { label: "Members", to: "/members", icon: UserGroupIcon },
  { label: "Contributions", to: "/contributions", icon: Money02Icon },
  { label: "Loans", to: "/loans", icon: CreditCardIcon },
  { label: "Profile", to: "/profile", icon: UserAccountIcon },
];
