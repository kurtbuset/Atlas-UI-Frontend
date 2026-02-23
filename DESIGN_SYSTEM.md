# Design System Guidelines

## Typography

- **Font Family**: Inter (primary), Outfit (secondary)
- **Body Text**: 14px (`text-theme-sm`)
- **Muted Labels**: 12px (`text-theme-xs`)
- **Font Weight**: Regular (400) for body, Semibold (600) for headings

## Cards

- **Border Radius**: 16px (`rounded-card`)
- **Padding**: 24px (`p-6`)
- **Borders**: Subtle with 60% opacity (`border-gray-200/60`)
- **Shadow**: Soft shadow (`shadow-sm`)
- **Background**: White with subtle dark mode overlay

### Card Structure
```tsx
<div className="rounded-card border border-gray-200/60 bg-white p-6 shadow-sm dark:border-gray-800/60 dark:bg-white/[0.03]">
  {/* Card content */}
</div>
```

## Dividers

- **Subtle Borders**: Use 40% opacity for internal dividers
- **Example**: `border-gray-200/40 dark:border-gray-800/40`

## Badges

- **Style**: Soft, rounded rectangles (not pills)
- **Border Radius**: 6px (`rounded-md`)
- **Padding**: 8px horizontal, 4px vertical
- **Font Size**: 12px (`text-theme-xs`)
- **Colors**: Muted backgrounds with 80% opacity for light variant

### Badge Variants
- Light: Soft background with colored text
- Solid: Full color background with white text

## Sticky Context Header

- **Position**: Sticky at top with backdrop blur
- **Background**: Semi-transparent with blur effect
- **Border**: Subtle bottom border (40% opacity)
- **Padding**: 24px horizontal, 16px vertical

### Usage
```tsx
<StickyContextHeader 
  title="Page Title"
  subtitle="Optional description"
  actions={<Button>Action</Button>}
/>
```

## Design Principles

1. **Scan Speed**: Clear hierarchy, consistent spacing
2. **Calm Clarity**: Subtle colors, reduced visual noise
3. **Minimal Density**: Generous whitespace, breathing room
4. **Accessibility**: Sufficient contrast, readable text sizes

## Color Usage

- **Text Primary**: `text-gray-800 dark:text-white/90`
- **Text Secondary**: `text-gray-500 dark:text-gray-400`
- **Borders**: `border-gray-200/60 dark:border-gray-800/60`
- **Dividers**: `border-gray-200/40 dark:border-gray-800/40`

## Spacing Scale

- **Card Padding**: 24px (`p-6`)
- **Section Spacing**: 24px (`space-y-6`)
- **Element Gap**: 12px (`gap-3`)
- **Tight Gap**: 8px (`gap-2`)
