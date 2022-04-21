import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function Home() {
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
            Get access to all the publications <br />{" "}
            <span>for $9.90 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </div>
  );
}
