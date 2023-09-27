import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { useUser } from '@auth0/nextjs-auth0/client';
import './CheckoutForm.css';
import CircularProgress from '@mui/material/CircularProgress';

interface CheckoutFormProps {
  price: number;
  plan: string;
  creditos: number;
  userCredits: number | null;
  planid: number | null;
  planvencimiento: number;
  userid: number | null;
  userCorreo: string | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, userid, plan, creditos, userCredits, planid, planvencimiento, userCorreo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, error, isLoading } = useUser();
  const [payerror, setPayerror] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCardSectionFocus = () => {
    setPayerror(null);
  };

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
        setPaymentSuccess(true); // Actualiza el estado para indicar que el pago fue exitoso

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
          const posthistorial = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  auth_0_user: userid,
                  creditos: creditos,
                  fecha: fechaActual,
                  precio: price,
                  plane: planid,
                  consulta:""
                },
              }
              ),
              cache: "no-store",
            }
          );
          if(planid==4){
            const postResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/correo-enviados`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
                },
                body: JSON.stringify({
                  data: {
                    nombre: userCorreo,
                    asunto: "Compra de creditos",
                    para: userCorreo,
                    contenido: "creditos:"+creditos,
                  },
                }),
                cache: "no-store",
              }
            );
          }else{
            const postResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/correo-enviados`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
                },
                body: JSON.stringify({
                  data: {
                    nombre: userCorreo,
                    asunto: "Nueva suscripción",
                    para: userCorreo,
                    contenido: `${plan};${creditos};${fechaVencimiento}`,
                  },
                }),
                cache: "no-store",
              }
            );
          }
          console.log("Usuario actualizado con éxito.");

          // Redirect to "/busqueda" after 2 seconds
          setTimeout(() => {
            //window.location.href = "/busqueda";
          }, 2000);
        } else {
          console.log(postResponse.status);
          throw new Error(`Failed to create user, ${postResponse.status}`);
        }
      }
    }
  };

  return (
    <div>
      {paymentSuccess == false && <><p>Coloca los datos de tu tarjeta</p><br></br></>}
      <form onSubmit={handleSubmit} >
        {showForm && (
          <div onMouseEnter={handleCardSectionFocus} >
            <CardSection />
          </div>
        )}
        <br></br>
        {payerror && (
          <div className='payerror'>
            {payerror}
          </div>
        )}
        {paymentSuccess && ( // Muestra el div verde si el pago fue exitoso
          <div style={{ color: 'green' }}>
            El pago fue exitoso
          </div>
        )}
        {!loading && showPaymentButton && (
          <div className='checkoutform-container-button'>
            <button disabled={!stripe} className='checkoutform-button'>Confirmar pago de ${price.toFixed(2)}</button>
          </div>
        )}
        {loading && <CircularProgress />}
      </form>
    </div>
  );
};

export default CheckoutForm;
