import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

// Mock de useUser
jest.mock('@auth0/nextjs-auth0/client', () => ({
    useUser: jest.fn(() => ({ user: null, error: null, isLoading: false })),
}));

describe('Login', () => {
    test('renderiza correctamente cuando el usuario no está autenticado', () => {
        render(<Login loginname="Iniciar sesión" />);
        const loginButton = screen.getByText('Iniciar sesión');
        expect(loginButton).toBeInTheDocument();
    });

});
