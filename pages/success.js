import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Success = ({ transactionReference }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ozow: Success Page</title>
        <meta name="description" content="Transaction was successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <strong>Payment Successful</strong>
      <br/>
      <Link
        href={{
          pathname: "/status",
          query: { transactionReference: transactionReference },
        }}
      >
        Check Status of the Payment
      </Link>

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
Success.getInitialProps = (context) => {
  const { query } = context;
  return { transactionReference: query.transactionReference };
};

export default Success;
