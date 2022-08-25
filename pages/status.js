import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const siteCode = process.env.NEXT_PUBLIC_SITE_CODE;

const Status = ({ transactionReference }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([
    {
      SiteCode: "",
      CountryCode: "",
      CurrencyCode: "",
      Amount: "",
      TransactionReference: "",
      BankReference: "",
      Optional1: "",
      Optional2: "",
      Optional3: "",
      Optional4: "",
      Optional5: "",
      Customer: "",
      CancelUrl: "",
      ErrorUrl: "",
      SuccessUrl: "",
      NotifyUrl: "",
      IsTest: true,
      HashCheck: "",
    },
  ]);

  useEffect(() => {
    const res = async () =>
      await fetch(
        `https://api.ozow.com/GetTransactionByReference?siteCode=${siteCode}&transactionReference=${transactionReference}`
      );
    res();
    if (res.ok) {
      setStatus(res.body);
    } else {
      setStatus([{ status: res.ok, type: res.type, text: res.statusText }]);
    }
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ozow: Status Check Page</title>
        <meta name="description" content="Check the transaction status" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loading ? (
        <ul>
          {status.map((item) => {
            return Object.keys(item).map((key, i) => (
              <li key={i}>
                {key}:{item[key]}
              </li>
            ));
          })}
        </ul>
      ) : (
        <></>
      )}
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

Status.getInitialProps = (context) => {
  const { query } = context;
  return { transactionReference: query.transactionReference };
};
export default Status;
