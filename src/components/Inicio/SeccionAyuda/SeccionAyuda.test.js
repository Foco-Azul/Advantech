import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionAyuda from './SeccionAyuda';

describe('SeccionAyuda', () => {
  test('Renderiza el componente SeccionAyuda correctamente', () => {
    render(<SeccionAyuda />);

    // Verifica que los elementos esenciales estén presentes
    expect(screen.getByText('Ayuda')).toBeInTheDocument();
    expect(screen.getByText('Obtiene asesoramiento sobre cómo crecer junto a una estrategia de uso de datos')).toBeInTheDocument();
    expect(screen.getByText('Agenda un demo y analizaremos juntos una estrategia de utilización de datos para el crecimiento de tu empresa.')).toBeInTheDocument();
    expect(screen.getByText('Agendar un demo')).toBeInTheDocument();

    // Verifica la presencia de las imágenes
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    const checks = screen.getAllByAltText('check');
    expect(checks.length).toBe(4);

    // Verifica la presencia de beneficios
    expect(screen.getByText('Título de beneficio #1')).toBeInTheDocument();
    expect(screen.getByText('Título de beneficio #2')).toBeInTheDocument();
    expect(screen.getByText('Título de beneficio #3')).toBeInTheDocument();
    expect(screen.getByText('Título de beneficio #4')).toBeInTheDocument();

    // Puedes agregar más pruebas según tus necesidades
  });
});
