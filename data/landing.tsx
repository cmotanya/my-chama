import {
  AccountSetting01Icon,
  AddTeamIcon,
  ArrowDown03Icon,
  Coins01Icon,
  CrowdfundingIcon,
  HealthIcon,
  MoneyBag02Icon,
  MoneySavingJarIcon,
  Payment02Icon,
  StartUp01Icon,
  UserGroupIcon,
} from "hugeicons-react";

export const stats = [
  {
    icon: UserGroupIcon,
    value: "0",
    label: "Groups",
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/50",
  },
  {
    icon: ArrowDown03Icon,
    value: "80%",
    label: "Less Work",
    color: "text-error",
    bg: "bg-error/20",
    border: "border-error/50",
  },
  {
    icon: MoneyBag02Icon,
    value: "M-Pesa",
    label: "Integrated",
    color: "text-success",
    bg: "bg-success/20",
    border: "border-success/50",
  },
  {
    icon: StartUp01Icon,
    value: "3 mins",
    label: "Setup",
    color: "text-warning",
    bg: "bg-warning/20",
    border: "border-warning/50",
  },
];

export const releasedProducts = [
  {
    icon: MoneySavingJarIcon,
    title: "Merry Go Round",
    body: "Automated rotation schedules and payout dates, ensuring every member knows their turn and contribution timeline.",
  },
  {
    icon: Payment02Icon,
    title: "Lending and Borrowing",
    body: "Issue loans with custom interest rates, track repayment schedules and trigger automatic reminders.",
  },
];

export const plannedReleases = [
  {
    icon: CrowdfundingIcon,
    title: "Investment Syndicates",
    body: "Pool capital for property acquisition, tracking every contribution of individual share towards property ownership.",
  },
  {
    icon: HealthIcon,
    title: "Welfare and Burial Societies",
    body: "Manage emergency funds and bereavement payouts with clear audit trails, ensuring funds are always ready and available.",
  },
  {
    icon: Coins01Icon,
    title: "Table Banking",
    body: "Our system automate loan eligibility, interest calculations and real time ledger updates.",
  },
];

export const steps = [
  {
    icon: UserGroupIcon,
    title: "Create Your Group",
    body: "Register your group in seconds with just your mobile number.",
  },
  {
    icon: AddTeamIcon,
    title: "Add Your Members",
    body: "Invite members by using WhatsApp or SMS. No manual data entry. Members can join via a one-click invite.",
  },
  {
    icon: AccountSetting01Icon,
    title: "Manage Your Configurations",
    body: "Define your contribution cycle, issue and track loans, view reports and manage all your entire ecosystem in one place.",
  },
];

export const advantages = [
  {
    body: "Eliminate screenshot culture. Enter our G2 integration tool that reconcile payments the moment a transaction is confirmed.",
  },
  {
    body: "Members get realtime updates of their equity, loans and reports, all accessible 24/7.",
  },
  {
    body: "A lightweight, easy to use interface that runs smoothly on any device even in areas occasional with limited connectivity.",
  },
  {
    body: "From rotation schedules to loan interest math, we eliminated that step by automation reducing paperwork or inaccurate errors.",
  },
];

export const testimonials = [
  {
    name: "Abdi H.",
    role: "Chairperson, Nyumba Yetu Chama",
    location: "Changamwe",
    quote:
      "I was skeptical at first but the setup took less than 5 minutes. Our group of 22 members was fully onboard the same evening.",
  },
  {
    name: "Grace M.",
    role: "Treasurer, Faida Women's Fund",
    location: "Nyali",
    quote:
      "Loan repayments used to be a nightmare to track across 30 members. The automatic reminders and repayment schedule have made my job easier.",
  },
  {
    name: "Rose O.",
    role: "Chairperson, Mama Pesa Circle",
    location: "Kisii",
    quote:
      "We tried two other app before MY-Chama. They were too complicated, this platform provided us with features that were easy to use and works for us. ",
  },
];

export const pricingPlan = [
  {
    name: "Starter",
    price: "KES 999",
    period: "per month",
    description: "Perfect for small groups getting started.",
    members: "Up to 20 members",
    features: [
      "Automated rotation ledger",
      "Member directory",
      "Real-time contribution tracking",
      "Basic PDF reports",
      "M-Pesa manual entry",
      "Email and WhatsApp support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    price: "KES 1,499",
    period: "per month",
    description: "Active groups that need full automation.",
    members: "Up to 50 members",
    features: [
      "Everything in Start",
      "Automatic M-Pesa reconciliation",
      "Loan interest and math",
      "Repayment reminders via SMS.",
      "Priority Technical Support",
    ],
    cta: "Get Started",
    featured: true,
  },
];

export const faqs = [
  {
    question: "Do I need technical knowledge to set up my My-Chama?",
    answer:
      "Not at all. If you need to use WhatsApp, you can use My-Chama. Setup takes under 5 minutes and we walk you through every step.",
  },
  {
    question: "Is my group's money safe on the platform?",
    answer:
      "My-Chama does not hold your money. All transactions happen through M-Pesa directly. We only record and track — your funds stay in your M-Pesa accounts at all times.",
  },
  {
    question: "What happens if a member misses a contribution?",
    answer:
      "The system flags the missed contribution automatically and sends a reminder to the member. The treasurer can also apply penalties as per your group's rules.",
  },
  {
    question: "Can we export our financial records?",
    answer:
      "Yes. Generate a full PDF report of contributions, loans, repayments, and balances at any time. Your records are always yours to keep.",
  },
  {
    question: "What if our group grows beyond the plan limit?",
    answer:
      "You will be notified when you approach your member limit. Upgrading to the next plan takes one tap and your data carries over seamlessly.",
  },
  {
    question: "How do we get support if something goes wrong?",
    answer:
      "You can reach us via phone or email directly. Real people, not bots. We are based in Kenya and understand exactly how your group operates.",
  },

  {
    question: "Can other groups see our data?",
    answer:
      "Never. Each group has its own isolated workspace. No persons from other groups can see your contributions, loans, or member list. Your group's data is securely private.",
  },
  {
    question: "How does M-Pesa integration work?",
    answer:
      "Members contribute via M-Pesa STK push, SIM Toolkit, or USSD code to the group's paybill or till number. The payment reflects in the group ledger automatically — no manual entry needed.",
  },
];
