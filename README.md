This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Checkout

Checkout uses Cash on Delivery. The server validates each cart against the live Supabase catalog and stores the order and delivery details in the `orders` table. Apply `supabase/migrations/202611030003_cash_on_delivery_orders.sql` after the catalog and RBAC migrations. Set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`; it is used only by server routes for orders and profile/role management and must never use a `NEXT_PUBLIC_` prefix.

## Supabase catalog and profiles

The product catalog and artisan directory are stored in the remote Supabase PostgreSQL database and read through its PostgREST API. Apply `supabase/migrations/202611030001_initial_schema.sql` in the Supabase SQL Editor (or with the Supabase CLI) to create the tables, read policies, and seed the current catalog. Store `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` using `.env.example` as a guide. The catalog now reports connection/configuration errors instead of silently showing bundled sample products.

### Website feedback

Apply `supabase/migrations/202611040001_website_feedback.sql` in the Supabase SQL Editor to create the feedback table. Feedback submissions use the public Supabase key with an insert-only row-level security policy; feedback cannot be read by public clients. No service role key is required for feedback submissions.

In Clerk, add a webhook pointing to `/api/webhooks/clerk` and subscribe to `user.created`, `user.updated`, and `user.deleted`. Set its signing secret as `CLERK_WEBHOOK_SIGNING_SECRET`. Clerk remains the authentication provider; the `profiles` table mirrors the user's Clerk ID, primary email, display name, and avatar URL.

### Roles and access control

Apply `supabase/migrations/202611030002_rbac.sql` after the initial schema. Profiles default to `customer`. Set `CLERK_ADMIN_USER_IDS` to a comma-separated list of trusted Clerk user IDs; webhook profile sync grants those users the `admin` role. Admins can assign `customer` or `artisan` plus an artisan record using `PATCH /api/admin/users/{clerkUserId}/role` with `{ "role": "artisan", "artisanId": "<artisan UUID>" }`. Admin assignment is intentionally limited to the server-side allowlist. The `/admin` and `/artisan` pages and the role-management API enforce access on the server. Profile data and role assignments are inaccessible to browser Supabase clients.
