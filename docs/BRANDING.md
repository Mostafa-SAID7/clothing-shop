# HAVEN Branding Guidelines

Professional branding documentation for the HAVEN clothing store.

## Logo & Favicon

### "H" Logo Design

The HAVEN brand features a modern, minimalist "H" logo that represents:
- **Minimalism**: Clean, bold letterform
- **Premium**: Sophisticated dark background with white typography
- **Modern**: Gradient depth and subtle shine effects

### Favicon Specifications

**File Location:** `/frontend/public/favicon.svg`

**Dimensions:** 180x180px (scalable SVG format)

**Color Scheme:**
- **Background:** Dark gradient (#0a0a0a to #1a1a1a) - matches dark theme
- **Logo:** White gradient (#ffffff to #e8e8e8) - high contrast, readable at any size
- **Accents:** Subtle opacity layers for depth

**Design Features:**
- Rounded corners (40px radius) for modern appeal
- Gradient on "H" for dimensional depth
- Subtle shine effect for premium feel
- Inner borders for polish and definition
- Shadow effects for visual hierarchy

### Technical Implementation

**SVG Format Advantages:**
- ✅ Scalable to any size without quality loss
- ✅ Smaller file size than PNG
- ✅ Supports CSS transforms and animations
- ✅ Perfect for all devices (mobile, desktop, favicons)

**Browser Support:**
- ✅ All modern browsers
- ✅ iOS Safari (via apple-touch-icon)
- ✅ Android Chrome
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)

### Usage in HTML

```html
<!-- Primary favicon (modern SVG) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Apple Touch Icon (iOS) -->
<link rel="apple-touch-icon" href="/favicon.svg" />

<!-- Manifest for PWA -->
<link rel="manifest" href="/manifest.webmanifest" />
```

### Favicon Integration Points

1. **Browser Tab:**
   - Shows on browser tab
   - Shows in bookmarks
   - Shows in history

2. **iOS Home Screen:**
   - Apple Touch Icon (via manifest)
   - Appears when "Add to Home Screen" is used

3. **Android Home Screen:**
   - Appears in launcher via manifest
   - Used for app installation

4. **Schema.org:**
   - Referenced in structured data
   - SEO metadata

### Web Manifest Configuration

**File:** `/frontend/public/manifest.webmanifest`

```json
{
  "name": "HAVEN - Premium Fashion Store",
  "short_name": "HAVEN",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "180x180",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## Design System Integration

### Color Palette

**Primary Colors:**
- **Dark Background:** #0a0a0a (almost black)
- **Dark Accent:** #1a1a1a (slightly lighter black)
- **White Text:** #ffffff (pure white)
- **Accent Color:** #0a0a0a (matches primary)

**Corresponding CSS Variables:**
```css
--primary: 0 0% 10%;           /* Used for favicon */
--background: 40 20% 97%;      /* Light mode background */
--foreground: 0 0% 10%;        /* Light mode text */
```

### Typography

**Font:** Jost (universal font for all languages)
- Regular: 400
- Medium: 500
- Bold: 600-700
- Extra Bold: 800-900

## Favicon Optimization

### Performance

- **File Size:** ~2.2 KB (minimal impact)
- **Format:** SVG (scalable, no caching issues)
- **Loading:** Preloaded in `<head>` for instant display

### Accessibility

- ✅ High contrast (white on dark)
- ✅ Readable at 16px (minimum favicon size)
- ✅ Clear letterform (no detail loss at small sizes)
- ✅ WCAG AA compliant contrast ratio (>7:1)

## Brand Consistency

### Logo Usage Rules

**Do:**
- ✅ Use SVG format whenever possible
- ✅ Maintain aspect ratio (square 1:1)
- ✅ Keep minimum size at 16px
- ✅ Preserve white/dark contrast
- ✅ Use on both light and dark backgrounds

**Don't:**
- ❌ Stretch or distort the logo
- ❌ Change colors without approval
- ❌ Add extra effects or shadows
- ❌ Use at sizes smaller than 16px
- ❌ Rotate or flip the letterform

### Background Requirements

**On Light Backgrounds:**
- Use white background with dark "H"

**On Dark Backgrounds:**
- Use dark background with white "H"

**On Branded Backgrounds:**
- Use sufficient contrast for readability

## Future Enhancements

### Potential Additions

1. **Alternate Formats:**
   - PNG fallback (if needed for older browsers)
   - WebP format (for better compression)

2. **Animation:**
   - Subtle hover effects
   - Loading animations
   - Transition effects

3. **Variants:**
   - Light mode version
   - Icon-only version
   - Wordmark with "HAVEN" text

4. **Social Media:**
   - Custom favicon for social sharing
   - Open Graph image matching favicon style

## Implementation Notes

### SVG Structure

```
Favicon SVG
├── Gradients (definitions)
├── Filters (shadow, effects)
├── Background (rounded rectangle)
├── Border (subtle outline)
├── "H" Letter
│   ├── Left vertical bar
│   ├── Right vertical bar
│   └── Horizontal crossbar
└── Effects (shine, shadow)
```

### CSS Customization

The favicon can be enhanced with CSS-in-JS if needed:

```typescript
// Example: Dynamic favicon color change
const updateFaviconColor = (color: string) => {
  const link = document.querySelector("link[rel='icon']");
  if (link) {
    link.setAttribute('href', `/favicon.svg?color=${color}`);
  }
};
```

## Maintenance

### Update Checklist

When updating the favicon:
- [ ] Update SVG file
- [ ] Test in all major browsers
- [ ] Verify iOS display
- [ ] Check Android display
- [ ] Clear browser cache
- [ ] Update manifest if needed
- [ ] Test bookmarks display
- [ ] Verify in browser history
- [ ] Check social media previews

## References

- [MDN: Favicon Guide](https://developer.mozilla.org/en-US/docs/Glossary/Favicon)
- [Web.dev: Manifest](https://web.dev/add-manifest/)
- [SVG Format Reference](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Apple Touch Icons](https://developer.apple.com/library/archive/documentation/AppleWebKit/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

---

**Last Updated:** August 6, 2026
**Version:** 1.0.0
**Status:** ✅ Active
