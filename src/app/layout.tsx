import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID='G-H77JWD9QJ9' />
      <body>
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>

  );
}





