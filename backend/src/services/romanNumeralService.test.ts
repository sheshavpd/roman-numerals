import { describe, it, expect } from 'vitest';
import { toRomanNumeral } from './romanNumeralService';

describe('toRomanNumeral', () => {
  it('converts basic numbers correctly', () => {
    expect(toRomanNumeral(1)).toBe('I');
    expect(toRomanNumeral(3)).toBe('III');
    expect(toRomanNumeral(5)).toBe('V');
    expect(toRomanNumeral(10)).toBe('X');
    expect(toRomanNumeral(50)).toBe('L');
    expect(toRomanNumeral(100)).toBe('C');
    expect(toRomanNumeral(500)).toBe('D');
    expect(toRomanNumeral(1000)).toBe('M');
  });

  it('handles subtractive notation properly', () => {
    expect(toRomanNumeral(4)).toBe('IV');
    expect(toRomanNumeral(9)).toBe('IX');
    expect(toRomanNumeral(40)).toBe('XL');
    expect(toRomanNumeral(90)).toBe('XC');
    expect(toRomanNumeral(400)).toBe('CD');
    expect(toRomanNumeral(900)).toBe('CM');
  });

  it('handles more complex numbers', () => {
    // 1000=M, 900=CM, 80=LXXX, 7=VII
    expect(toRomanNumeral(1987)).toBe('MCMLXXXVII');
    expect(toRomanNumeral(3999)).toBe('MMMCMXCIX');
  });

  it('throws an error for out-of-range inputs', () => {
    expect(() => toRomanNumeral(0)).toThrow();
    expect(() => toRomanNumeral(-1)).toThrow();
    expect(() => toRomanNumeral(4000)).toThrow();
  });
});
