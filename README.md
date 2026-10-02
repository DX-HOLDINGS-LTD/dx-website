# DX Wallet — Website & Waitlist

The public website and waitlist platform for **DX Wallet** — *Digital Dollars, Made Simple.* Built for DX Holdings Ltd ahead of the DX Wallet launch in The Gambia.

## What's inside

- **Public website** — product overview, how it works, buy/sell/send previews, FAQ and upcoming products.
- **Waitlist** — early-access sign-up form saved to the cloud database.
- **Contact form** — visitor questions are stored and shown in the admin area.
- **Admin area (`/admin`)** — signed-in DX staff can search the waitlist, export it to CSV and read visitor questions.

## Tech

React 19, TanStack Start/Router, TypeScript, Tailwind CSS v4, Vite. Data and sign-in are handled by a hosted database with row-level security.

## Running locally

Requires Node.js 20+ or [Bun](https://bun.sh).

```bash
git clone https://github.com/DX-HOLDINGS-LTD/dx-website.git
cd dx-website
bun install    # or: npm install
bun dev        # or: npm run dev
```

Then open http://localhost:8080.

## Admin access

Go to `/admin` and sign in with an authorised email and password. Access is restricted to approved DX accounts.

---

© 2026 DX Holdings Ltd. All rights reserved.
