import React from 'react';
import { render, screen } from '@testing-library/react';
import SeccionContactanos from './SeccionContactanos';

test('Renderiza correctamente la sección de Contactanos', () => {
  render(<SeccionContactanos />);

  // Verifica que los elementos esperados estén presentes en la sección
  expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  expect(screen.getByText('Ponte en contacto con nuestro equipo')).toBeInTheDocument();
  expect(screen.getByText('Envíanos un correo electrónico haciendo clic en el ícono de la izquierda o al correo')).toBeInTheDocument();
  expect(screen.getByText('Envíanos un mensaje o realiza una llamada haciendo clic en el ícono de la izquierda o al número')).toBeInTheDocument();

  // Puedes seguir agregando más expectativas según tus necesidades
});

// Agrega más pruebas según sea necesario para cubrir otros casos de uso del componente.
test('Los enlaces tienen el atributo target="_blank"', () => {
    render(<SeccionContactanos />);
  
    const links = screen.getAllByRole('link');
  
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });