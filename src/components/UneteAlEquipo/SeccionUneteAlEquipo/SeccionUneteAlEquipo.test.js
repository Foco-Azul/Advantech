import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionUneteAlEquipo from './SeccionUneteAlEquipo';

describe('SeccionUneteAlEquipo', () => {
  test('Renderiza el título de la sección correctamente', () => {
    render(<SeccionUneteAlEquipo />);
    const sectionTitle = screen.getByText('Únete al equipo');
    expect(sectionTitle).toBeInTheDocument();
  });

  test('Renderiza el título principal correctamente', () => {
    render(<SeccionUneteAlEquipo />);
    const mainTitle = screen.getByText('Forma parte de una empresa en crecimiento');
    expect(mainTitle).toBeInTheDocument();
  });

  test('Renderiza el párrafo correctamente', () => {
    render(<SeccionUneteAlEquipo />);
    const paragraph = screen.getByText('Estamos en constante búsqueda de mentes curiosas y apasionadas por el mundo de los datos. Si te apasiona el análisis, la transformación y la interpretación de información, envíanos tu postulación.');
    expect(paragraph).toBeInTheDocument();
  });

  test('Renderiza la imagen con el texto alternativo correctamente', () => {
    render(<SeccionUneteAlEquipo />);
    const image = screen.getByAltText('Advantech Datos');
    expect(image).toBeInTheDocument();
  });
});
