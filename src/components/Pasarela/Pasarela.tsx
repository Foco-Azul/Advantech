import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Pasarela.css"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC}`);

interface PasarelaProps {
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
}

const Pasarela: React.FC<PasarelaProps> = ({ price, plan, userid, creditos, planvencimiento, uservencimiento, userCredits, planid, planActual, userCorreo }) => {
  return (
    <div className="pasarela">
      <Elements stripe={stripePromise}>
        <CheckoutForm userid={userid} price={price} plan={plan} creditos={creditos} userCredits={userCredits} planid={planid} planActual={planActual} planvencimiento={planvencimiento} uservencimiento={uservencimiento} userCorreo={userCorreo} nombres={""} razonSocial={""} rucCedula={""} direccion={""} telefono={""} email={""}/>
      </Elements>
    </div>
  );
}

export default Pasarela;
