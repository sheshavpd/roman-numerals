import React, { useState } from 'react';
import { TextField, Button, Flex } from '@adobe/react-spectrum';
import apiClient from '../../api/apiClient';
import { AxiosError } from 'axios';

interface RomanNumeralFormProps {
  onConversionSuccess: (output: string) => void;
}

const RomanNumeralForm: React.FC<RomanNumeralFormProps> = ({
  onConversionSuccess,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const handleConvert = async () => {
    setErrorMessage('');
    onConversionSuccess('');

    if (!inputValue.trim()) {
      setErrorMessage('Please enter a number.');
      return;
    }

    setIsConverting(true);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await apiClient.get(`/romannumeral`, {
        params: { query: inputValue },
      });

      onConversionSuccess(response.data.output);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      const message =
        err.response?.data?.error || err.message || 'An error occurred.';
      setErrorMessage(message);
    }

    setIsConverting(false);
  };

  const onChange = (value: string) => {
    setInputValue(value);
    setErrorMessage('');
  };

  return (
    <Flex direction="column" alignItems="start" gap="size-250">
      <TextField
        label="Enter a number"
        width="size-3600"
        value={inputValue}
        onChange={onChange}
        validationState={errorMessage ? 'invalid' : undefined}
        aria-label="roman-input"
        errorMessage={errorMessage}
      />
      <Button
        variant="primary"
        onPress={handleConvert}
        isPending={isConverting}
        isDisabled={!inputValue.trim() || isConverting}
        data-testid="convert-button"
      >
        Convert to roman numeral
      </Button>
    </Flex>
  );
};

export default RomanNumeralForm;
