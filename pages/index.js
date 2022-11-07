import Head from "next/head";
import styles from "../styles/Home.module.css";

const environment = {
    production: false,
    PARTNER_ID: 'P1637497049083',
    AppId: 'App-Id',
    GOOGLE_KEY: 'AIzaSyB6RgF7vmUE0mjk_glikiuuSmpGpaNiA24',
    IO: 'http://192.168.19.32:5000',
    ORDER: 'Current-Order-Id',
    BACKEND: 'http://192.168.19.32:5000/',
    customerDataName: 'Customer-Data',
    driverDataName: 'Driver-Data',
    FACEBOOK_LOGIN_APPID: '2770390493238875',
    FACEBOOK_APP_SECRET: '92459f085b5499b5c1d0e41aa3c1051',
};

const Home = async () => {

    // Prepare the data to be sent to the OZOW API ENDPOINT
    const NGROK_TEST_BACKEND = 'https://c751-41-116-104-238.ngrok.io/';

    const OZOW_API_DATA = {
        siteCode: 'TSTSTE0001',
        countryCode: 'ZA',
        currencyCode: 'ZAR',
        amount: this.basket.basketSummary.totalPayment.toFixed(2).toString(),
        transactionReference: environment.PARTNER_ID,
        bankReference: environment.PARTNER_ID,
        registerTokenProfile: true,
        tokenNotificationUrl: [environment.BACKEND, 'token-registration'].join(
            ''
        ),
        tokenDeletedNotificationUrl: [environment.BACKEND, 'token-delete'].join(
            ''
        ),
        cancelUrl: [
            environment.production ? environment.BACKEND : NGROK_TEST_BACKEND,
            'payment-status?status=cancel',
        ].join(''),
        errorUrl: [
            environment.production ? environment.BACKEND : NGROK_TEST_BACKEND,
            'payment-status?status=error',
        ].join(''),
        successUrl: [
            environment.production ? environment.BACKEND : NGROK_TEST_BACKEND,
            'payment-status?status=success',
        ].join(''),
        notifyUrl: [
            environment.production ? environment.BACKEND : NGROK_TEST_BACKEND,
            'payment-status?status=notify',
        ].join(''),
        optional1: this.data.id,
        isTest: true,
    };

// Make a lowercase string of all the data items to send them to Ozow
    const hashCheckBefore = [
        OZOW_API_DATA.siteCode,
        OZOW_API_DATA.countryCode,
        OZOW_API_DATA.currencyCode,
        OZOW_API_DATA.amount,
        OZOW_API_DATA.transactionReference,
        OZOW_API_DATA.bankReference,
        OZOW_API_DATA.optional1,
        // OZOW_API_DATA.registerTokenProfile,
        // OZOW_API_DATA.tokenNotificationUrl,
        // OZOW_API_DATA.tokenDeletedNotificationUrl,
        OZOW_API_DATA.cancelUrl,
        OZOW_API_DATA.errorUrl,
        OZOW_API_DATA.successUrl,
        OZOW_API_DATA.notifyUrl,
        OZOW_API_DATA.isTest,
        '215114531AFF7134A94C88CEEA48E',
    ]
        .join('')
        .toLowerCase();

    const hashRequest = await fetch(
        ['https://api.hashify.net/hash/sha512/hex?value=', hashCheckBefore].join(
            ''
        )
    );

    const HASH_CHECK = await hashRequest.json();
  

    return (
        <div className={styles.container}>
            <Head>
                <title>Ozow: Payment Page</title>
                <meta name="description" content="Make a Payment"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <form action="https://pay.ozow.com/" id="ozow-form">
                <input type="text" name="SiteCode" value={OZOW_API_DATA.siteCode} hidden/>
                <input type="text" name="CountryCode" value={OZOW_API_DATA.countryCode} hidden/>
                <input type="text" name="CurrencyCode" value={OZOW_API_DATA.currencyCode} hidden/>
                <input type="text" name="Amount" value={OZOW_API_DATA.amount} hidden/>
                <input type="text" name="TransactionReference" value={OZOW_API_DATA.transactionReference} hidden/>
                <input type="text" name="BankReference" value={OZOW_API_DATA.bankReference} hidden/>
                <input type="text" name="Optional1" value={OZOW_API_DATA.optional1} hidden/>
                <input type="text" name="CancelUrl" value={OZOW_API_DATA.cancelUrl} hidden/>
                <input type="text" name="ErrorUrl" value={OZOW_API_DATA.errorUrl} hidden/>
                <input type="text" name="SuccessUrl" value={OZOW_API_DATA.successUrl} hidden/>
                <input type="text" name="NotifyUrl" value={OZOW_API_DATA.notifyUrl} hidden/>
                <input type="text" name="IsTest" value={OZOW_API_DATA.isTest} hidden/>
                <input type="text" name="HashCheck" value={HASH_CHECK.Digest} hidden/>
                <input type="submit" value="Pay Now" />
            </form>


        </div>
    );
};

export default Home;
