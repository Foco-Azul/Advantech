import React from 'react';
import { render, screen } from '@testing-library/react';
import SeccionBusqueda from './SeccionBusqueda';

describe('SeccionBusqueda Component', () => {
  test('renders Advantech Datos search information correctly', () => {
    render(<SeccionBusqueda />);

    // Check if the Advantech Datos search information is rendered
    expect(screen.getByText('Búsqueda en Advantech Datos')).toBeInTheDocument();
    expect(screen.getByText('Te permite extraer gran cantidad de datos de manera rápida y eficiente')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('renders manual search information correctly', () => {
    render(<SeccionBusqueda />);

    // Check if the manual search information is rendered
    const manualSearchText = 'Tiempo y esfuerzo considerable, especialmente para grandes cantidades de datos';
    const manualSearchElements = screen.getAllByText(manualSearchText);
    
    // Choose a specific element with a more specific selector
    const specificManualSearchElement = manualSearchElements[0];

    expect(specificManualSearchElement).toBeInTheDocument();
    // Add more assertions as needed
  });
});
