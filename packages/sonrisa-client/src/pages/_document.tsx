import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='%PUBLIC_URL%/sonrisa_yellow_circle.png' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro&family=Dancing+Script&display=swap'
            rel='stylesheet'
          />
          <link rel='apple-touch-icon' href='%PUBLIC_URL%/sonrisa_logo.jpg' />
          <link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
