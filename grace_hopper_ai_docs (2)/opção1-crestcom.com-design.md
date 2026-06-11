---
version: alpha
name: Crestcom Executive Training
description: A polished, professional, high-contrast system for leadership training and corporate education.
colors:
  primary: "#0A0A41"
  secondary: "#666666"
  tertiary: "#D83B01"
  neutral: "#E5E7EB"
  surface: "#FFFFFF"
  on-surface: "#000000"
  background: "#FFFFFF"
  error: "#D83B01"
  accent: "#1F4AE0"
  border: "#E5E7EB"
typography:
  headline-display:
    fontFamily: Raleway
    fontSize: 40px
    fontWeight: 700
    lineHeight: 40px
    letterSpacing: 1px
  headline-lg:
    fontFamily: Raleway
    fontSize: 29px
    fontWeight: 500
    lineHeight: 29px
    letterSpacing: 1px
  headline-md:
    fontFamily: Raleway
    fontSize: 24px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 1px
  headline-sm:
    fontFamily: Raleway
    fontSize: 18px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: Raleway
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0px
  body-md:
    fontFamily: Raleway
    fontSize: 16px
    fontWeight: 500
    lineHeight: 27.2px
    letterSpacing: 0px
  body-sm:
    fontFamily: Raleway
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0px
  label-lg:
    fontFamily: Raleway
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0px
  label-md:
    fontFamily: Raleway
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  label-sm:
    fontFamily: Raleway
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  utility-xs:
    fontFamily: Raleway
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 10px
  sm: 20px
  md: 40px
  lg: 94px
  xl: 126px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "10px 30px"
    size: "188px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "10px 30px"
    size: "188px"
    height: "54px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Crestcom

## Overview
Crestcom presents as a corporate, confident, and highly structured brand built for executive leadership training. The visual tone is serious and professional rather than playful, with strong contrast, restrained color, and clear calls to action. Layouts feel spacious and editorial, using large imagery, generous breathing room, and straightforward hierarchy to support trust and credibility.

## Colors
- **Primary (#0A0A41):** A deep navy-ink used for the brand mark, primary buttons, and strong navigation/heading accents. It signals authority, stability, and premium corporate polish.
- **Secondary (#666666):** A neutral mid-gray used for supportive copy, utility links, and less prominent interface text. It keeps the interface calm without competing with the primary ink.
- **Surface (#FFFFFF):** The dominant card and page surface color, used to keep content clean and readable over the large photographic hero.
- **Background (#FFFFFF):** A white canvas that reinforces openness and clarity across the site’s layouts.
- **On-surface (#000000):** Black text for highest readability in content areas, modal text, and body copy where maximum contrast is needed.
- **Neutral (#E5E7EB):** A light border and divider tone that separates cards, panels, and modal sections without introducing visual heaviness.
- **Accent (#1F4AE0):** A bright interface accent used for selected states and active emphasis, especially where a clearer interactive signal is needed.
- **Error (#D83B01):** A warm alert red reserved for destructive or attention-grabbing actions such as acceptance/consent emphasis and critical feedback.
- **Tertiary (#D83B01):** A vivid orange-red that can support urgent actions or warnings when a stronger emotional cue is appropriate.

## Typography
Raleway is the core type family across the system, giving the site a modern, airy, slightly geometric feel that matches the executive-training positioning. Headlines use medium to bold weights with tight line heights and noticeable 1px letter spacing, creating an elevated, branded, almost editorial look. Body text stays at 16px with a comfortable 27.2px line height for readability, while labels and buttons use 12px to 20px weights depending on prominence.

Headings should preserve the strong tracking and compact vertical rhythm seen in the source, especially in hero and section titles. `headline-display`, `headline-lg`, and `headline-md` are best for major page statements, while `headline-sm` handles smaller section headers. `body-md` is the default reading style; `body-lg` supports prominent button or callout text; `label-md` and `label-sm` work for navigation, legal copy, and compact utility text.

Uppercase and small-cap styling is used sparingly but effectively in navigation and badge-like treatments. The overall typographic system is clean, disciplined, and highly legible, with no decorative flourishes beyond spacing and weight contrast.

## Layout
The layout strategy is spacious and content-led, with a wide hero area and centered, layered modal content. The source behaves like a fluid full-bleed marketing page rather than a rigid card grid, but the content itself is organized with clear left alignment and strong horizontal gutters. Use the spacing scale rhythm consistently: 10px for tight internal gaps, 20px for modest separation, 40px for section grouping, and larger 94px to 126px values for major page breathing room.

Sections should feel open, with generous vertical padding and measured side margins so the photography and navigation can breathe. Cards and dialogs should maintain distinct internal padding, while content blocks should avoid crowding the edges. The overall structure should favor clarity over density.

## Elevation & Depth
The system is intentionally light on elevation. Most surfaces rely on contrast, borders, and image layering rather than heavy shadows or stacked depth. Where depth appears, it is subtle: a soft shadow for floating dialogs and a simple 1px border for cards and panels.

The hero image creates the strongest sense of depth through photographic contrast and foreground overlays, while the content panels remain crisp and flat. Use tonal separation and white surfaces before adding shadow. Shadows should stay minimal and restrained so the interface keeps its professional tone.

## Shapes
The shape language is understated and slightly softened. Interactive controls use small radii, with 6px on primary buttons and 4px to 8px on secondary surfaces and cards. This produces a practical, businesslike feel rather than a playful one.

Avoid overly rounded corners except for pill-style utility chips or accessibility controls. The dominant impression should be structured and stable, with just enough softness to keep the UI approachable.

## Components
Buttons are a key visual anchor. `button-primary` is a filled navy button with white text, 10px by 30px padding, a 188px minimum width, and a 54px height; it is the strongest CTA and should be used for actions like “Get Started” or “Learn More.” `button-primary-hover` can shift to the brighter accent tone to signal interactivity. `button-secondary` is transparent with a dark outline and dark text, suitable for lower-emphasis actions. `button-link` is a small, text-only utility style for legal links and inline actions.

Cards should use `card` with a white surface, light border, 8px rounding, and 16px padding. Keep them clean and content-first, with no heavy shadows. Inputs should follow the same restrained surface logic: white background, subtle border, 6px rounding, and moderate padding. Focus states should be visible but not flashy, using the accent color rather than decorative effects.

Chips and badges should remain compact and pill-like, with `chip` using full rounding and small padding. They should read as supportive metadata rather than primary actions. Navigation items should feel lightweight and tightly tracked, with enough spacing to support a premium header bar without visual clutter.

Dialogs and consent surfaces should present as white, bordered panels with clear horizontal separators and strong action buttons along the bottom. The cookie experience in particular uses a layered modal with tabbed navigation and a prominent dual-button footer; keep this pattern crisp, utilitarian, and easy to scan.

## Do's and Don'ts
- Do use Raleway consistently across headings, body, and UI labels to preserve brand unity.
- Do keep the primary CTA in deep navy with white text for the strongest action hierarchy.
- Do use generous whitespace and clear separation between major page sections.
- Do rely on borders and contrast before adding shadows or complex depth.
- Don't introduce bright multi-color palettes or playful gradients that dilute the corporate tone.
- Don't over-round controls; keep corners small and disciplined.
- Don't compress body text below the comfortable 16px / 27.2px reading rhythm.
- Don't make cards or dialogs feel heavy; the design should stay crisp, light, and editorial.