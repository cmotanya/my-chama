import {
  CallIcon,
  Mail01Icon,
  InstagramIcon,
  NewTwitterIcon,
  WhatsappIcon,
  TiktokIcon,
} from "hugeicons-react";

export const products = [
  { name: "Our Features", link: "#features" },
  { name: "How It Works", link: "#how-it-works" },
  { name: "Pricing", link: "#pricing" },
  { name: "FAQs", link: "#faq" },
  { name: "Testimonials", link: "#testimonials" },
];

export const support = [
  { icon: CallIcon, name: "0712 909 475", link: "tel:+254712909475" },
  {
    icon: Mail01Icon,
    name: "motanya.dev@gmail.com",
    link: "mailto:motanya.dev@gmail.com",
  },
  {
    icon: WhatsappIcon,
    name: "WhatsApp Us",
    link: "https://wa.me/254712909475",
  },
];

export const company = [
  { link: "About Us", href: "/about" },
  { link: "Careers", href: "/careers" },
  { link: "Blog", href: "/blog" },
  { link: "Affiliate Program", href: "/affiliate" },
];

export const social = [
  {
    icon: InstagramIcon,
    name: "Instagram",
    link: "https://instagram.com/mychama",
  },
  { icon: NewTwitterIcon, name: "Twitter / X", link: "https://x.com/mychama" },
  { icon: TiktokIcon, name: "TilTok", link: "https://tiktok.com/mychama" },
];

export const legal = [
  { name: "Terms of Service", link: "/terms" },
  { name: "Privacy Policy", link: "/privacy" },
];
