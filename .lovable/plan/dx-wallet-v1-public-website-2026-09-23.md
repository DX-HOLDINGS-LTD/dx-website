# DX Wallet V1 Public Website

## Goal

Build a premium, mobile-first public website that clearly introduces DX Wallet, demonstrates its planned wallet experience without real transactions, and captures waitlist/contact interest through frontend-only forms.

## Build

- Establish the emerald, charcoal, white, and soft-neutral design system with Manrope typography, restrained radii, borders, shadows, motion, and accessible focus states.
- Build a responsive header with desktop navigation, animated mobile menu, smooth section scrolling, and prominent waitlist action.
- Create all specified sections in the requested order: hero and wallet mockup, product explanation, six features, four-step flow, buy/sell demonstrations, send demonstration, external-wallet compatibility note, why DX, coming soon, waitlist, learning prompts, FAQ, social journey, contact, and footer.
- Create believable static product interfaces with clear “product preview” labeling so no financial action appears live.
- Add polished frontend behavior: mobile navigation, section reveal motion, learning dialogs, single-open FAQ accordion, waitlist validation/loading/success, and contact-form validation/success.
- Keep social and legal destinations as clearly non-operational placeholders where URLs/content were not supplied; preserve the supplied email and phone links.

## Responsive and Quality Checks

- Recompose dense mockups, card layouts, timelines, forms, navigation, and calls to action for small phones through desktop.
- Verify keyboard operation, semantic labels, focus visibility, reduced-motion support, contrast, touch targets, and horizontal overflow.
- Add complete page metadata and review the rendered page at desktop and mobile sizes.

## Technical Notes

- Use the existing TanStack Start structure and Tailwind v4 token system.
- Keep all data and submissions in temporary browser state only; no authentication, storage, payment, wallet, or transaction services.
- Use a lightweight icon package already compatible with the project, avoiding unnecessary runtime dependencies.
