import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ceylon Explorer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Ceylon Explorer/i);
  expect(titleElement).toBeInTheDocument();
});
