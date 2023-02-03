import Head from 'next/head';

export const SharedHead = () => {
  return (
    <>
      <Head>
        <title>Sonrisa Donuts</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta
          name='description'
          content='Handmade Brioche Donuts. Fresh and Local Ingredients. Made in Seattle, WA.'
        />
      </Head>
    </>
  );
};
