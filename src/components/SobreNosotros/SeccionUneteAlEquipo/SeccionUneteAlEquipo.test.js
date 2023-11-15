import { render, screen } from '@testing-library/react';
import SeccionUneteAlEquipo from './SeccionUneteAlEquipo';

test('renders SeccionUneteAlEquipo with button and link', () => {
  render(<SeccionUneteAlEquipo />);

  // Asegúrate de que el componente se renderice correctamente
  const tituloElement = screen.getByText(/únete al equipo/i);
  expect(tituloElement).toBeInTheDocument();

  const parrafoElement = screen.getByText(/¿Te interesa trabajar en Advantech?/i);
  expect(parrafoElement).toBeInTheDocument();

  // Verifica la presencia del botón "Envíanos tu CV"
  const botonElement = screen.getByRole('button', { name: /envíanos tu cv/i });
  expect(botonElement).toBeInTheDocument();

  // Verifica la presencia del enlace a "/unete-al-equipo"
  const enlaceElement = screen.getByRole('link', { name: /envíanos tu cv/i });
  expect(enlaceElement).toHaveAttribute('href', '/unete-al-equipo');
});
