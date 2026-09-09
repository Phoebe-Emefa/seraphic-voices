# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are concert-goers, choir members, families, and Toronto-area supporters looking for who the choir is, when they perform, and how to reach or support them. Editors use Sanity Studio at `/admin` to update public content. Inferred from the live site and CMS schema; not a stakeholder interview.

## Product Purpose

Seraphic Voices of Toronto is the public website for a choir that presents Western and African music and cross-cultural performance. Visitors should be able to learn the choir’s story, see the ensemble, browse events and media, contact the group, and follow donation instructions. Success is a clear path to a concert, a message, or a gift without inventing claims the choir has not published.

## Positioning

A Toronto choir site whose public story, events, gallery, and donation steps are already stored in Sanity. Neighboring arts sites can copy a layout; they cannot copy this ensemble’s repertoire, concert calendar, or membership.

## Operating Context

- Public marketing site at seraphicvoicestoronto.com
- Content edited in Sanity (`production` dataset)
- Contact messages sent by email through a Next.js route and Nodemailer / Gmail
- Donation is instructional (no in-app payment processor)
- Social profiles: Facebook, YouTube, Instagram (URLs currently in code)

## Capabilities and Constraints

- Routes: `/`, `/about-us`, `/about-us/our-team`, `/events`, `/events/[slug]`, `/events/sera5th`, `/gallery`, `/donate`, `/contact-us`, `/admin`
- CMS types today: home, events, whoWeAre, team, gallery, repertoire, contact, donation, sera5th, plus page heroes
- Full CMS ownership of remaining chrome (nav labels, footer, leftover hardcoded copy) is **explicitly deferred** to a later project
- Do not invent payment products, calendar subscribe, testimonials, or fake metrics
- Stack: Next.js App Router, Chakra UI v2, Sanity, Formik/Yup, Framer Motion, TanStack Query, pnpm

## Brand Commitments

- Name: Seraphic Voices of Toronto
- Preserve identity: navy `#04235c`, gold `#FFE099`, pale blue `#eaeff6`, secondary navy `#244983`, Space Grotesk, existing logo and photography
- Visual revamp preserves brand, routes, and CMS content; it does not replace the identity

## Evidence on Hand

- Logo and icons under `public/` and `src` image imports (`seraphic-voices.png`, favicons)
- Sanity-backed copy and images for home, about, team, events, gallery, donate, contact, sera5th
- No published testimonials, ticketing vendor, or donation processor in the repo. Do not fabricate them.

## Product Principles

1. The choir and its concerts are the product, not a generic arts template.
2. Only publish dates, venues, and links that come from CMS or confirmed code.
3. One primary gift action (Donate) and one contact action (Contact Us).
4. Editors keep Sanity; the next project expands what Studio owns, this one does not.
5. Security and honesty of forms/email outrank decorative features.

## Accessibility & Inclusion

No separate policy document. Aim for WCAG AA contrast, labeled form fields, keyboard-operable controls, and `prefers-reduced-motion` on decorative motion.
