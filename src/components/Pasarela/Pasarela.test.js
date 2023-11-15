import { render, screen } from '@testing-library/react';
import Pasarela from './Pasarela';
import { UserProvider } from '@auth0/nextjs-auth0/client';

test('renders Pasarela component with CheckoutForm inside', () => {
  // Mock the environment variable
  process.env.NEXT_PUBLIC_STRIPE_KEYS_PUBLIC = 'your-test-publishable-key';

  const mockProps = {
    price: 10,
    plan: 'your-plan',
    userid: 1,
    creditos: 5,
    planvencimiento: 30,
    userCredits: 3,
    planid: 2,
    userCorreo: 'test@example.com',
  };

  render(<UserProvider><Pasarela {...mockProps} /></UserProvider>);

  // Replace 'CheckoutForm' with the actual display name of your CheckoutForm component
  const checkoutFormElement = screen.getByTestId('checkout-form'); 

  expect(checkoutFormElement).toBeInTheDocument();
});
