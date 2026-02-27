interface GradientCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  gradient?: "blue" | "green" | "purple" | "orange" | "gray" | "indigo" | "none";
  actions?: React.ReactNode;
}

const gradientClasses = {
  blue: "bg-gradient-to-br from-white to-blue-50/60 dark:from-white/[0.03] dark:to-blue-light-500/[0.08]",
  green: "bg-gradient-to-br from-white to-green-50/60 dark:from-white/[0.03] dark:to-success-500/[0.08]",
  purple: "bg-gradient-to-br from-white to-purple-50/60 dark:from-white/[0.03] dark:to-theme-purple-500/[0.08]",
  orange: "bg-gradient-to-br from-white to-orange-50/60 dark:from-white/[0.03] dark:to-orange-500/[0.08]",
  gray: "bg-gradient-to-br from-white to-gray-50/70 dark:from-white/[0.03] dark:to-white/[0.04]",
  indigo: "bg-gradient-to-br from-white to-indigo-50/40 dark:from-white/[0.03] dark:to-brand-500/[0.05]",
  none: "bg-white dark:bg-white/[0.03]",
};

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  gradient = "none",
  actions,
}) => {
  return (
    <div
      className={`rounded-card border border-gray-200/60 shadow-md dark:border-gray-800/60 dark:shadow-xl/5 ${gradientClasses[gradient]} ${className}`}
    >
      {/* Card Header */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-theme-sm font-semibold text-gray-800 dark:text-white/90 truncate">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>
          {actions && <div className="ml-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>

      {/* Card Body */}
      <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
        {children}
      </div>
    </div>
  );
};

export default GradientCard;
