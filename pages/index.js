import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import generateSignature from "../snippets/generateSignature";

const Home = () => {

  const transactionReference = "Ozow Test Transaction"; // String (50), The reference for this transaction

  // This needs to be generated from your application
  var data = {
    // Merchant details
    merchantSiteCode: process.env.NEXT_PUBLIC_SITE_CODE, // String (50), A unique code for the site currently in use. A site code is generated when adding a site in the Ozow Merchant Admin section.
    merchantCountryCode: "ZA", // String (2),  The ISO 3166-1 alpha-2 code for the user’s country. The country code will determine which banks will be displayed to the customer. Please note only South African (ZA) banks are currently supported by Ozow.
    merchantCurrencyCode: "ZAR", // String (3),  The ISO 4217 3 letter code for the transaction currency. Please note only South African Rand (ZAR) is currently supported by Ozow, so any currency conversion would have to take place before posting to the Ozow site.

    // Buyer details
    amount: "100.00", // Decimal (9,2), The transaction amount. The amount is in the currency specified by the currency code posted.
    transactionReference: transactionReference, // String (50), The merchant’s reference for the transaction
    bankReference: "Ozow Payment", // String (20), The reference that will be prepopulated in the “their reference” field in the customer's online banking site. This will be the payment reference that appears on your transaction history.
    optional1: "", // String (50), Optional fields the merchant can post for additional information they would need passed back in the response. These are also stored with the transaction details by Ozow and can be useful for filtering transactions in the merchant admin section.
    optional2: "", // String (50), Optional fields the merchant can post for additional information they would need passed back in the response. These are also stored with the transaction details by Ozow and can be useful for filtering transactions in the merchant admin section.
    optional3: "", // String (50), Optional fields the merchant can post for additional information they would need passed back in the response. These are also stored with the transaction details by Ozow and can be useful for filtering transactions in the merchant admin section.
    optional4: "", // String (50), Optional fields the merchant can post for additional information they would need passed back in the response. These are also stored with the transaction details by Ozow and can be useful for filtering transactions in the merchant admin section.
    optional5: "", // String (50), Optional fields the merchant can post for additional information they would need passed back in the response. These are also stored with the transaction details by Ozow and can be useful for filtering transactions in the merchant admin section.
    customer: "Customer # 5123", // String (100),  The customer's name or identifier.

    // Site details
    cancelUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`, // String (50), The Url that we should post the redirect result to if the customer cancels the payment, this will also be the page the customer gets redirect back to. This Url can also be set for the applicable merchant site in the merchant admin section. If a value is set in the merchant admin and sent in the post, the posted value will be redirected if the payment is cancelled.
    errorUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/error`, // String (150),  The Url that we should post the redirect result to if an error occurred while trying to process the payment, this will also be the page the customer gets redirect back to. This Url can also be set for the applicable merchant site in the merchant admin section. . If a value is set in the merchant admin and sent in the post, the posted value will be redirected to if an error occurred while processing the payment.
    successUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/success?transactionReference=${transactionReference}`, // String (150),  The Url that we should post the redirected result to if the payment was successful, this will also be the page the customer gets redirect back to. This Url can also be set for the applicable merchant site in the merchant admin section. If a value is set in the merchant admin and sent in the post, the posted value will be redirected if the payment was successful. Please note that it would not be sufficient to assume the payment was successful just because the customer was redirected back to this page, it’s highly recommended the you check the response fields and check the transaction status using our check transaction status API call.
    notifyUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/api/register`, // String (150),  	The Url that we should post the notification result to. The result will be posted regardless of the outcome of the transaction. This Url can also be set for the applicable merchant site in the merchant admin section. If a value is set in the merchant admin and sent in the post, the notification result will be sent to the posted value. Find out more in the notification response section in step 2.
    isTest: process.env.NEXT_PUBLIC_TEST, // bool, Send true to test your request posting and response handling. If set to true you will be redirected to a page where you can select whether you would like a successful or unsuccessful redirect response sent back. Please note that notification responses are not sent for test transactions and the online banking payment is skipped. Accepted values are true or false.
  };
  data["hashCheck"] = generateSignature(data); // String (250),  	SHA512 hash used to ensure that certain fields in the message have not been already after the hash was generated. Check the generate hash section below for more details on how to generate the hash.
  //TODO: save data to db
  return (
    <div className={styles.container}>
      <Head>
        <title>Ozow: Payment Page</title>
        <meta name="description" content="Make a Payment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form action={"https://pay.ozow.com"} method="post">
        {/* Merchant Details */}
        <input
          type="hidden"
          name="merchantSiteCode"
          value={data.merchantSiteCode}
        />
        <input
          type="hidden"
          name="merchantCountryCode"
          value={data.merchantCountryCode}
        />
        <input
          type="hidden"
          name="merchantCurrencyCode"
          value={data.cancel_url}
        />
        {/* Buyer details */}
        <input type="hidden" name="amount" value={data.amount} />
        <input
          type="hidden"
          name="transactionReference"
          value={data.transactionReference}
        />
        <input type="hidden" name="bankReference" value={data.bankReference} />
        <input type="hidden" name="optional1" value={data.optional1} />
        <input type="hidden" name="optional2" value={data.optional2} />
        <input type="hidden" name="optional3" value={data.optional3} />
        <input type="hidden" name="optional4" value={data.optional4} />
        <input type="hidden" name="optional5" value={data.optional5} />
        <input type="hidden" name="customer" value={data.customer} />
        {/* Site details */}
        <input name="cancelUrl" type="hidden" value={data.cancelUrl} />
        <input name="errorUrl" type="hidden" value={data.errorUrl} />
        <input name="successUrl" type="hidden" value={data.successUrl} />
        <input name="notifyUrl" type="hidden" value={data.notifyUrl} />
        <input name="isTest" type="hidden" value={data.isTest} />
        <input name="hashCheck" type="hidden" value={data.hashCheck} />
        {/* Submit */}
        <input type="submit" value="Pay Now" />
      </form>

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

export default Home;
