<div align="center">

# Mutfak Yazilim

**Restaurant reputation management SaaS platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

</div>

---

## Overview

A full-stack **SaaS web application** for restaurants and hospitality businesses to collect customer feedback via QR codes, manage online reputation, and drive positive reviews to platforms like Google and Yemeksepeti.

## Features

- **QR-based feedback flow** — Table-specific QR codes let customers leave feedback in seconds
- **Multi-tenant architecture** — Each business has isolated data, users, and settings
- **Reputation management** — Capture negative reviews internally; redirect positive ones outward
- **AI integration** — OpenAI SDK for sentiment analysis and automated response suggestions
- **Authentication** — NextAuth.js with JWT + bcrypt
- **Payments** — Stripe and Iyzico integration

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS, Radix UI |
| Database | Prisma ORM, PostgreSQL |
| Auth | NextAuth.js |
| AI | OpenAI SDK (GPT-4) |
| Comms | Twilio, Nodemailer |
| Mobile | React Native / Expo |
| Deployment | Docker, Railway |

## Getting Started

`ash
git clone https://github.com/umitaltinozzz/mutfak-yazilim.git
cd mutfak-yazilim
npm install
cp env.template .env.local
npm run dev
`

Open **[http://localhost:3003](http://localhost:3003)**.

## License

MIT
