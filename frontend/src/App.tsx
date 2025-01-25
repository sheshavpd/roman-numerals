import { useState } from 'react';
import { Flex, Heading, View } from '@adobe/react-spectrum';
import RomanNumeralForm from './features/roman-numerals/RomanNumeralForm.tsx';
import RomanNumeralResult from './features/roman-numerals/RomanNumeralResult.tsx';

function App() {
  const [result, setResult] = useState<string | undefined>(undefined);

  return (
    <Flex width="100vw" height="100vh" justifyContent="center">
      <Flex alignItems="center" justifyContent="center">
        <View padding="size-300">
          <Heading level={2}>Roman Numerals Converter</Heading>
          <RomanNumeralForm
            onConversionSuccess={(output) => setResult(output)}
          />

          <View height="size-600" marginTop="size-200">
            {/* Although a whole new component is an overkill here, just demonstrating that I care about modularity. */}
            <RomanNumeralResult result={result} />
          </View>
        </View>
      </Flex>
    </Flex>
  );
}

export default App;
