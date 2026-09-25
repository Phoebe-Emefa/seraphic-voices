---
name: Seraphic Voices of Toronto
description: Choir marketing site, navy and gold, Space Grotesk, photography-led
colors:
  primary: "#04235c"
  secondary-100: "#eaeff6"
  secondary-500: "#FFE099"
  secondary-600: "#5a7aad"
  secondary-700: "#244983"
  bg-100: "#f7f8f8"
  bg-200: "#acacb4"
  text: "#4F4F4F"
  surface: "#f7f7f7"
typography:
  display:
    fontFamily: "var(--font-spacegrotesk), Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-spacegrotesk), Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "2px"
  md: "8px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.secondary-700}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
---

## Overview

Incumbent language: navy ground, gold accent, pale blue chrome, Space Grotesk, concert photography. Light theme only. Do not introduce purple glows, serif display, or a second UI kit. Chakra tokens in `src/styles` are the runtime source of truth.

## Colors

One accent family: navy (`primary` / `secondary.700`) with gold (`secondary.500`) as highlight, never as body text on white. Body text is `text`. Surfaces are `secondary.100` and `bg.100`. Do not use default Chakra `blue.500` or `orange.400` on this site.

## Typography

Headings and body share Space Grotesk via `--font-spacegrotesk`. Display lines stay at or under two lines in heroes. Body measure stays readable (~65ch) on editorial sections.

## Layout

Nav is fixed, max 80px, content offset `5rem`. Page width uses Chakra containers up to `7xl`. Inner pages use a short image title band, not a centered dark scrollable overlay. Home keeps a split carousel plus copy, with a normal stacked mobile column (no negative-overlap hero).

## Elevation & Depth

Prefer borders and pale fills over heavy drop shadows. When a shadow is used, tint it toward navy, not pure black.

## Shapes

Buttons are full pills. Cards and images use `md` (~8px). Do not mix sharp tiles with pill buttons.

## Components

- Primary button: `secondary.700` fill, white label, press scale 0.97
- Nav: one Donate CTA; Contact Us is a text link
- Reveal: opacity + 12px translateY, ~400ms ease-out, static under reduced motion
- Forms: visible labels above inputs; errors as text, not HTML

## Do's and Don'ts

Do drive hero concert copy from the next upcoming Sanity event or home CMS fields.

Don't hardcode expired concerts, invent payment CTAs, or add a second typeface.
