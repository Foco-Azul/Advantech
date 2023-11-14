import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionGuiaDeUso from './SeccionGuiaDeUso';

describe('SeccionGuiaDeUso', () => {
  test('Renderiza la sección "Guía de Búsquedas" correctamente', () => {
    render(<SeccionGuiaDeUso />);
    
    // Verifica que los elementos esenciales estén presentes
    expect(screen.getByText('Guia de busquedas')).toBeInTheDocument();
    expect(screen.getByText('Aprende cómo realizar busquedas')).toBeInTheDocument();
    expect(screen.getByText('Mediante nuestra guía de búsquedas, te enseñaremos desde cómo realizar una búsqueda simple o por lotes hasta cómo acceder a los datos públicos de las personas que desees.')).toBeInTheDocument();
    
    // Verifica la presencia de la imagen
    const imagen = screen.getByAltText('Advantech Datos');
    expect(imagen).toBeInTheDocument();
    expect(imagen.tagName).toBe('IMG');
  });

  // Puedes agregar más pruebas según tus necesidades
});
