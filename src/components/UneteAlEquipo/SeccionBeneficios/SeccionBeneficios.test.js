import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionBeneficios from './SeccionBeneficios';

describe('SeccionBeneficios', () => {
  test('renderiza el título de la sección correctamente', () => {
    render(<SeccionBeneficios />);
    const sectionTitle = screen.getByText('¿Por qué trabajar en Advantech?');
    expect(sectionTitle).toBeInTheDocument();
  });

  test('renderiza el título principal correctamente', () => {
    render(<SeccionBeneficios />);
    const mainTitle = screen.getByText('Forma parte de nuestro equipo remoto');
    expect(mainTitle).toBeInTheDocument();
  });

  test('renderiza el primer beneficio correctamente', () => {
    render(<SeccionBeneficios />);
    const firstBenefitTitle = screen.getByText('Trabajo remoto');
    const firstBenefitDescription = screen.getByText('Ofrecemos la posibilidad de trabajar de la comodidad de tu casa, no importa en qué país te encuentres.');
    expect(firstBenefitTitle).toBeInTheDocument();
    expect(firstBenefitDescription).toBeInTheDocument();
  });

  // Repite el patrón para los demás beneficios

  // Puedes agregar más pruebas según sea necesario

  test('renderiza todas las imágenes de verificación correctamente', () => {
    render(<SeccionBeneficios />);
    const checkImages = screen.getAllByAltText('check');
    expect(checkImages).toHaveLength(4); // Ajusta esto según el número real de beneficios
  });
});
