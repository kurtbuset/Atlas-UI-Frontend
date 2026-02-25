interface StickyContextHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const StickyContextHeader: React.FC<StickyContextHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
}) => {
  return (
    <div
      className={`sticky top-0 z-10 border-b border-gray-200/40 bg-white/95 backdrop-blur-sm px-6 py-4 dark:border-gray-800/40 dark:bg-gray-dark/95 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default StickyContextHeader;
