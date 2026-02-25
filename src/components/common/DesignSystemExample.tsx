import Badge from "../ui/badge/Badge";
import StickyContextHeader from "./StickyContextHeader";
import Button from "../ui/button/Button";

/**
 * Design System Example Component
 * Showcases the updated design system with:
 * - 16px border radius (rounded-card)
 * - 24px padding (p-6)
 * - Inter font
 * - 14px body text (text-theme-sm)
 * - 12px muted labels (text-theme-xs)
 * - Soft status badges
 * - Subtle borders/dividers
 * - Sticky context header
 */
export default function DesignSystemExample() {
  return (
    <div className="space-y-6">
      {/* Sticky Context Header Example */}
      <div className="rounded-card border border-gray-200/60 bg-white shadow-sm dark:border-gray-800/60 dark:bg-white/[0.03] overflow-hidden">
        <StickyContextHeader
          title="Design System Overview"
          subtitle="Updated for scan speed and calm clarity"
          actions={
            <Button size="sm" variant="primary">
              Action
            </Button>
          }
        />
        
        <div className="p-6 space-y-6">
          {/* Typography Section */}
          <div>
            <h3 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
              Typography
            </h3>
            <div className="space-y-2">
              <p className="text-theme-sm text-gray-800 dark:text-white/90">
                Body text: 14px Inter Regular
              </p>
              <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                Muted label: 12px Inter Regular
              </p>
            </div>
          </div>

          {/* Divider - Subtle */}
          <div className="border-t border-gray-200/40 dark:border-gray-800/40" />

          {/* Badges Section */}
          <div>
            <h3 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
              Soft Status Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge color="success" variant="light">Active</Badge>
              <Badge color="warning" variant="light">Pending</Badge>
              <Badge color="error" variant="light">Error</Badge>
              <Badge color="primary" variant="light">Info</Badge>
              <Badge color="light" variant="light">Neutral</Badge>
            </div>
          </div>

          {/* Divider - Subtle */}
          <div className="border-t border-gray-200/40 dark:border-gray-800/40" />

          {/* Card Example */}
          <div>
            <h3 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
              Card Specifications
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Border Radius
                </span>
                <span className="text-theme-sm text-gray-800 dark:text-white/90">
                  16px
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Padding
                </span>
                <span className="text-theme-sm text-gray-800 dark:text-white/90">
                  24px
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Border Opacity
                </span>
                <span className="text-theme-sm text-gray-800 dark:text-white/90">
                  60%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Divider Opacity
                </span>
                <span className="text-theme-sm text-gray-800 dark:text-white/90">
                  40%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Card Example */}
      <div className="rounded-card border border-gray-200/60 bg-white p-6 shadow-sm dark:border-gray-800/60 dark:bg-white/[0.03]">
        <div className="mb-4">
          <h3 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
            Card with List Items
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            Demonstrating spacing and hierarchy
          </p>
        </div>

        <div className="border-t border-gray-200/40 dark:border-gray-800/40 pt-4 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 dark:bg-white/[0.02]"
            >
              <div>
                <p className="text-theme-sm text-gray-800 dark:text-white/90">
                  List Item {item}
                </p>
                <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Supporting text with muted color
                </p>
              </div>
              <Badge color="primary" variant="light">
                New
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
