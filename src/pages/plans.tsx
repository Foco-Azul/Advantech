import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC}`);
export default function Plans() {
    return (
        <div>
            <h1>Plans</h1>
            <Elements stripe={stripe}>
                <CardElement id="card-element" />
            </Elements>
        </div>
    );
}
