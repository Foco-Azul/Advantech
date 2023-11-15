import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SeccionUsoDeDatos from './SeccionUsoDeDatos';

describe('SeccionUsoDeDatos Component', () => {
  test('Se renderiza SeccionUsoDeDatos como default "FINANZAS"', () => {
    render(<SeccionUsoDeDatos />);

    expect(screen.getByText('Uso de datos en Finanzas')).toBeInTheDocument();
    expect(screen.getByText('Evaluación crediticia')).toBeInTheDocument();
  });

  test('Se renderiza correctamente "RECURSOS HUMANOS" cuando es clickeado', () => {
    render(<SeccionUsoDeDatos />);

    fireEvent.click(screen.getByText('RECURSOS HUMANOS'));

    expect(screen.getByText('Uso de datos en RRHH')).toBeInTheDocument();
    expect(screen.getByText('Evaluación de personal')).toBeInTheDocument();
  });

});
