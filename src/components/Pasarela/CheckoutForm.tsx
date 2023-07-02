import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { useUser } from '@auth0/nextjs-auth0/client';
import './CheckoutForm.css';

interface CheckoutFormProps {
  price: number;
  plan: string;
  creditos: number
  userCredits: number | null;
  planid: number | null;
  planvencimiento: number;
  userid: number | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, userid, plan, creditos, userCredits, planid, planvencimiento }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, error, isLoading } = useUser();
  const [payerror, setPayerror] = React.useState<string | null>(null);

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
          amount: price * 100,
          description: "Pago por plan " + plan
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log("Data client", data.client_secret)
      return data.client_secret;

    };

    const result = await stripe.confirmCardPayment(await createPayment(), {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: typeof user?.email === 'string' ? user?.email : undefined,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      setPayerror(result.error.message || null);
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      console.log("El pago se proceso correctamente")
      if (result.paymentIntent.status === 'succeeded') {

        if (userCredits === null) {
          userCredits = 0; // Set a default value or handle the null case appropriately
        }

        // Obtener la fecha actual
        var fechaActual = new Date();

        // Obtener el número de meses a sumar (planvencimiento)
        var mesesASumar = planvencimiento;

        // Sumar los meses a la fecha actual
        fechaActual.setMonth(fechaActual.getMonth() + mesesASumar);

        // Obtener el resultado en formato de fecha
        var fechaVencimiento = fechaActual.toISOString(); // Formato: "YYYY-MM-DDTHH:mm:ss.sssZ"

        // Utilizar la fechaVencimiento en tu código
        console.log(fechaVencimiento);

        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",

            },
            body: JSON.stringify({
              data: {
                plan: planid,
                creditos: creditos + userCredits,
                vencimiento: fechaVencimiento
              },
            }
            ),
            cache: "no-store",
          }
        );

        if (postResponse.status === 200) {
          console.log("Usuario actualizado con éxito.");
        } else {
          console.log(postResponse.status);
          throw new Error(`Failed to create user, ${postResponse.status}`);
        }
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
      {payerror && (
        <div className='payerror'>
          {payerror}
        </div>
      )}
      <button disabled={!stripe}>Confirmar pago de {price}</button>
    </form>
  );
}

export default CheckoutForm;