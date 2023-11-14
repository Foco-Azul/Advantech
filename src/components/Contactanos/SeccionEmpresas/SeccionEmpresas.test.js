import React from 'react';
import { render, screen } from '@testing-library/react';
import SeccionEmpresas from './SeccionEmpresas';

describe('SeccionEmpresas', () => {
  test('Muestra el título correctamente', () => {
    render(<SeccionEmpresas />);
    const titulo = screen.getByText('Ellos confían en nuestros servicios');
    expect(titulo).toBeInTheDocument();
  });

  test('Muestra las imágenes de las empresas con atributo "alt"', () => {
    render(<SeccionEmpresas />);
    
    // Seleccionar todas las imágenes
    const imagenes = screen.getAllByRole('img');

    imagenes.forEach((imagen) => {
      expect(imagen).toHaveAttribute('alt');
    });
  });
});
