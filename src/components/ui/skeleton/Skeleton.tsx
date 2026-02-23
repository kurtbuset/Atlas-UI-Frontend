import * as React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape of the skeleton */
  variant?: "default" | "circle" | "rounded" | "square";
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Animation type for the skeleton */
  animation?: "pulse" | "wave" | "none";
  /** Whether to show a shimmer effect */
  shimmer?: boolean;
  /** Number of skeleton items to display */
  count?: number;
}

function Skeleton({
  className = "",
  variant = "default",
  width,
  height,
  animation = "pulse",
  shimmer = false,
  count = 1,
  ...props
}: SkeletonProps) {
  // Variant classes
  const variantClasses = {
    default: "rounded-md",
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-none",
  };

  // Animation classes
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  // Style object for width and height
  const style: React.CSSProperties = {
    width:
      width !== undefined
        ? typeof width === "number"
          ? `${width}px`
          : width
        : undefined,
    height:
      height !== undefined
        ? typeof height === "number"
          ? `${height}px`
          : height
        : undefined,
    ...props.style,
  };

  // Render multiple skeleton items if count > 1
  if (count > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`} {...props}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-200 dark:bg-gray-800 relative overflow-hidden ${
              variantClasses[variant]
            } ${animationClasses[animation]} ${
              shimmer
                ? "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
                : ""
            }`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-800 relative overflow-hidden ${
        variantClasses[variant]
      } ${animationClasses[animation]} ${
        shimmer
          ? "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
          : ""
      } ${className}`}
      style={style}
      {...props}
    />
  );
}

// Dashboard Card Skeleton
function DashboardCardSkeleton() {
  return (
    <div className="rounded-card border border-gray-200/60 bg-white p-6 shadow-md dark:border-gray-800/60 dark:bg-white/[0.03] dark:shadow-xl/5">
      <div className="space-y-4">
        {/* Title */}
        <Skeleton className="h-5 w-32" shimmer />
        
        {/* Content lines */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" shimmer />
          <Skeleton className="h-4 w-5/6" shimmer />
          <Skeleton className="h-4 w-4/6" shimmer />
        </div>
      </div>
    </div>
  );
}

// Activity Timeline Skeleton
function ActivityTimelineSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex gap-4">
          {/* Icon Circle */}
          <Skeleton variant="circle" width={40} height={40} shimmer />
          
          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" shimmer />
              <Skeleton className="h-4 w-24" shimmer />
            </div>
            <Skeleton className="h-4 w-full" shimmer />
            <Skeleton className="h-4 w-3/4" shimmer />
          </div>
        </div>
      ))}
    </div>
  );
}

// Member Header Skeleton (without card container)
function MemberHeaderSkeleton() {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-4 mb-6">
        <Skeleton variant="circle" width={56} height={56} shimmer />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" shimmer />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" shimmer />
            <Skeleton className="h-4 w-32" shimmer />
            <Skeleton className="h-5 w-16 rounded-full" shimmer />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200/40 dark:border-gray-800/40 pb-3">
        {[1, 2, 3, 4, 5, 6].map((tab) => (
          <Skeleton key={tab} className="h-4 w-20" shimmer />
        ))}
      </div>
    </div>
  );
}

export { Skeleton, DashboardCardSkeleton, ActivityTimelineSkeleton, MemberHeaderSkeleton };
