import { cn } from "../../../lib/utils/cn";

interface SummaryPillProps {
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    size?: number;
  }>;
  label: string;
  value: number;
  accent: string;
  bgColor: string;
  borderColor: string;
  text: string;
}

const SummaryPill = ({
  icon: Icon,
  label,
  value,
  accent,
  text,
  bgColor,
  borderColor,
}: SummaryPillProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-1 items-center gap-3 rounded-3xl border p-3 shadow-md",
        borderColor,
        bgColor,
      )}
    >
      <Icon className={accent} strokeWidth={2.5} size={30} />

      <div className="text-center">
        <p className={cn("text-3xl font-semibold", text)}>{value}</p>
        <p className="text-muted-foreground/80 mt-1 text-[10px] font-medium tracking-tighter uppercase">
          {label} member{value !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default SummaryPill;
