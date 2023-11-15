// BurguerMenu.test.js

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Necesario para las funciones de expect extendidas
import userEvent from '@testing-library/user-event'; // Para simular interacciones de usuario
import RespaldoLegalSeccion from './RespaldoLegalSeccion'; // Asegúrate de tener la ruta correcta
import { UserProvider } from '@auth0/nextjs-auth0/client';


describe('RespaldoLegalSeccion', () => {
    test('Respaldo Legal se renderiza correctamente', async () => {
        // Renderiza el componente
        await act(async () => {
            render(<UserProvider><RespaldoLegalSeccion /></UserProvider>);
        });

        const buttonElement = screen.getByText('TERMINOS Y CONDICIONES', { selector: 'button' });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.tagName).toBe('BUTTON');


        const buttonElement1 = screen.getByText('POLITICAS DE PRIVACIDAD', { selector: 'button' });
        expect(buttonElement1).toBeInTheDocument();
        expect(buttonElement1.tagName).toBe('BUTTON');

        const buttonElement2 = screen.getByText('AVISO DE PRIVACIDAD', { selector: 'button' });
        expect(buttonElement2).toBeInTheDocument();
        expect(buttonElement2.tagName).toBe('BUTTON');

        const buttonElement3 = screen.getByText('POLITICA DE COOCKIES', { selector: 'button' });
        expect(buttonElement2).toBeInTheDocument();
        expect(buttonElement2.tagName).toBe('BUTTON');

    })

    // Otros tests pueden seguir aquí
});
