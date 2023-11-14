import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionProductos from './SeccionProductos';

describe('SeccionProductos', () => {
  test('Se renderiza SeccionProductos correctamente con el contenido incial', () => {
    render(<SeccionProductos />);

    const textoDatos = screen.getByText('Datos');
    const textoDescripcion = screen.getByText('¿Quieres averiguar datos relevantes de empresas o personas?');
    const pestañaBuscador = screen.getByText('DATOS POR BUSCADOR');
    const pestañaDescarga = screen.getByText('DATOS POR DESCARGA');
    const pestañaApi = screen.getByText('DATOS POR API');
    const videoBuscador = screen.getByText('DATOS POR BUSCADOR').nextSibling;
    const videoDescarga = screen.getByText('DATOS POR DESCARGA').nextSibling;
    const imagenApi = screen.getByAltText('advantech-email');

    expect(textoDatos).toBeInTheDocument();
    expect(textoDescripcion).toBeInTheDocument();
    expect(pestañaBuscador).toBeInTheDocument();
    expect(pestañaDescarga).toBeInTheDocument();
    expect(pestañaApi).toBeInTheDocument();
    expect(videoBuscador).toBeInTheDocument();
    expect(videoDescarga).toBeInTheDocument();
    expect(imagenApi).toBeInTheDocument();

    expect(videoBuscador).not.toHaveClass('contenido-activo');
    expect(videoDescarga).not.toHaveClass('contenido-activo');
    expect(imagenApi).not.toHaveClass('contenido-activo');
  });

  test('Switch de DATOS POR DESCARGA muestra el contenido correcto', () => {
    render(<SeccionProductos />);
    const pestañaDescarga = screen.getByText('DATOS POR DESCARGA');
    const videoDescarga = screen.getByText('DATOS POR DESCARGA').nextSibling;

    fireEvent.click(pestañaDescarga);

    expect(pestañaDescarga).toHaveClass('pestaña-activo');
  });

  test('Switch de DATOS POR API muestra el contenido correcto', () => {
    render(<SeccionProductos />);
    const pestañaApi = screen.getByText('DATOS POR API');

    fireEvent.click(pestañaApi);

    expect(pestañaApi).toHaveClass('pestaña-activo');
  });
});
