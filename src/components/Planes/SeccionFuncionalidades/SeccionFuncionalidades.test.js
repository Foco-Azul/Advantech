
import { render, screen } from '@testing-library/react';
import SeccionFuncionalidades from './SeccionFuncionalidades';

describe('SeccionFuncionalidades Component', () => {
  it('renders content correctly', () => {
    render(<SeccionFuncionalidades />);

    // Verifica la existencia de elementos clave
    expect(screen.getByText('¿Qué incluye cada plan?')).toBeInTheDocument();
    expect(screen.getByText('Conoce más sobre cada una de nuestras funcionalidades')).toBeInTheDocument();

    // Verifica la existencia de tarjetas informativas y sus contenidos
    expect(screen.getByText('Créditos')).toBeInTheDocument();
    expect(screen.getByText('Cada registro de datos tiene un valor en créditos.')).toBeInTheDocument();
    // Añade más expectativas para verificar otros elementos en tu tarjeta informativa

    expect(screen.getByText('Tiempo de duración')).toBeInTheDocument();
    expect(screen.getByText('Es el tiempo que durará tu plan en nuestro sitio, una vez este tiempo culmine toma en cuenta lo siguiente:')).toBeInTheDocument();
    // Añade más expectativas para verificar otros elementos en tu tarjeta informativa

    expect(screen.getByText('Nuestro soporte')).toBeInTheDocument();
    expect(screen.getByText('Te brindamos la posibilidad de consultarnos por cualquier duda que tengamos con respecto a nuestro servicio.')).toBeInTheDocument();
    // Añade más expectativas para verificar otros elementos en tu tarjeta informativa

    expect(screen.getByText('Entrega de datos')).toBeInTheDocument();
    expect(screen.getByText('Tenemos distintos mecanismos de entrega de datos para ayudarte a recibir más simple los datos consultados. Pueden ser por:')).toBeInTheDocument();
    // Añade más expectativas para verificar otros elementos en tu tarjeta informativa

    expect(screen.getByText('Formatos de entrega')).toBeInTheDocument();
    expect(screen.getByText('Nuestro servicio te permite acceder a los datos que necesites en diferentes formatos, listos para que puedas implementarlo de la forma que necesites. Disponible según plan de suscripción.')).toBeInTheDocument();
    // Añade más expectativas para verificar otros elementos en tu tarjeta informativa
  });
});
