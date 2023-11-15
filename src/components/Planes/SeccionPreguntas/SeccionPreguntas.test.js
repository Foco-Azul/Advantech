import { render, screen, fireEvent } from '@testing-library/react';
import SeccionPreguntas from './SeccionPreguntas';

describe('SeccionPreguntas Component', () => {
  it('renders content correctly', () => {
    render(<SeccionPreguntas />);

    // Verifica la existencia de elementos clave
    expect(screen.getByText('Preguntas frecuentes')).toBeInTheDocument();
    expect(screen.getByText('Aprende más sobre cómo funcionan nuestros planes')).toBeInTheDocument();

    // Verifica que todos los acordeones estén cerrados inicialmente
    expect(screen.queryByText('¿Qué significa el uso de un crédito?')).toBeInTheDocument();
    expect(screen.queryByText('¿Qué sucede si sobrepaso el uso de mis créditos?')).toBeInTheDocument();
    expect(screen.queryByText('¿Cuál es la diferencia de los planes de soporte?')).toBeInTheDocument();
    expect(screen.queryByText('¿Cómo se renueva mi suscripción?')).toBeInTheDocument();

    // Abre y cierra un acordeón y verifica que su contenido sea correcto
    fireEvent.click(screen.getByText('¿Qué significa el uso de un crédito?'));
    expect(screen.getByText('Los créditos dentro de nuestro servicio son la moneda de cambio para la compra de datos, dependiendo la fuente consultada es el monto que se descuenta de los créditos.')).toBeInTheDocument();


  });
});
