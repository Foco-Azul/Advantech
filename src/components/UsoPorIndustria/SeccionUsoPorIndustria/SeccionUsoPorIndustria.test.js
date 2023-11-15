import React from 'react';
import { render, screen } from '@testing-library/react';
import SeccionUsoPorIndustria from './SeccionUsoPorIndustria';

describe('SeccionUsoPorIndustria Component', () => {
  test('renders SeccionUsoPorIndustria component with correct title', () => {
    render(<SeccionUsoPorIndustria />);

    // Check if the correct title is present
    expect(screen.getByText('Uso por industria')).toBeInTheDocument();
  });

  test('renders SeccionUsoPorIndustria component with correct subtitle', () => {
    render(<SeccionUsoPorIndustria />);

    // Check if the correct subtitle is present
    expect(
      screen.getByText('Aprovecha el uso de datos como una ventaja competitiva')
    ).toBeInTheDocument();
  });

  // Add more tests as needed
});
