import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Head from "next/head";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Head>
        <script
          async
          src="https://js.stripe.com/v3/pricing-table.js">
        </script>
      </Head>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
}
