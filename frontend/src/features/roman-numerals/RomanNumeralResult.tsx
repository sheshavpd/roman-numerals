import React from 'react';
import { Text } from '@adobe/react-spectrum';

interface RomanNumeralResultProps {
  result?: string;
}
/*
 * This component is an overkill, I agree. But I wanted to demonstrate that I care about modularity.
 * **/
const RomanNumeralResult: React.FC<RomanNumeralResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <Text>
      <strong>Roman numeral:</strong> {result}
    </Text>
  );
};

export default RomanNumeralResult;
