---
version: alpha
name: CCL Editorial Trust
description: A bright, calm nonprofit leadership system blending classical serif headlines with pragmatic sans-serif UI.
colors:
  primary: "#2F5F95"
  primary-60: "#5E84B0"
  primary-70: "#7896BD"
  secondary: "#1560A5"
  tertiary: "#6CC9C3"
  neutral: "#F7F9FB"
  surface: "#FFFFFF"
  on-surface: "#3B3B3B"
  border: "#E5E7EB"
  muted: "#C9D4DE"
  accent-soft: "#A7DDE0"
  error: "#C24141"
typography:
  headline-display:
    fontFamily: "Lora"
    fontSize: 90px
    fontWeight: 400
    lineHeight: 110px
    letterSpacing: 0px
  headline-lg:
    fontFamily: "Lora"
    fontSize: 60px
    fontWeight: 400
    lineHeight: 90px
    letterSpacing: 0px
  headline-md:
    fontFamily: "Lora"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 48px
    letterSpacing: 0px
  headline-sm:
    fontFamily: "Noto Sans"
    fontSize: 27px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Noto Sans"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 27px
    letterSpacing: 0px
  body-md:
    fontFamily: "Noto Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Noto Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Noto Sans"
    fontSize: 18px
    fontWeight: 800
    lineHeight: 27px
    letterSpacing: 0px
  label-md:
    fontFamily: "Noto Sans"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0px
  label-sm:
    fontFamily: "Noto Sans"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 21px
    letterSpacing: 0px
  nav:
    fontFamily: "Noto Sans"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 20px
    letterSpacing: 0px
  button:
    fontFamily: "Noto Sans"
    fontSize: 18px
    fontWeight: 800
    lineHeight: 24px
    letterSpacing: 0px
  small-link:
    fontFamily: "Noto Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 10px
  xl: 16px
  full: 9999px
spacing:
  xs: 6px
  sm: 14px
  md: 22px
  lg: 40px
  xl: 100px
  gutter: 30px
  section: 80px
components:
  button-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "22px 30px"
    height: "68px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "22px 30px"
    height: "68px"
  button-primary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
  button-secondary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.small-link}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "16px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
---

# CCL Editorial Trust

## Overview
This system feels academic, mission-driven, and optimistic, with a strong editorial voice softened by approachable UI patterns. It is designed for a professional audience seeking credibility, clarity, and human-centered leadership guidance. The visual rhythm is airy and spacious, with a restrained layout that lets the typography and accent colors carry most of the personality.

## Colors
- **Primary (#2F5F95):** A confident medium blue used for key interactive borders, logo accents, and trust-building UI details. It gives the system its institutional backbone without feeling heavy.
- **Secondary (#1560A5):** A brighter blue reserved for stronger emphasis and brand reinforcement. It reads as an accessible digital accent rather than a decorative color.
- **Tertiary (#6CC9C3):** A soft aqua-teal used in the illustrative swooshes and lighter highlights. It adds warmth and a future-facing, human tone.
- **Primary-60 (#5E84B0) and Primary-70 (#7896BD):** Cooler transitional blues that support layered brand graphics and subtle visual depth.
- **Neutral (#F7F9FB):** A very light cool neutral that supports the spacious, clean backdrop of the page.
- **Surface (#FFFFFF):** The main card and page surface color, reinforcing openness and legibility.
- **On-surface (#3B3B3B):** The primary text color, a soft charcoal that feels less severe than black while remaining highly readable.
- **Border (#E5E7EB):** A gentle divider tone used for cards, top navigation, and low-emphasis framing.
- **Accent-soft (#A7DDE0):** A pale aqua used for glows and softened color transitions behind the hero area.
- **Error (#C24141):** A restrained alert red for validation and destructive states, keeping the palette professional.

## Typography
The typographic contrast is central to the identity: Lora provides an elegant editorial voice for headlines, while Noto Sans handles navigation, body copy, and controls with clarity. Headlines are set in a regular weight, which keeps the brand feeling cultured and composed rather than aggressive. UI labels and buttons rely on heavier sans-serif weights for decisiveness and scannability.

Use `headline-display`, `headline-lg`, and `headline-md` for major messaging and section intros; these are large, literary, and low-contrast in tone. Use `headline-sm` for subheads that need more utility than drama. Use `body-lg`, `body-md`, and `body-sm` for paragraphs, supporting copy, and metadata. Use `label-lg`, `label-md`, `label-sm`, and `nav` for buttons, navigation, and interface labels; these should stay clean and mostly title case, not all caps, since the source does not rely on uppercase tracking.

## Layout
The page uses a wide, centered desktop layout with generous negative space and a fixed-max-width feel rather than a dense grid. Content is arranged in a strong hero composition: left-aligned editorial copy balanced by right-side illustrative brand graphics. Spacing follows a comfortable rhythm based on 6px, 14px, 22px, 40px, and 100px increments, creating clear separation between navigation, hero messaging, and supporting actions.

Sections should breathe generously, with ample outer padding and minimal visual clutter. Primary content blocks and cards should use modest internal padding, while major hero and section spacing should remain expansive to preserve the calm, prestigious tone.

## Elevation & Depth
The interface is intentionally flat and low-shadow. Hierarchy comes from typography scale, color contrast, and thin borders rather than heavy depth effects. Where depth appears, it is subtle and functional, such as the cookie panel’s soft shadow and the faint separation of bordered cards from the white background.

Avoid glossy gradients, large drop shadows, or material-style layering. The design should feel refined, editorial, and institutionally grounded.

## Shapes
The shape language is gentle and controlled, with rounded corners in the 8px to 10px range for buttons, cards, and inputs. This creates a soft professional look without becoming playful. Pills and chips may use full rounding for compact navigation or tag-like controls.

Keep geometry simple and stable. Most elements should read as rectangular forms with mild corner smoothing and consistent stroke widths.

## Components
Buttons are a major signature of the system. `button-primary` and `button-secondary` are large, generous CTAs with a 68px height, 22px vertical padding, and 30px horizontal padding. They should feel roomy and legible, with strong sans-serif labels at 18px and 800 weight. Primary buttons use blue borders and text with a white fill; secondary buttons keep the same shape but feel slightly quieter. Hover states may tint toward `neutral` while preserving contrast. `button-link` is reserved for inline actions such as privacy links and footer utilities.

Cards should be white, bordered, and restrained, using `card` with an 8px radius and 16px padding. They should not float heavily; the border is often more important than shadow. Inputs should follow the same visual language as cards, with clear borders, comfortable padding, and rounded corners that match button geometry.

Navigation items are text-led, compact, and bold enough to scan quickly without shouting. Links and utility actions should remain understated, often using blue for emphasis and dark charcoal for default text. Chips or quick-action pills, when used, should be full-rounded, lightly bordered, and compact enough to support hero CTAs or filters without competing with the headlines.

Illustrative brand graphics can use layered blue-to-teal bands or swooshes, but component UI itself should remain mostly flat and structured. Keep iconography simple, line-based, and support-first.

## Do's and Don'ts
- Do let Lora dominate the hero and major section headings.
- Do keep body text and controls in Noto Sans for clarity.
- Do preserve generous whitespace and a calm, centered composition.
- Do use blue borders and restrained fills for primary actions.
- Don't introduce heavy shadows, glassmorphism, or overly decorative effects.
- Don't use all-caps navigation or labels unless a specific utility pattern requires it.
- Don't make buttons small or tight; the system depends on spacious, touch-friendly CTAs.
- Don't overuse accent teal; keep it as a supportive brand highlight rather than the main interface color.