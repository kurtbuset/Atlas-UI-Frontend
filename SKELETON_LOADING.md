# Skeleton Loading Component

## Overview
Added a professional skeleton loading component to provide visual feedback while data is being fetched, improving perceived performance and user experience.

## Component Location
`src/components/ui/skeleton/Skeleton.tsx`

## Features

### Base Skeleton Component
A flexible, reusable skeleton component with multiple variants and animations.

#### Props
```typescript
interface SkeletonProps {
  variant?: "default" | "circle" | "rounded" | "square";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
  shimmer?: boolean;
  count?: number;
  className?: string;
}
```

#### Variants
- **default**: Rounded corners (8px)
- **circle**: Fully rounded (perfect circle)
- **rounded**: Extra rounded corners (12px)
- **square**: No rounded corners

#### Animations
- **pulse**: Gentle pulsing opacity (default)
- **wave**: Shimmer wave effect
- **none**: No animation

### Specialized Skeletons

#### 1. DashboardCardSkeleton
Pre-built skeleton for dashboard cards with title and content lines.

```tsx
<DashboardCardSkeleton />
```

#### 2. ActivityTimelineSkeleton
Skeleton for activity timeline items with icon circles and content.

```tsx
<ActivityTimelineSkeleton />
```

#### 3. MemberHeaderSkeleton
Skeleton for member header with avatar, name, and tabs.

```tsx
<MemberHeaderSkeleton />
```

## Usage in Dashboard

### Loading State Implementation

```tsx
import { useState, useEffect } from "react";
import {
  Skeleton,
  DashboardCardSkeleton,
  ActivityTimelineSkeleton,
  MemberHeaderSkeleton,
} from "../../components/ui/skeleton/Skeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // Loading State
        <>
          <MemberHeaderSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <DashboardCardSkeleton />
              <div className="grid grid-cols-2 gap-4">
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
              </div>
            </div>
            <div className="lg:col-span-2">
              <ActivityTimelineSkeleton />
            </div>
          </div>
        </>
      ) : (
        // Actual Content
        <ActualDashboardContent />
      )}
    </>
  );
}
```

## Basic Examples

### Simple Skeleton
```tsx
<Skeleton className="h-4 w-32" />
```

### Circle Avatar Skeleton
```tsx
<Skeleton variant="circle" width={40} height={40} shimmer />
```

### Multiple Lines
```tsx
<Skeleton count={3} className="h-4" shimmer />
```

### Custom Dimensions
```tsx
<Skeleton width="100%" height={200} shimmer />
```

## Shimmer Animation

The shimmer effect is implemented using CSS animations defined in `tailwind.config.js`:

```javascript
keyframes: {
  shimmer: {
    "100%": {
      transform: "translateX(100%)",
    },
  },
},
animation: {
  shimmer: "shimmer 2s infinite",
}
```

The shimmer creates a light wave that moves across the skeleton, providing a more engaging loading experience.

## Design System Compliance

### Colors
- Light mode: `bg-gray-200`
- Dark mode: `bg-gray-800`
- Shimmer overlay: `via-white/20`

### Border Radius
- Matches card design system: 16px (`rounded-card`)
- Consistent with component styling

### Spacing
- Uses design system spacing scale
- 24px padding for cards (`p-6`)
- Consistent gaps between elements

## Best Practices

### 1. Match Content Structure
Skeleton should mirror the actual content layout:
```tsx
// Good: Matches actual card structure
<DashboardCardSkeleton />

// Bad: Generic skeleton that doesn't match
<Skeleton className="h-40 w-full" />
```

### 2. Use Shimmer for Better UX
```tsx
// Good: Engaging shimmer effect
<Skeleton shimmer />

// Acceptable: Simple pulse
<Skeleton />
```

### 3. Appropriate Loading Time
```tsx
// Good: 1-3 seconds for perceived performance
setTimeout(() => setIsLoading(false), 2000);

// Bad: Too long, frustrating user
setTimeout(() => setIsLoading(false), 10000);
```

### 4. Consistent Dimensions
```tsx
// Good: Matches actual content size
<Skeleton className="h-5 w-32" /> // For title
<Skeleton className="h-4 w-full" /> // For description

// Bad: Random sizes
<Skeleton className="h-10 w-20" />
```

## Accessibility

### Screen Reader Support
Skeletons are decorative and should be hidden from screen readers:

```tsx
<div aria-busy="true" aria-live="polite">
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

### Loading Announcements
```tsx
{isLoading && (
  <span className="sr-only">Loading dashboard content...</span>
)}
```

## Performance Considerations

### CSS Animations
- Uses GPU-accelerated transforms
- Minimal performance impact
- Smooth 60fps animations

### Conditional Rendering
```tsx
// Efficient: Only renders what's needed
{isLoading ? <Skeleton /> : <Content />}

// Inefficient: Renders both
<Skeleton className={isLoading ? '' : 'hidden'} />
<Content className={isLoading ? 'hidden' : ''} />
```

## Customization

### Creating Custom Skeletons

```tsx
function CustomCardSkeleton() {
  return (
    <div className="rounded-card border border-gray-200/60 bg-white p-6">
      <Skeleton className="h-6 w-40 mb-4" shimmer />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" shimmer />
        <Skeleton className="h-4 w-5/6" shimmer />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton variant="circle" width={32} height={32} shimmer />
        <Skeleton variant="circle" width={32} height={32} shimmer />
      </div>
    </div>
  );
}
```

### Theming
Skeletons automatically adapt to dark mode using Tailwind's dark mode classes.

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Future Enhancements

- [ ] Add more specialized skeleton variants
- [ ] Implement skeleton for tables
- [ ] Add skeleton for charts
- [ ] Create skeleton for forms
- [ ] Add progressive loading (fade-in effect)
- [ ] Implement skeleton for modals
- [ ] Add configurable animation speeds

## Testing Checklist

- [x] Skeleton renders correctly
- [x] Shimmer animation works
- [x] Dark mode styling correct
- [x] Responsive on mobile
- [x] Matches actual content layout
- [x] No console errors
- [x] Smooth animations (60fps)
- [x] Accessible (aria attributes)

## Related Components

- `GradientCard` - Uses skeleton for loading state
- `Avatar` - Circle skeleton variant
- `Badge` - Rounded skeleton variant
- `Button` - Skeleton for action buttons

## Resources

- [Skeleton UI Patterns](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)
- [Loading Best Practices](https://www.nngroup.com/articles/progress-indicators/)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
