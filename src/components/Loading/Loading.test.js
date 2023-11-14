import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './Loading';

test('renders Loading component', () => {
    
  const { getByAltText } = render(<Loading />);
  const logoImage = getByAltText('Company Logo');
  expect(logoImage).toBeInTheDocument();
});
