import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RomanNumeralForm from './RomanNumeralForm';
import apiClient from '../../api/apiClient.ts';

vi.mock('../../api/apiClient.ts');

const SIMULATED_DELAY = 3000;

describe('RomanNumeralForm', () => {
  const mockedApiClientGet = vi.mocked(apiClient.get);

  let onConversionSuccessMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockedApiClientGet.mockReset();
    onConversionSuccessMock = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the input field and the button', () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables the button and shows pending state while converting', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    await userEvent.type(input, '123');
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });

  it('calls API with correct params and handles successful response', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);
    mockedApiClientGet.mockResolvedValueOnce({ data: { output: 'CXXIII' } });

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');
    await userEvent.type(input, '123');
    await userEvent.click(button);

    vi.advanceTimersByTime(SIMULATED_DELAY);
    await waitFor(() => {
      expect(mockedApiClientGet).toHaveBeenCalledTimes(1);
    });

    expect(mockedApiClientGet).toHaveBeenCalledWith('/romannumeral', {
      params: { query: '123' },
    });

    expect(onConversionSuccessMock).toHaveBeenCalledWith('CXXIII');

    expect(
      screen.queryByText(/please enter a number/i),
    ).not.toBeInTheDocument();
  });

  it('displays an error message from the server if the API call fails', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const errorMessage = 'Server says no!';
    mockedApiClientGet.mockRejectedValueOnce({
      response: {
        data: {
          error: errorMessage,
        },
      },
      message: '',
    });

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    await userEvent.type(input, '9999');
    await userEvent.click(button);
    vi.advanceTimersByTime(SIMULATED_DELAY);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(onConversionSuccessMock).toHaveBeenCalledOnce();
    expect(onConversionSuccessMock).toHaveBeenCalledWith('');
  });

  it('displays a generic error message if no error is provided from the server', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    mockedApiClientGet.mockRejectedValueOnce({
      response: { data: {} },
      message: 'Something went wrong',
    });

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    await userEvent.type(input, '5000');
    await userEvent.click(button);
    vi.advanceTimersByTime(SIMULATED_DELAY);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it('clears the error message if the user changes the input', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    mockedApiClientGet.mockRejectedValueOnce({
      response: { data: {} },
      message: 'Something went wrong',
    });

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    await userEvent.type(input, '5000');
    await userEvent.click(button);
    vi.advanceTimersByTime(SIMULATED_DELAY);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
    await userEvent.type(input, '5001');
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it('does not call API if input is blank or whitespace', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const button = screen.getByTestId('convert-button');
    await userEvent.click(button);

    expect(mockedApiClientGet).not.toHaveBeenCalled();
  });

  it('shows the error message set by the component if input is only whitespace', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');
    await userEvent.type(input, '    ');
    await userEvent.click(button);
    expect(mockedApiClientGet).not.toHaveBeenCalled();
  });

  it('resets isConverting state after API call completes', async () => {
    vi.useFakeTimers();

    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    mockedApiClientGet.mockResolvedValueOnce({ data: { output: 'X' } });

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    await userEvent.type(input, '10');
    await userEvent.click(button);

    expect(button).toBeDisabled();

    vi.advanceTimersByTime(SIMULATED_DELAY);

    await waitFor(() => {
      expect(mockedApiClientGet).toHaveBeenCalledTimes(1);
    });

    expect(button).not.toBeDisabled();
  });

  it('clears previous success output and error message on new conversion attempt', async () => {
    render(<RomanNumeralForm onConversionSuccess={onConversionSuccessMock} />);

    const input = screen.getByLabelText(/roman-input/i);
    const button = screen.getByTestId('convert-button');

    mockedApiClientGet.mockResolvedValueOnce({ data: { output: 'X' } });

    await userEvent.type(input, '10');
    await userEvent.click(button);
    vi.advanceTimersByTime(SIMULATED_DELAY);

    await waitFor(() => {
      expect(onConversionSuccessMock).toHaveBeenCalledWith('X');
    });

    mockedApiClientGet.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Second attempt error',
        },
      },
    });

    // Second attempt
    await userEvent.clear(input);
    await userEvent.type(input, '11');
    await userEvent.click(button);
    vi.advanceTimersByTime(SIMULATED_DELAY);

    expect(onConversionSuccessMock).toHaveBeenCalledWith('');

    expect(
      await screen.findByText(/second attempt error/i),
    ).toBeInTheDocument();
  });
});
