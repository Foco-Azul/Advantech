import React from 'react';
import { render, screen } from '@testing-library/react';
import Producto from './SeccionProducto';

describe('Producto Component', () => {
  test('Renderiza Advantech Datos Producto correspondientemente', () => {
    render(<Producto />);

    // Check if the Advantech Datos product card is rendered
    expect(screen.getByText('Advantech Datos')).toBeInTheDocument();
    expect(screen.getByText('Consulta los datos públicos de cualquier persona o entidad')).toBeInTheDocument();
    // Add more assertions as needed

    // Check if the "Realiza una consulta" link is present and has the correct href
    const consultaLink = screen.getByRole('link', { name: /realiza una consulta/i });
    expect(consultaLink).toBeInTheDocument();
    expect(consultaLink).toHaveAttribute('href', '/busqueda');
  });

  test('renders "Elige un plan a tu medida" correspondientemente', () => {
    render(<Producto />);

    // Check if the "Elige un plan a tu medida" product card is rendered
    expect(screen.getByText('Elige un plan a tu medida')).toBeInTheDocument();
    expect(screen.getByText('Alianzas estratégicas complementan nuestra oferta de servicios')).toBeInTheDocument();
    // Add more assertions as needed

    // Check if the "Nuestros planes" link is present and has the correct href
    const planesLink = screen.getByRole('link', { name: /nuestros planes/i });
    expect(planesLink).toBeInTheDocument();
    expect(planesLink).toHaveAttribute('href', '/planes');
  });
});
