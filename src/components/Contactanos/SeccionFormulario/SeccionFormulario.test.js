import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionFormulario from './SeccionFormulario';

describe('SeccionFormulario', () => {
  test('Renderiza el formulario correctamente', () => {
    render(<SeccionFormulario />);
    
    // Verifica que los elementos del formulario estén presentes
    expect(screen.getByLabelText('Plan*')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre(s)*')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellidos*')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico*')).toBeInTheDocument();
    expect(screen.getByLabelText('Teléfono*')).toBeInTheDocument();
    expect(screen.getByLabelText('Empresa')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensaje*')).toBeInTheDocument();
    expect(screen.getByText('Estoy de acuerdo con los')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

//   test('Envía el formulario correctamente', async () => {
//     render(<SeccionFormulario />);
    
//     // Simula el llenado del formulario
//     fireEvent.change(screen.getByLabelText('Plan*'), { target: { value: 'Personalizado' } });
//     fireEvent.change(screen.getByLabelText('Nombre(s)*'), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText('Apellidos*'), { target: { value: 'Doe' } });
//     fireEvent.change(screen.getByLabelText('Correo electrónico*'), { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(screen.getByLabelText('Teléfono*'), { target: { value: '123456789' } });
//     fireEvent.change(screen.getByLabelText('Empresa'), { target: { value: 'Advantech' } });
//     fireEvent.change(screen.getByLabelText('Mensaje*'), { target: { value: 'Mensaje de prueba' } });
//     fireEvent.click(screen.getByText('Estoy de acuerdo con los'));

//     // Simula el envío del formulario
//     fireEvent.click(screen.getByText('Enviar'));

//     // Espera a que se muestre el mensaje de éxito
//     await waitFor(() => {
//       expect(screen.getByText('¡Tu formulario ha sido enviado exitosamente!')).toBeInTheDocument();
//     });
//   });
});
