import { render, screen } from '@testing-library/react';
import SeccionRecursos from './SeccionRecursos';

describe('SeccionRecursos Component', () => {
  it('renders content correctly', () => {
    render(<SeccionRecursos />);

    // Verifica la existencia de elementos clave
    expect(screen.getByText('Recursos')).toBeInTheDocument();
    expect(screen.getByText('Intuitivo para un uso diario,')).toBeInTheDocument();
    expect(screen.getByText('con documentación para guiarte')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();

    // Verifica la existencia de enlaces por el texto exacto
    expect(screen.getByText('Uso por industria')).toBeInTheDocument();
    expect(screen.getByText('Ver más')).toBeInTheDocument();
    expect(screen.getByText('Conoce nuestras ventajas')).toBeInTheDocument();
    expect(screen.getByText('Ver ventajas')).toBeInTheDocument();
  });


});
