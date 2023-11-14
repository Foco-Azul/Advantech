import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionCreaTuCuenta from './SeccionCreaTuCuenta';

describe('SeccionCreaTuCuenta', () => {
  test('Renderiza la sección "Crea tu cuenta" correctamente', () => {
    render(<SeccionCreaTuCuenta />);
    
    // Verifica que los elementos esenciales estén presentes
    expect(screen.getByText('Crea tu cuenta gratuita')).toBeInTheDocument();
    expect(screen.getByText('Y descubre más ventajas con Advantech')).toBeInTheDocument();
    expect(screen.getByText('Aprovecha estas ventajas en tu empresa para poder destacar sobre los demás.')).toBeInTheDocument();
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
  });

});
