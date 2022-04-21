import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from "../styles/Home.module.scss";
import { GetServerSideProps, GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: Number;
  };
}

export default function Home({ product }: HomeProps) {
  console.log(product);

  return (
    <div>
      <Head>
        <title>Inicio |ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Kr6PCHN4kjuy5s0YJi7RkU7", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  console.log("PRODUCT:", product, price);

  return {
    props: { product },
  };
};
