import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import SeccionCreaTuCuenta from './SeccionCreaTuCuenta';


describe('SeccionCreaTuCuenta Component', () => {
  test('Renderiza correctamente cuando el usuario esta indefinido', () => {

    render(<UserProvider><SeccionCreaTuCuenta /></UserProvider>);

    // Check if the content for creating an account is rendered
    expect(screen.getByText('Crea tu cuenta gratuita')).toBeInTheDocument();
    expect(screen.getByText('Y descubre más ventajas con Advantech')).toBeInTheDocument();
    expect(screen.getByText('Aprovecha estas ventajas en tu empresa para poder destacar sobre los demás.')).toBeInTheDocument();
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
  });

});
