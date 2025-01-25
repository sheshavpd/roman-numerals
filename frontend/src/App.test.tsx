import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import RomanNumeralForm from './features/roman-numerals/RomanNumeralForm.tsx';

vi.mock('./features/roman-numerals/RomanNumeralForm.tsx');

describe('App', () => {
  it('should render the heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Roman Numerals Converter');
  });

  it('should update the result when onConversionSuccess is called', async () => {
    const { rerender } = render(<App />);
    const mockForm = vi.mocked(RomanNumeralForm);
    expect(screen.queryByText(/MXX/i)).not.toBeInTheDocument();

    const onConversionSuccess = mockForm.mock.calls[0][0].onConversionSuccess;
    onConversionSuccess('MXX');
    rerender(<App />);
    expect(screen.queryByText(/MXX/i)).toBeInTheDocument();
  });
});
