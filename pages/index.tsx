import type { NextPage } from 'next';
import Head from 'next/head';
import BuyFollowers from '../components/BuyFollowers/BuyFollowers';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
        <title>Buy Activity</title>
      </Head>
      <BuyFollowers />
    </div>
  );
};

export default Home;
