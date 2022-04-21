import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio |ig.news</title>
      </Head>

      <h1 className={styles.title}>Hello World</h1>
    </div>
  );
}
