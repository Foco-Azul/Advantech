import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import './plans.css'
import Pasarela from '../components/Pasarela/Pasarela';
import CreditComponent from "@/components/Credits/CreditComponent";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export default function Plans() {
    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC}`);

    const createPayment = async () => {
        const res = await fetch("/api/intent", {
            method: "POST",
            body: JSON.stringify({
                amount: 1000,
                description: "pago de datos"
            }),
        });
        const data = await res.json();
        console.log(data);
        confirmPayment(data.client_secret);
    };



    const confirmPayment = async (clientSecret: string) => {
        const stripe = await stripePromise;
        console.log("stripe:", stripe)
        const elements = stripe?.elements();
        console.log("elements:", elements)
        const cardElement = elements?.getElement(CardElement);
        console.log("cardElement:", cardElement)

        if (stripe && cardElement) {
            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                console.error(error);
                // Manejar el error apropiadamente
            } else {
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: "Gian",
                            email: "gianfocoazul@focoazul.coom"
                        },
                    },
                });
                console.log(result);
                console.log(token);

                if (result?.paymentIntent?.status === 'succeeded') {
                    console.log('Pago efectuado correctamente');
                }
            }
        } else {
            console.log("no encuentra una card")
        }
    };



    return (
        <div id="container-card-element">
            <h1>Planes flexibles que se adaptan a tu necesidad de datos</h1>
            <br></br>
            <UserProvider>
                <CreditComponent></CreditComponent>
            </UserProvider>
            <br></br>
        </div>
    );
}


const cardStyle = {
    style: {
        base: {
            color: "white",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#c4c1d0",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};
