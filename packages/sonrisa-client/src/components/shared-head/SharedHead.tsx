import Head from 'next/head';

export const SharedHead = () => {
  return (
    <Head>
      <title>Sonrisa Donuts</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#000000' />
      <meta
        name='description'
        content='Handmade Brioche Donuts. Fresh and Local Ingredients. Made in Seattle, WA.'
      />
      <link rel='icon' href='%PUBLIC_URL%/sonrisa_yellow_circle.png' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro&family=Dancing+Script&display=swap'
        rel='stylesheet'
      />
      <link rel='apple-touch-icon' href='%PUBLIC_URL%/sonrisa_logo.jpg' />
      <link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
      <script
        type='text/javascript'
        src='https://web.squarecdn.com/v1/square.js'
      ></script>
    </Head>
  );
};
