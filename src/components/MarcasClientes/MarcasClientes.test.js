import { render, screen } from '@testing-library/react';
import MarcasClientes from './MarcasClientes';

test('renders images with correct alt text', () => {
  render(<MarcasClientes />);

  const datafastImage = screen.getByAltText('Datafast');
  const dinersImage = screen.getByAltText('Diner Club Internacional');
  const pichinchaImage = screen.getByAltText('Banco Pichincha');

  expect(datafastImage).toBeInTheDocument();
  expect(dinersImage).toBeInTheDocument();
  expect(pichinchaImage).toBeInTheDocument();
});
