import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionSuscripcion from './SeccionSuscripcion';

test('renders SeccionRecursos component', () => {
  render(<SeccionSuscripcion />);

  const textoEncabezado = screen.getByText('Suscripción para obtener información de bases de datos públicas');
  expect(textoEncabezado).toBeInTheDocument();

  const textoDescripcion = screen.getByText('Advantech Datos es una suscripción que te brinda acceso a bases de datos de personas de distintas fuentes públicas.');
  expect(textoDescripcion).toBeInTheDocument();

  const imgSuscripcion = screen.getByAltText('Advantech Datos');
  expect(imgSuscripcion).toBeInTheDocument();

  const textoTipoEmpresa = screen.getByText('Planes a tu medida');
  expect(textoTipoEmpresa).toBeInTheDocument();

  const textoPlanesDescripcion = screen.getByText('Nuestros planes están preparados para que puedas lograr tus objetivos empresariales y personales. Nuestros datos son consultados de distintas fuentes públicas así nos aseguramos de brindarte datos fiables y actualizados periódicamente.');
  expect(textoPlanesDescripcion).toBeInTheDocument();

  const botonVerPlanes = screen.getByRole('button', { name: 'Ver planes de precios' });
  expect(botonVerPlanes).toBeInTheDocument();
});
