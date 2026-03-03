import { ReactNode } from "react";

interface ProtectedContentProps {
  isVerified: boolean;
  children: ReactNode;
  blurLevel?: "light" | "medium" | "heavy";
}

export default function ProtectedContent({
  isVerified,
  children,
  blurLevel = "medium",
}: ProtectedContentProps) {
  const blurClasses = {
    light: "blur-[2px]",
    medium: "blur-[4px]",
    heavy: "blur-[8px]",
  };

  if (isVerified) {
    return <>{children}</>;
  } 

  return (
    <div className="relative">
      <div
        className={`${blurClasses[blurLevel]} select-none pointer-events-none`}
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/5 dark:bg-gray-900/20">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg backdrop-blur-sm">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-gray-800 dark:text-white/90">
            Verify Identity to View PHI
          </span>
        </div>
      </div>
    </div>
  );
}
