import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <link rel='icon' href='/assets/images/sonrisa_yellow_circle.png' />
          <link rel='apple-touch-icon' href='/sonrisa_yellow_circle.jpg' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro&family=Dancing+Script&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
