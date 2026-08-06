# HAVEN Design System

Deep dive into the complete design system, styling architecture, and visual language for HAVEN.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Design](#component-design)
6. [Visual Effects](#visual-effects)
7. [Animations](#animations)
8. [Dark Mode](#dark-mode)
9. [Accessibility](#accessibility)

---

## Design Philosophy

### Core Principles

**1. Minimalism with Depth**
- Clean, uncluttered interfaces
- Strategic use of shadows and layers for visual hierarchy
- Breathing room between elements

**2. Premium Aesthetics**
- High contrast for readability
- Sophisticated color palette
- Refined typography
- Deliberate visual details

**3. Functional Beauty**
- Design serves purpose
- Every element has intention
- User experience prioritized
- Aesthetic enhancement, not distraction

**4. Consistency**
- Unified design language
- Predictable patterns
- Coherent visual identity
- Platform consistency

---

## Color System

### Light Mode (Default)

#### Primary Colors

```css
--background:  40 20% 97%;      /* Warm off-white #F6F2ED */
--foreground:  0 0% 10%;        /* Near black #1A1A1A */
```

**Usage:**
- Background: Page backgrounds, card backgrounds
- Foreground: Body text, primary text

#### Accent Colors

```css
--primary:     0 0% 10%;        /* Black #1A1A1A */
--primary-foreground: 40 20% 97%; /* Off-white #F6F2ED */
```

**Usage:**
- Primary: Buttons, links, focus states
- Primary Foreground: Text on primary backgrounds

#### Secondary Colors

```css
--secondary:   40 15% 92%;      /* Light beige #EBEBDF */
--secondary-foreground: 0 0% 14%; /* Dark gray #242424 */
```

**Usage:**
- Secondary: Subtle backgrounds, inactive states
- Secondary Foreground: Secondary text

#### Status Colors

```css
--destructive: 0 84.2% 60.2%;   /* Red #F75555 */
--destructive-foreground: 0 0% 98%; /* White #FAFAFA */

--rating:      38 92% 50%;      /* Gold/Orange #FFD580 */
--wishlist:    350 80% 58%;     /* Pink #FF5984 */
```

#### Utility Colors

```css
--muted:               40 12% 90%;    /* Light gray #E8E8E0 */
--muted-foreground:    0 0% 40%;     /* Medium gray #666666 */

--card:                40 20% 98%;    /* Very light beige #FAFAF8 */
--card-foreground:     0 0% 10%;     /* Near black #1A1A1A */

--popover:             40 20% 98%;    /* Same as card */
--popover-foreground:  0 0% 10%;     /* Same as card-foreground */

--border:              0 0% 82%;     /* Light border #D0D0D0 */
--input:               0 0% 82%;     /* Same as border */

--ring:                0 0% 10%;     /* Focus ring #1A1A1A */
```

### Dark Mode

#### Primary Colors

```css
--background:  0 0% 6%;         /* Very dark #0F0F0F */
--foreground:  40 10% 94%;      /* Off-white #F0EBE8 */
```

#### Accent Colors

```css
--primary:     40 10% 94%;      /* Off-white #F0EBE8 */
--primary-foreground: 0 0% 6%;  /* Very dark #0F0F0F */
```

#### Secondary Colors

```css
--secondary:   0 0% 14%;        /* Dark gray #242424 */
--secondary-foreground: 40 10% 94%; /* Off-white #F0EBE8 */
```

#### Status Colors

```css
--destructive: 0 62.8% 30.6%;   /* Dark red #991111 */
--rating:      38 85% 55%;      /* Warm gold #FFD966 */
--wishlist:    350 80% 58%;     /* Pink #FF5984 (same) */
```

### Color Accessibility

**Contrast Ratios:**
- Text on background: **7:1** (WCAG AAA)
- UI components: **4.5:1** (WCAG AA)
- Large text: **3:1** (WCAG AA)

**Testing:**
```
Light mode: #1A1A1A on #F6F2ED = 15.7:1 ✅
Dark mode:  #F0EBE8 on #0F0F0F = 14.2:1 ✅
Links:      #1A1A1A underline = 15.7:1 ✅
```

---

## Typography System

### Font Family

**Primary Font: Jost** (Universal)
- Supports: English, Arabic, multiple languages
- Weights: 300, 400, 500, 600, 700, 800, 900
- Styles: Regular, Italic

```css
--font-sans: "Jost", system-ui, sans-serif;
```

### Type Scale

#### Headings

```
h1: 48px (md: 56px) (lg: 64px) - Extra large titles
h2: 36px (md: 48px)           - Section titles
h3: 32px (md: 36px)           - Subsection titles
h4: 24px (md: 32px)           - Component titles
h5: 20px (md: 24px)           - Small titles
h6: 16px                       - Smallest heading
```

**Properties:**
- Font-weight: 700 (bold)
- Letter-spacing: tight (tracking-tight)
- Line-height: 1.2

#### Body Text

```
Large:   18px  - Lead paragraphs
Regular: 16px  - Body text (default)
Small:   14px  - Secondary text
Tiny:    12px  - Labels, captions
```

**Properties:**
- Font-weight: 400 (regular)
- Line-height: 1.6 (relaxed)

#### Monospace

```
Code:    14px, font-family: "Menlo", monospace
```

### Font Feature Settings

```css
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
```

- **kern**: Optical kerning for better spacing
- **liga**: Ligatures (fi, fl, etc.)
- **calt**: Contextual alternates

---

## Spacing & Layout

### Spacing Scale

```css
2px   - Extra small gaps
4px   - Small gaps
6px   - Small-medium gaps
8px   - Standard gap
12px  - Medium gap
16px  - Large gap
24px  - Extra large gap
32px  - 2xl gap
40px  - 3xl gap
48px  - 4xl gap
```

### Section Spacing

```css
--section-gap-y:     88px;    /* 5.5rem - Main section padding */
--section-gap-y-sm:  56px;    /* 3.5rem - Mobile section padding */
```

**Usage:**
```html
<!-- Full section with padding -->
<section class="section-padding">
  <div class="section-inner">
    <!-- Content -->
  </div>
</section>
```

### Container Sizing

```css
.container-max     { max-width: 1280px; margin: auto; }
.container-padding { padding-left: 16px; padding-right: 16px; }
                     @md { padding: 24px; }
                     @lg { padding: 32px; }

.section-inner {
  max-width: 1280px;
  margin: auto;
  padding: 56px 16px;  /* sm */
  @sm { padding: 64px 24px; }
}
```

---

## Component Design

### Button Styles

**Base Button:**
```css
.btn-base {
  inline-flex items-center justify-center;
  font-weight: 600;
  letter-spacing: wide;
  transition: opacity 200ms;
  border-radius: 0px; /* Sharp corners for modern feel */
  
  &:hover { opacity: 88%; }
  &:focus {
    outline: none;
    ring: 2px solid var(--ring);
    ring-offset: 2px;
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
}
```

### Card Styles

**Base Card:**
```css
.card-base {
  background: var(--card);
  color: var(--card-foreground);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 6px;
  border: 1px solid rgba(var(--border), 60%);
}
```

**Hover State:**
```css
.card-hover:hover {
  border-color: rgba(var(--primary), 30%);
  box-shadow: 0 6px 20px rgba(0,0,0,0.14);
  transition: all 200ms ease-out;
}
```

### Input Styles

**Base Input:**
```css
.input-base {
  height: 40px;
  width: 100%;
  padding: 8px 12px;
  background: var(--background);
  border: 1px solid rgba(var(--border), 40%);
  border-radius: 0px;
  font-size: 14px;
  
  &::placeholder {
    color: var(--muted-foreground);
  }
  
  &:focus {
    outline: none;
    ring: 2px solid var(--ring);
    border-color: var(--ring);
  }
}
```

---

## Visual Effects

### Shadows (Cinematic)

```css
--shadow-lift-sm:  0 2px 8px -2px rgba(85,60,40,.08),
                    0 1px 3px -1px rgba(85,60,40,.04);

--shadow-lift-md:  0 6px 20px -4px rgba(85,60,40,.14),
                    0 4px 8px -2px rgba(85,60,40,.07);

--shadow-lift-lg:  0 14px 36px -8px rgba(85,60,40,.18),
                    0 8px 16px -4px rgba(85,60,40,.09);

--shadow-lift-xl:  0 28px 56px -12px rgba(85,60,40,.28),
                    0 14px 28px -8px rgba(85,60,40,.13);
```

**Usage:**
```css
.card { box-shadow: var(--shadow-lift-md); }
.modal { box-shadow: var(--shadow-lift-xl); }
.button:hover { box-shadow: var(--shadow-lift-sm); }
```

### Gradients

**Text Gradient:**
```css
.gradient-text {
  background: linear-gradient(to right,
    var(--primary),
    rgba(var(--primary), 60%)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Section Gradient:**
```css
.section-tinted {
  background-color: rgba(var(--muted), 30%);
  border-top: 1px solid rgba(var(--border), 60%);
  border-bottom: 1px solid rgba(var(--border), 60%);
}
```

### Texture

**Grain Effect:**
```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,...");
}
```

### Backdrop Effects

```css
.backdrop-blur-sm  { backdrop-filter: blur(4px); }
.backdrop-blur-md  { backdrop-filter: blur(12px); }
.backdrop-blur-lg  { backdrop-filter: blur(20px); }
```

---

## Animations

### Easing Functions

```css
--ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
--duration-base: 280ms;
```

### Common Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn var(--duration-base) ease-out;
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp var(--duration-base) var(--ease-out-expo);
}
```

**Hover Effects:**
```css
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lift-md);
  transition: all var(--duration-base) ease-out;
}
```

---

## Dark Mode

### Implementation

```typescript
// Check system preference
const prefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

// Apply dark class
if (prefersDark) {
  document.documentElement.classList.add('dark');
}
```

### CSS Variables in Dark Mode

```css
html.dark {
  --background: 0 0% 6%;
  --foreground: 40 10% 94%;
  /* ... more dark mode variables ... */
}
```

### Theme Transition

```css
html.theme-transitioning,
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.25s ease,
    fill 0.25s ease !important;
}
```

---

## Accessibility

### Color Contrast

**WCAG Requirements Met:**
- ✅ AA level (4.5:1 for normal text)
- ✅ AAA level (7:1 for enhanced)
- ✅ Large text (3:1 minimum)

### Focus States

**Always visible:**
```css
*:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support

```html
<!-- Use semantic HTML -->
<button aria-label="Close menu">✕</button>

<!-- For decorative elements -->
<svg aria-hidden="true">...</svg>

<!-- For status messages -->
<div role="status" aria-live="polite">Saved!</div>
```

---

## Implementation Examples

### Building a Custom Component

```typescript
// Button component with design system
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn-base',
        {
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-transparent': variant === 'ghost',
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        disabled && 'disabled-state'
      )}
      disabled={disabled}
      {...props}
    />
  );
};
```

### Using CSS Variables in Components

```css
.hero-section {
  padding: var(--section-gap-y);
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--color-primary) 6%, transparent),
    color-mix(in srgb, var(--color-primary) 12%, transparent)
  );
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lift-lg);
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--section-gap-y-sm);
  }
}
```

---

## Design Tokens Reference

### All CSS Variables

```typescript
type DesignTokens = {
  // Colors
  colors: {
    background: HSL;
    foreground: HSL;
    primary: HSL;
    secondary: HSL;
    accent: HSL;
    destructive: HSL;
    muted: HSL;
    border: HSL;
    ring: HSL;
    rating: HSL;
    wishlist: HSL;
  };
  
  // Typography
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
  
  // Spacing
  spacing: {
    gap: 2 | 4 | 6 | 8 | 12 | 16 | 24 | 32 | 40 | 48;
    section: 56px | 88px;
  };
  
  // Sizing
  sizes: {
    pill: 9999px;
    sm: 0px;
    md: 6px;
    lg: 12px;
    xl: 16px;
    '2xl': 24px;
  };
  
  // Effects
  effects: {
    shadow: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    backdrop: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  
  // Motion
  motion: {
    easing: {
      outExpo: string;
    };
    duration: 280ms;
  };
};
```

---

## Maintenance & Evolution

### Updating the Design System

1. **Document changes** in this file
2. **Test across browsers** (Chrome, Firefox, Safari, Edge)
3. **Verify accessibility** (contrast, focus, screen readers)
4. **Update components** that use affected tokens
5. **Version the changes** (semver)

### Version History

- **v1.0.0** - Initial design system release
- **v1.1.0** - (Upcoming) Additional component patterns

---

**Last Updated:** August 6, 2026
**Version:** 1.0.0
**Status:** ✅ Active
**Maintainer:** Design Team
