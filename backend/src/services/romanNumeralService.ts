/**
 * Converts an integer to a Roman numeral using subtractive notation.
 *
 * Roman numeral rules:
 * - Subtractive notation is used for:
 *   - 4 -> IV, 9 -> IX
 *   - 40 -> XL, 90 -> XC
 *   - 400 -> CD, 900 -> CM
 * - Numbers must be between 1 and 3999.
 *
 * ref: https://en.wikipedia.org/wiki/Roman_numerals
 * @param {number} num - The integer to convert (1 <= num <= 3999).
 * @returns {string} The Roman numeral representation of the input.
 * @throws Will throw an error if input is out of range or invalid.
 */
/**
 * Converts an integer to a Roman numeral using subtractive notation.
 *
 * Roman numeral rules:
 * - Subtractive notation is used for:
 *   - 4 -> IV, 9 -> IX
 *   - 40 -> XL, 90 -> XC
 *   - 400 -> CD, 900 -> CM
 * - Numbers must be between 1 and 3999.
 *
 * @param {number} num - The integer to convert (1 <= num <= 3999).
 * @returns {string} The Roman numeral representation of the input.
 * @throws Will throw an error if input is out of range or invalid.
 */
export function toRomanNumeral(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error('Input must be between 1 and 3999');
  }

  const romanMap = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' }, // subtractive notation
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' }, // subtractive notation
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' }, // subtractive notation
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' }, // subtractive notation
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' }, // subtractive notation
    { value: 1, symbol: 'I' },
  ];

  let result = '';
  let remainder = num;

  for (const { value, symbol } of romanMap) {
    // Append the numeral while the number is greater than or equal to its value
    while (remainder >= value) {
      result += symbol;
      remainder -= value;
    }
  }

  return result;
}
