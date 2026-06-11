---
version: alpha
name: HappyRobot Dark Editorial
description: A high-contrast, typography-led dark system for a polished AI product brand.
colors:
  primary: "#FCFCFC"
  secondary: "#B8B8B8"
  tertiary: "#FFFFFF33"
  neutral: "#121212"
  surface: "#1A1A1A"
  on-surface: "#FCFCFC"
  error: "#E45757"
  border: "#374151"
typography:
  headline-display:
    fontFamily: Tobias
    fontSize: 67px
    fontWeight: 400
    lineHeight: 80px
    letterSpacing: -1.35px
  headline-lg:
    fontFamily: Tobias
    fontSize: 47px
    fontWeight: 400
    lineHeight: 56px
    letterSpacing: 0.22px
  headline-md:
    fontFamily: Tobias
    fontSize: 33px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: -0.54px
  headline-sm:
    fontFamily: Suisseintl
    fontSize: 23px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-lg:
    fontFamily: Suisseintl
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: Suisseintl
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: Suisseintl
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: Suisseintl
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-md:
    fontFamily: Suisseintl
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-sm:
    fontFamily: Suisseintl
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 3px
  md: 4px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 8px
  sm: 18px
  md: 30px
  lg: 44px
  xl: 90px
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "4px 15px"
    size: "122px"
    height: "30px"
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "4px 15px"
    size: "122px"
    height: "30px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#0E0D0C"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "4px 15px"
    size: "122px"
    height: "30px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
---

# HappyRobot Dark Editorial

## Overview
HappyRobot feels sleek, confident, and slightly futuristic, with a strong editorial voice rather than a playful SaaS tone. The page uses a dark, atmospheric canvas and oversized serif headlines to position the product as premium and intelligent. The overall density is spacious and restrained, giving the interface room to breathe while keeping focus on the central call to action.

## Colors
- **Primary (#FCFCFC):** Bright white used for the main headline, key navigation text, and the highest-contrast foreground elements on the dark background.
- **Neutral (#121212):** The core background tone, a near-black charcoal that creates the moody, cinematic foundation of the page.
- **Surface (#1A1A1A):** A slightly lifted dark surface for cards and overlays, helping panels feel separated without breaking the monochrome system.
- **On-surface (#FCFCFC):** The default readable text color on dark containers, matching the primary foreground for clarity and consistency.
- **Secondary (#B8B8B8):** A muted gray for less prominent navigation and supporting text, preserving hierarchy without adding extra color noise.
- **Tertiary (#FFFFFF33):** A translucent white used for subtle borders, hairlines, and UI outlines that need to be visible but not dominant.
- **Border (#374151):** A cool dark border tone used around cards and low-emphasis containers when stronger structural separation is needed.
- **Error (#E45757):** A restrained alert color reserved for destructive or invalid states; it should remain sparingly used in this otherwise monochrome system.

## Typography
The system pairs Tobias for display moments with Suisseintl for interface text. Tobias carries the large hero headline with a refined, high-contrast editorial feel, while Suisseintl provides clean, neutral readability for navigation, body copy, and controls. Headings stay regular weight rather than bold, which reinforces the brand’s elegant, confident tone. Letter spacing is slightly tightened in the largest headlines to keep the wordmark-like compositions cohesive, while labels and buttons remain simple and un-capped for a modern, understated interface.

## Layout
The layout is fluid and full-bleed, with the hero section spanning edge to edge and centered content anchored in the middle of the screen. Spacing is generous and rhythmically simple, using a scale that steps from 8px up through 90px for clear vertical hierarchy. Cards and overlays rely on compact internal padding, while major page regions are separated by visual emptiness rather than heavy structural containers. This creates a premium, spacious feel that suits a landing page meant to convert quickly.

## Elevation & Depth
Depth is subtle rather than dramatic. The design relies on tonal layering, translucent borders, and dark surface shifts instead of pronounced shadows or glossy effects. Small UI elements like buttons and consent dialogs use soft separation to remain legible against the dark canvas. The result is a calm, controlled hierarchy where contrast and placement do most of the work.

## Shapes
The shape language is softly squared and minimal. Corner radii stay modest at 3px to 8px for controls and cards, giving the interface a precise, engineered feel. There are no pill-heavy or overly playful forms except where a chip or badge needs a fully rounded treatment. Overall, the geometry feels crisp, modern, and quietly premium.

## Components
Buttons are restrained and compact. Primary buttons use transparent backgrounds, a 1px translucent border, white text, and a small radius, matching the dark UI’s understated style. Secondary buttons should remain similarly minimal but can use darker text and borders when placed on light surfaces. Link buttons should be text-only with no border or fill, and keep underline behavior for clear affordance. Buttons should stay around 30px tall with tight horizontal padding for a refined, utility-first feel.

Cards use the dark surface treatment with a 1px border, 8px radius, and 16px padding. They should read as contained panels rather than elevated containers, with no heavy shadow. Inputs should follow the same language: dark surface, subtle border, soft radius, and generous but efficient padding. Chips and small badges can use the `chip` style with a full radius to create a lightweight pill accent without disrupting the otherwise architectural system.

Navigation is minimal and text-driven, with subdued gray links and a single prominent action on the right. The cookie notice demonstrates that utility overlays should be legible, compact, and grounded in the same dark-on-light contrast hierarchy when they appear above the page.

## Do's and Don'ts
- Do keep typography large, elegant, and spacious so the message remains the hero.
- Do use white and near-white foregrounds sparingly to preserve contrast hierarchy.
- Do rely on subtle borders and tonal differences instead of heavy shadows or neon effects.
- Do keep buttons compact, rectangular, and minimally styled.
- Don't introduce bright accent colors unless they are truly functional and rare.
- Don't round every component into pills; preserve the crisp, editorial corner language.
- Don't crowd the layout with dense modules or excessive supporting copy.
- Don't use bold weights to create emphasis when scale and contrast already provide hierarchy.