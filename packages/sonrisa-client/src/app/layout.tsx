import type { Metadata } from 'next';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Sonrisa Donuts',
  description:
    'Handmade Brioche Donuts. Fresh and Local Ingredients. Made in Seattle, WA.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://sonrisadonuts.com'
  ),
  openGraph: {
    title: 'Sonrisa Donuts',
    description:
      'Handmade Brioche Donuts. Fresh and Local Ingredients. Made in Seattle, WA.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="icon" href="/assets/images/sonrisa_yellow_circle.png" />
        <link rel="apple-touch-icon" href="/sonrisa_yellow_circle.jpg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro&family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
