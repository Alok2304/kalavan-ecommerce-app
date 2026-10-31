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
# Payments and invoices

Online checkout uses Razorpay Checkout for INR payments. The server creates each order from the product catalog and verifies Razorpay's payment signature and captured payment before showing the invoice.

1. Create a Razorpay account and copy its **test mode** Key ID and Key Secret into `.env.local` (see `.env.example`). Never expose the secret with a `NEXT_PUBLIC_` prefix.
2. In Razorpay Dashboard, enable automatic payment capture so successful checkouts reach the captured state.
3. Start the app with `npm run dev` and complete a test-mode payment. Use live Razorpay keys only after the account is activated and the production domain is configured.
4. Optionally set `INVOICE_BUSINESS_NAME`, `INVOICE_BUSINESS_ADDRESS`, and `INVOICE_GSTIN` for the seller details shown on the invoice.

After a verified captured payment, the customer reaches `/invoice`, where **Print / Save as PDF** creates a downloadable invoice. Razorpay order notes hold the minimal checkout details needed to retrieve the invoice, so this implementation does not require an order database. Keep Razorpay order records available for the lifetime of your accounting retention requirements.

The generated document is a payment invoice/receipt. It does not create a GST e-invoice with an IRN or signed QR code, calculate GST, or submit data to the Indian Invoice Registration Portal. Those features require the seller's tax setup and an authorized IRP integration.
