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
  planActual: number | null;
  planvencimiento: number;
  uservencimiento: string | number | null;
  userid: number | null;
  userCorreo: string | null;
  nombres: string;
  razonSocial: string;
  rucCedula: string;
  direccion: string;
  telefono: string;
  email: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, userid, plan, creditos, userCredits, planid, planActual, planvencimiento, uservencimiento,  userCorreo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, error, isLoading } = useUser();
  const [payerror, setPayerror] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [nombres, setNombres] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [rucCedula, setRucCedula] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState(userCorreo || '');

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
          amount: (Number(price.toFixed(2)) * 100),
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
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setShowForm(false);
        setShowPaymentButton(false);
        setPaymentSuccess(true); // Actualiza el estado para indicar que el pago fue exitoso

        if (userCredits === null) {
          userCredits = 0;
        }

        var fechaActual = new Date();
        if (uservencimiento !== null) {
          var uservencimiento_data = new Date(uservencimiento);
          var diferenciaEnMeses =
            (uservencimiento_data.getFullYear() - fechaActual.getFullYear()) * 12 +
            (uservencimiento_data.getMonth() - fechaActual.getMonth());  
          if(planvencimiento > diferenciaEnMeses || diferenciaEnMeses < 0){
            var mesesASumar = planvencimiento;
            fechaActual.setMonth(fechaActual.getMonth() + mesesASumar);
            var fechaVencimiento = fechaActual.toISOString();
          }else{
            var fechaVencimiento = uservencimiento_data.toISOString();
          }
        }else{
          var mesesASumar = planvencimiento;
          fechaActual.setMonth(fechaActual.getMonth() + mesesASumar);
          var fechaVencimiento = fechaActual.toISOString();
        }
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                plan: (planActual !== 4 && planid === 4) ? planActual : planid,
               creditos: creditos + userCredits,
                vencimiento: fechaVencimiento,
                estaactivo: true
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
                  consulta:"",
                  tipo: "compra",
                  factura: {
                    nombres: nombres,
                    razonSocial: razonSocial,
                    rucCedula: rucCedula,
                    direccion: direccion,
                    telefono: telefono,
                    email: email,
                  },  
                },
              }
              ),
              cache: "no-store",
            }
          );
          if(planActual == planid || planid == 4){
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
                    contenido: `${plan};${creditos};${fechaVencimiento}`,
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
          setTimeout(() => {
            //window.location.href = "/busqueda";
          }, 2000);
        } else {
          throw new Error(`Failed to create user, ${postResponse.status}`);
        }
      }
    }
  };

  return (
    <div data-testid="checkout-form">
      {paymentSuccess == false && <><p>Coloca los datos de facturación</p><br></br></>}
      <form onSubmit={handleSubmit} >
        {showForm && (
          <div onMouseEnter={handleCardSectionFocus} >
            <div className='facturacion'>
              <div className='campo'>
                <label htmlFor="nombres">Nombres:</label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder='Nombres'
                  required  
                />
              </div>

              <div className='campo'>
                <label htmlFor="razonSocial">Razon Social:</label>
                <input
                  type="text"
                  id="razonSocial"
                  name="razonSocial"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder='Razon Social'
                  required  
                />
              </div>

              <div className='campo'>
                <label htmlFor="rucCedula">Ruc/Cédula:</label>
                <input
                  type="text"
                  id="rucCedula"
                  name="rucCedula"
                  value={rucCedula}
                  onChange={(e) => setRucCedula(e.target.value)}
                  placeholder='Ruc/Cédula'
                  required  
                />
              </div>

              <div className='campo'>
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder='Dirección'
                  required  
                />
              </div>

              <div className='campo'>
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder='Teléfono'
                  required  
                />
              </div>

              <div className='campo'>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required  
                />
              </div>
            </div>
            <div className='tarjeta-pago'>  
              <p>Coloca los datos de tu tarjeta</p>
              <br />
              <CardSection />
            </div>
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
