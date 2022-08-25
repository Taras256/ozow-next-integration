import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Error = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ozow: Error Page</title>
        <meta name="description" content="An Error Occurred" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <strong>Something went wrong</strong> <a href="./">TRY AGAIN</a>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Error;
