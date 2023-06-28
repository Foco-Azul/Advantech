import "./globals.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import type { AppProps } from "next/app";

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC}`);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Elements stripe={stripe}>
                <Component {...pageProps} />
            </Elements>
        </>
    )
}
