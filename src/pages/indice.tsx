import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function Indice() {
  // Paste the stripe-pricing-table snippet in your React component
  return (
    <stripe-pricing-table pricing-table-id="prctbl_1NO0cWBvu1rdRS6sSHbsgGrL"
      publishable-key="pk_test_51JX2c3Bvu1rdRS6s6HsHyCda8NRZBBsNV1Rk2LqgcbsX4ftqls4aZnoFs8SGKRwvUmWcNJIXRGyMMbJqmdJSjwiL000PID3J5l">
    </stripe-pricing-table>
  );
}

export default Indice;