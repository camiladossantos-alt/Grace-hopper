---
version: alpha
name: Scope Copenhagen
description: A quiet, editorial minimal system with airy spacing, soft neutral surfaces, and restrained contrast.
colors:
  primary: "#2C2B2B"
  secondary: "#7A7777"
  tertiary: "#E5E7EB"
  neutral: "#F1F1F1"
  surface: "#FFFFFF"
  on-surface: "#2C2B2B"
  error: "#B00020"
  background: "#F1F1F1"
  accent: "#000000"
typography:
  headline-display:
    fontFamily: Gotham
    fontSize: 48px
    fontWeight: 400
    lineHeight: 48px
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Gotham
    fontSize: 36px
    fontWeight: 400
    lineHeight: 48px
    letterSpacing: -0.05em
  headline-md:
    fontFamily: Gotham
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Gotham
    fontSize: 21px
    fontWeight: 400
    lineHeight: 25px
    letterSpacing: 0em
  body-lg:
    fontFamily: -apple-system
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: -apple-system
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-sm:
    fontFamily: -apple-system
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-lg:
    fontFamily: -apple-system
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0em
  label-md:
    fontFamily: -apple-system
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-sm:
    fontFamily: -apple-system
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  nav-label:
    fontFamily: Gotham
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.28em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 6px
  sm: 16px
  md: 32px
  lg: 80px
  xl: 160px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-tertiary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
    height: "auto"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Scope Copenhagen

## Overview
Scope Copenhagen feels restrained, architectural, and quietly premium. The interface is aimed at design-conscious users who value spacious layouts, refined typography, and understated presentation over visual noise. The emotional tone is calm and contemplative, with a strong editorial sensibility and very little decorative flourish.

## Colors
- **Primary (#2C2B2B):** The deep charcoal used for key text, navigation, and primary action surfaces. It provides the strongest contrast in the system without becoming pure black.
- **Secondary (#7A7777):** A muted gray for supportive text and lower-emphasis UI elements when needed. It should stay visually quiet and never compete with headlines.
- **Tertiary (#E5E7EB):** A soft border and divider tone that works for subtle separation on cards, inputs, and utility surfaces.
- **Neutral (#F1F1F1):** The signature background gray that sets the calm, gallery-like atmosphere of the site.
- **Surface (#FFFFFF):** Used sparingly for true white overlays, forms, and content areas that need to float above the neutral field.
- **On-surface (#2C2B2B):** The default readable text color on light surfaces.
- **Accent (#000000):** Reserved for the strongest contrast moments, such as the darkest marks, icons, or hover emphasis.
- **Background (#F1F1F1):** The main canvas color across the page, reinforcing the airy and minimal look.
- **Error (#B00020):** A conventional alert tone that should remain rare and controlled so it does not disrupt the restrained palette.

## Typography
Gotham is the defining display family and gives the brand its modern, geometric, editorial voice. Headlines use a light, regular treatment rather than bold weight, with tight negative letter spacing in display sizes to create a clean, architectural rhythm.

Body and utility text use the system sans stack for reliability and quiet neutrality. Labels and navigation are often set in uppercase with generous tracking, especially in the top navigation where the letter spacing creates a refined, almost museum-like cadence. The typography hierarchy is intentionally simple: large Gotham headlines for emotional impact, system body copy for readability, and spaced small labels for navigation and metadata.

## Layout
The layout is fluid and centered, with a large amount of negative space surrounding the hero and imagery. Content feels constrained by an invisible wide container rather than a hard grid, allowing the page to breathe while maintaining a composed editorial alignment.

Spacing follows a sparse rhythm: 6px for micro adjustments, 16px for small relationships, 32px for standard separation, and large jumps of 80px and 160px for section transitions and dramatic whitespace. Sections rely on generous top and bottom padding instead of boxed containers, and imagery is arranged asymmetrically to keep the page feeling curated rather than rigid.

## Elevation & Depth
The system is intentionally flat. There are no meaningful shadows or layered elevations; hierarchy comes from typography scale, whitespace, and contrast against the soft gray background. Subtle borders appear only where structure is needed, such as cards or form fields, and even then they remain understated.

## Shapes
The shape language is minimal and controlled. Small radii are used for interactive surfaces and cards, with 4px as the default button radius and 8px for content containers. Larger pill shapes should be reserved for chips or metadata badges, while most other elements should remain crisp and rectilinear.

## Components
Buttons are restrained and functional. `button-primary` uses a dark charcoal fill with light text, `button-secondary` inverts to a white or transparent-looking surface with a charcoal outline, and `button-tertiary` behaves like a text link with no visible container. All buttons should be compact, with 8px by 16px padding and a 40px target height; hover states should deepen contrast rather than add motion or decoration.

Cards should feel like quiet frames rather than elevated panels. Use `card` with a soft neutral or white background, a fine `tertiary` border, and 16px padding. Avoid heavy shadows, loud borders, or aggressive color fills.

Inputs should be simple and approachable, with white or surface backgrounds, subtle borders, and the same 4px radius used by buttons. Focus states should remain minimal but clear, relying on border color and contrast rather than glow effects.

Chips and small tags should be lightweight, often uppercase or tightly tracked, and use rounded full-pill geometry only when they need a badge-like feel. Links should stay understated, generally in charcoal with underline only when necessary for clarity.

Navigation is a key component pattern: small uppercase labels with wide letter spacing, ample horizontal separation, and a thin underline or marker for the active item. This treatment should remain elegant and never become dense.

## Do's and Don'ts
- Do keep the palette neutral, airy, and mostly monochrome.
- Do use Gotham for headlines and spaced uppercase labels for navigation.
- Do preserve large amounts of whitespace between sections and around imagery.
- Do prefer flat surfaces with subtle borders over shadows and depth effects.
- Don't introduce saturated accent colors or playful gradients.
- Don't use heavy font weights, condensed typography, or tight packed layouts.
- Don't add large corner radii to major containers or cards.
- Don't over-style buttons, links, or navigation with decorative effects.