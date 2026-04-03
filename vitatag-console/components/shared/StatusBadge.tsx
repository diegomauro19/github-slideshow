interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "teal";
}

const variantStyles: Record<string, string> = {
  success: "bg-green/10 text-green",
  warning: "bg-amber/10 text-amber",
  danger: "bg-red/10 text-red",
  info: "bg-accent-blue/10 text-accent-blue",
  teal: "bg-teal/10 text-teal",
};

export default function StatusBadge({
  status,
  variant = "info",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variantStyles[variant] || variantStyles.info
      }`}
    >
      {status}
    </span>
  );
}
