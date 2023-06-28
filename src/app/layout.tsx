import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <head>
        <script
          async
          src="https://js.stripe.com/v3/pricing-table.js">
        </script>
      </head>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
}
