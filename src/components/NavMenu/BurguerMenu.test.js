// BurguerMenu.test.js

import React from 'react';
import { render, screen, waitFor,act  } from '@testing-library/react';
import '@testing-library/jest-dom'; // Necesario para las funciones de expect extendidas
import userEvent from '@testing-library/user-event'; // Para simular interacciones de usuario
import BurguerMenu from './BurguerMenu'; // Asegúrate de tener la ruta correcta
import { UserProvider } from '@auth0/nextjs-auth0/client';


describe('BurguerMenu', () => {
    test('Se puede abrir el menú emergente y ver la opción "RECURSOS"', async () => {
        // Renderiza el componente
        await act(async () => {
            render(<UserProvider><BurguerMenu /></UserProvider>);
        });

        // Asegúrate de que el menú emergente esté cerrado inicialmente
        expect(screen.queryByText('RECURSOS')).not.toBeInTheDocument();

        // Simula un clic en el botón del menú para abrirlo
        // Dentro del test
        userEvent.click(screen.getByTestId('toggle-button'));


        // Espera a que se cargue completamente el menú emergente
        await waitFor(() => {
            // Ahora deberías ver la opción "RECURSOS"
            expect(screen.getByText((content, element) => {
                // Verifica si el texto incluye "RECURSOS" y no está en un comentario, script o estilo
                return content.includes('RECURSOS') && !['script', 'style', 'comment'].includes(element?.parentNode?.nodeName.toLowerCase());
            })).toBeInTheDocument();
        });
    })

    // Otros tests pueden seguir aquí
});
