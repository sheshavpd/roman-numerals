import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RomanNumeralResult from './RomanNumeralResult';

describe('RomanNumeralResult', () => {
  it('should not render anything if result is not provided', () => {
    const { container } = render(<RomanNumeralResult />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText(/roman numeral:/i)).not.toBeInTheDocument();
  });

  it('should render the result when provided', () => {
    render(<RomanNumeralResult result="MMXX" />);
    expect(screen.getByText(/roman numeral:/i)).toBeInTheDocument();
    expect(screen.getByText(/MMXX/i)).toBeInTheDocument();
  });
});
