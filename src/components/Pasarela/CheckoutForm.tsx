import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      // Handle the case when CardElement is null
      console.log("CardElement es nulo")
      return;
    }

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
      console.log("Data client",data.client_secret)
      return data.client_secret;
     
    };

    const result = await stripe.confirmCardPayment(await createPayment(), {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });


    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      console.log("El pago se proceso correctamente")
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}