import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeccionEmpresas from './SeccionEmpresas';
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';

test('renders SeccionEmpresas component', () => {
  const { getByText, getByTestId } = render(<SeccionEmpresas />);

  // Verifica que el componente MarcasClientes esté presente usando getByTestId
  const marcasClientesElement = getByTestId('marcas-clientes');
  expect(marcasClientesElement).toBeInTheDocument();

  // ... Resto de las verificaciones ...
});
