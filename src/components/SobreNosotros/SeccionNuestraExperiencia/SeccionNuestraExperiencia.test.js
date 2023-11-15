import React from 'react';
import { render, screen } from '@testing-library/react';
import NuestraExperiencia from './SeccionNuestraExperiencia';

describe('NuestraExperiencia Component', () => {
  test('renders NuestraExperiencia component correctly', () => {
    render(<NuestraExperiencia />);

    // Check if the title, subtitle, and text are present
    expect(screen.getByText('Nuestra Experiencia')).toBeInTheDocument();
    expect(screen.getByText('Combinamos la estructura, disciplina y demanda de las más exitosas corporaciones mundo')).toBeInTheDocument();
    expect(screen.getByText('Advantech fue creada en 2004 para brindar servicios de consultoría innovadora a compañías que buscan mejorar sus procesos, gerencia de proyectos y gestión de recursos humanos, posee una amplia gama de experiencias a nivel local e internacional.')).toBeInTheDocument();
  });
});
