// import { CardElement, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import './plans.css'

// const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC}`);
// export default function Plans() {
//     return (
//         <div id="container-card-element">
//             <h1>Plans</h1>
//             <Elements stripe={stripe}>
//                 <CardElement id="card-element" options={cardStyle} />
//             </Elements>

//         </div>
//     );
// }

// const cardStyle = {
//     style: {
//         base: {
//             color: "white",
//             fontSize: "16px",
//             fontSmoothing: "antialiased",
//             "::placeholder": {
//                 color: "#c4c1d0",
//             },
//         },
//         invalid: {
//             color: "#fa755a",
//             iconColor: "#fa755a",
//         },
//     },
// };

import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

function Plans() {
    // Paste the stripe-pricing-table snippet in your React component
    return (
        <stripe-pricing-table pricing-table-id="prctbl_1NO0cWBvu1rdRS6sSHbsgGrL"
            publishable-key="pk_test_51JX2c3Bvu1rdRS6s6HsHyCda8NRZBBsNV1Rk2LqgcbsX4ftqls4aZnoFs8SGKRwvUmWcNJIXRGyMMbJqmdJSjwiL000PID3J5l">
        </stripe-pricing-table>
    );
}

export default Plans;

// If using TypeScript, add the following snippet to your file as well.
