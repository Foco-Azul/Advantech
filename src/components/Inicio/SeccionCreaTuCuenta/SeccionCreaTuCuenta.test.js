import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionCreaTuCuenta from './SeccionCreaTuCuenta';
import { UserProvider } from '@auth0/nextjs-auth0/client';

test('renderiza SeccionCreaTuCuenta correctamente', async () => {
    await act(async () => {
        render(<UserProvider>  <SeccionCreaTuCuenta />  </UserProvider>);
    });

    // Asegúrate de que se renderiza correctamente el contenido del componente
    expect(screen.getByText('Crea tu cuenta gratuita')).toBeInTheDocument();
    expect(screen.getByText('Consulta los datos de miles de personas')).toBeInTheDocument();
    expect(screen.getByText('Obtén datos de varias fuentes de consulta personas manera automática y rápida sin ser el titular de la información.')).toBeInTheDocument();

    // Asegúrate de que se renderiza el botón
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument();
});

