# Mutfak Software

**Restaurant feedback, reputation management, and review automation SaaS platform.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-SDK-412991?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

## Overview

Mutfak Software is a full-stack SaaS product for restaurants and hospitality teams that want to collect customer feedback through QR codes, understand sentiment, and route happy customers toward public review platforms.

The app combines customer-facing feedback flows, business dashboards, AI-assisted review analysis, payment integrations, and communication tools in a tenant-aware Next.js application.

## Features

- **QR feedback journeys** - Table or venue-specific QR codes for quick customer feedback
- **Review routing** - Capture negative feedback internally and guide positive feedback to public platforms
- **Multi-tenant workspace** - Isolated business data, users, plans, settings, and dashboards
- **AI assistance** - OpenAI-powered sentiment analysis and response suggestions
- **Authentication** - NextAuth.js, JWT sessions, and password hashing with bcrypt
- **Payments** - Stripe and Iyzico integration points for subscription and billing flows
- **Messaging** - Email and SMS/WhatsApp-ready integrations through Nodemailer and Twilio
- **Analytics dashboard** - Reputation metrics, feedback trends, and operational insights

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router, React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS, Radix UI, Headless UI |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth.js, JWT, bcryptjs |
| AI | OpenAI SDK |
| Payments | Stripe, Iyzico |
| Messaging | Twilio, Nodemailer |
| Deployment | Docker, Railway-ready scripts |

## Getting Started

```bash
git clone https://github.com/umitaltinozzz/mutfak-software.git
cd mutfak-software
npm install
cp env.template .env.local
npm run dev
```

Open [http://localhost:3003](http://localhost:3003).

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on port 3003 |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server on port 3003 |
| `npm run lint` | Run Next.js linting |
| `npm run db:push` | Push Prisma schema changes |
| `npm run db:studio` | Open Prisma Studio |

## Environment

Copy `env.template` to `.env.local` and fill in database, auth, payment, AI, and messaging credentials required by your deployment.

Never commit `.env.local` or production secrets.

## Project Notes

This repository is product-focused and includes integrations that should be configured per deployment. Review tenant isolation, payment webhooks, and external review links before using it in production.

## License

[MIT License](./LICENSE)