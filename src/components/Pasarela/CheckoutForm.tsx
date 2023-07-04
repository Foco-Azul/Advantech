import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { useUser } from '@auth0/nextjs-auth0/client';
import './CheckoutForm.css';

interface CheckoutFormProps {
  price: number;
  plan: string;
  creditos: number;
  userCredits: number | null;
  planid: number | null;
  planvencimiento: number;
  userid: number | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, userid, plan, creditos, userCredits, planid, planvencimiento }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, error, isLoading } = useUser();
  const [payerror, setPayerror] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setLoading(true);

    const createPayment = async () => {
      const res = await fetch("/api/intent", {
        method: "POST",
        body: JSON.stringify({
          amount: price * 100,
          description: "Pago por plan " + plan
        }),
      });
      const data = await res.json();
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

    setLoading(false);

    if (result.error) {
      setPayerror(result.error.message || null);
      setShowForm(true);
      setShowPaymentButton(true);
      console.log(result.error.message);
    } else {
      console.log("El pago se procesó correctamente");
      if (result.paymentIntent.status === 'succeeded') {
        setShowForm(false);
        setShowPaymentButton(false);

        if (userCredits === null) {
          userCredits = 0;
        }

        var fechaActual = new Date();
        var mesesASumar = planvencimiento;
        fechaActual.setMonth(fechaActual.getMonth() + mesesASumar);
        var fechaVencimiento = fechaActual.toISOString();

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
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showForm && (
        <div>
          <CardSection />
        </div>
      )}
      <br></br>
      {payerror && (
        <div className='payerror'>
          {payerror} Verifica si los datos de tu tarjeta son correctos.
        </div>
      )}
      {!loading && showPaymentButton && (
        <div>
          <button disabled={!stripe} className='checkoutform-button'>Confirmar pago de ${price}</button>
        </div>
      )}
      {loading && <div>Procesando el pago...</div>}
    </form>
  );
};

export default CheckoutForm;
