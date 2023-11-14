import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionBusquedas from './SeccionBusquedas';

describe('SeccionBusquedas', () => {
  test('Renderiza la sección de busquedas correctamente', () => {
    render(<SeccionBusquedas />);
    // Verifica que los elementos de la sección estén presentes
    expect(screen.getByText('BUSQUEDA SIMPLE')).toBeInTheDocument();
    expect(screen.getByText('BUSQUEDA POR LOTE')).toBeInTheDocument();
    expect(screen.getByText('Guia para realizar una busqueda simple')).toBeInTheDocument();
    expect(screen.getByText('Obteniendo datos de una persona')).toBeInTheDocument();
    expect(screen.getByText('Guia para realizar una busqueda por lote')).toBeInTheDocument();
    expect(screen.getByText('Obteniendo datos de multiples personas')).toBeInTheDocument();
  });
});
