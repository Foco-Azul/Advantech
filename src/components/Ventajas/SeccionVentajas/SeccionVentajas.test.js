import React from 'react';
import { render, screen } from '@testing-library/react';
import SeccionVentajas from './SeccionVentajas';

describe('SeccionVentajas Component', () => {
  test('renders SeccionVentajas component correctly', () => {
    render(<SeccionVentajas />);

    expect(screen.getByText('Ventajas de uso')).toBeInTheDocument();

    expect(screen.getByText('Optimiza tu tiempo y recursos con Advantech')).toBeInTheDocument();

    expect(screen.getByText('Podrás tomar mejores decisiones basadas en evidencia, y mejorar tu productividad y competitividad. No esperes más, prueba nuestro servicio de búsqueda de datos hoy mismo y descubre todo lo que puedes lograr.')).toBeInTheDocument();

  });

  test('renders the Advantech Datos image', () => {
    render(<SeccionVentajas />);

    const image = screen.getByAltText('Advantech Datos');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/_next/image?url=%2Fimg.jpg&w=96&q=75'); 
  });
});
