# RoamerRadar

A full-stack travel marketplace for booking **stays**, **flights**, **cars**, and **experiences**. Built with Next.js 14, Supabase PostgreSQL, NextAuth, Stripe, and Duffel.

## Features

- **Multi-vertical search** — Browse and search stays, flights, cars, and things to do
- **Live flight search** — Real airline offers via the [Duffel API](https://duffel.com), cached in PostgreSQL
- **Stripe checkout** — Payment intents for listings and cached flight offers
- **Authentication** — Email/password (with verification) plus Google and GitHub OAuth via NextAuth v5
- **Messaging** — User-to-user conversations tied to listings
- **My Bookings** — Booking history backed by the database
- **Listings & reviews** — Host-owned listings with ratings and amenities

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase PostgreSQL + Prisma |
| Auth | NextAuth v5 (JWT sessions) |
| Payments | Stripe |
| Flights | Duffel API |
| Email | Resend |
| Maps | Mapbox GL |
| UI | Tailwind CSS, Radix UI, shadcn-style components |
| State | Zustand (client search UI) |

## Project Structure

```
src/
├── app/
│   ├── (browse)/          # Public landing & search pages
│   ├── (protected)/       # Auth-gated pages (category results, checkout, profile)
│   ├── auth/              # Login, register, email verification
│   └── api/               # NextAuth + Stripe webhook
├── actions/               # Server actions (forms, mutations)
├── components/            # Shared UI components
├── data/                  # Database query layer
├── lib/                   # Utilities, Stripe, Duffel, checkout
├── stores/                # Zustand client stores
├── schemas/               # Zod validation schemas
└── env.ts                 # Runtime environment validation
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Sample listings
```

## Quick Start

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (PostgreSQL)
- (Optional) [Duffel](https://duffel.com), [Stripe](https://stripe.com), [Resend](https://resend.com), [Mapbox](https://mapbox.com) accounts

### 1. Clone and install

```bash
git clone https://github.com/jobayed003/roamerradar.git
cd roamerradar
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the required values:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Supabase pooler URL (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Yes | Supabase direct URL (port 5432, for migrations) |
| `AUTH_SECRET` | Yes | Random secret — `openssl rand -base64 32` |
| `AUTH_TRUST_HOST` | Production | Set `true` on Vercel so OAuth callbacks trust the proxy host |
| `AUTH_URL` | Recommended in prod | Exact site origin, e.g. `https://your-domain.com` (no trailing slash) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | App URL, e.g. `http://localhost:3000` |
| `DUFFEL_ACCESS_TOKEN` | For flights | Duffel **test** token (`duffel_test_…`) — use in production for demo/live API search |
| `USE_DEMO_FLIGHTS` | Optional | Set to `true` only to skip Duffel and use seeded DB sample flights |
| `STRIPE_SECRET_KEY` | For payments | Stripe test secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe test publishable key |
| `RESEND_API_KEY` | For email signup | Resend API key |
| `NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN` | For maps | Mapbox public token |
| `GOOGLE_CLIENT_ID/SECRET` | Optional | Google OAuth |
| `GITHUB_CLIENT_ID/SECRET` | Optional | GitHub OAuth |
| `STRIPE_WEBHOOK_SECRET` | Optional locally | Use Stripe CLI for local webhooks |

Environment variables are validated at startup via `src/env.ts`. Set `SKIP_ENV_VALIDATION=true` only for CI builds without secrets.

### 3. Set up the database

```bash
npm run db:migrate    # Apply migrations
npm run db:seed       # Seed sample listings
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Google OAuth in production

1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create (or edit) an OAuth 2.0 Web client.
2. Add **Authorized JavaScript origins**: `https://YOUR_DOMAIN`
3. Add **Authorized redirect URIs**: `https://YOUR_DOMAIN/api/auth/callback/google`
4. In Vercel (or your host), set:
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `AUTH_URL=https://YOUR_DOMAIN` (optional but recommended)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
5. Redeploy after saving env vars.

If Google sign-in still fails with `redirect_uri_mismatch`, the redirect URI in Google Cloud does not exactly match your live callback URL.

### Flights in production (Duffel test mode)

Use a Duffel **test access token** in production — no separate environment or SDK switch is required:

```bash
DUFFEL_ACCESS_TOKEN=duffel_test_xxxxxxxx
```

Test tokens call the same Duffel API with sandbox data and are intended for deployed demos. Do **not** set `USE_DEMO_FLIGHTS=true` unless you want to bypass Duffel entirely and show seeded database sample flights.

If `DUFFEL_ACCESS_TOKEN` is missing or the API fails, the app falls back to seeded sample flights automatically.

### Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:migrate:deploy` | Deploy migrations (production) |
| `npm run db:push` | Push schema changes without migration |
| `npm run db:seed` | Seed the database |

## Route Overview

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Stays landing page |
| `/flights`, `/cars`, `/things` | Public | Vertical landing pages |
| `/stays-category`, `/flights-category`, etc. | Protected | Search results |
| `/checkout/[listingId]` | Protected | Stripe checkout |
| `/my-bookings` | Protected | Booking history |
| `/messages` | Protected | User messaging |
| `/profile/[userId]` | Protected | User profiles |
| `/account-settings` | Protected | Account management |
| `/auth/login`, `/auth/register` | Public | Authentication |

## Architecture Notes

- **Data layer** — `src/data/` holds Prisma queries; server actions in `src/actions/` call into it
- **Search state** — Client-side Zustand stores hold search form state; URL params are the source of truth on category pages
- **Flight offers** — Duffel results are cached in the `FlightOffer` table (~45 min TTL) and reused at checkout
- **Auth** — Middleware protects `(protected)` routes; JWT sessions with Prisma adapter

## Roadmap

Planned improvements (not yet implemented):

- Duffel order creation after successful Stripe payment (optional; demo fares are enough for now)
