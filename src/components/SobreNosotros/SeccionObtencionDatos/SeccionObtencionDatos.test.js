import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ObtencionDatos from './SeccionObtencionDatos';

describe('ObtencionDatos Component', () => {
  test('Se renderiza ObtencionDatos correctamente', () => {
    render(<ObtencionDatos />);

    expect(screen.getByText('Obtención de datos')).toBeInTheDocument();
    expect(screen.getByText('Distintas fuentes para contar un registro más completo')).toBeInTheDocument();
    expect(screen.getByText('Consultamos datos de distintas fuentes públicas para que puedas obtener mejores resultados en tus búsquedas. Aseguramos que estos sean fiables y actualizados periódicamente.')).toBeInTheDocument();

    expect(screen.getByText('Superintendencia de compañías')).toBeInTheDocument();
    expect(screen.getByText('Función Judicial')).toBeInTheDocument();
    expect(screen.getByText('Municipio de Quito')).toBeInTheDocument();
    expect(screen.getByText('Servicio de Rentas Internas')).toBeInTheDocument();
    expect(screen.getByText('Ministerio de Gobierno')).toBeInTheDocument();
    expect(screen.getByText('Fiscalía General del Estado')).toBeInTheDocument();
    expect(screen.getByText('Senescyt')).toBeInTheDocument();
    expect(screen.getByText('Ministerio de Educación')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /ver fuentes de créditos/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

  });
});
