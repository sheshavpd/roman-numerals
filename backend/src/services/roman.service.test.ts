import { describe, it, expect, beforeEach } from 'vitest';
import { RomanService } from './roman.service';

describe('RomanService', () => {
  let romanService: RomanService;
  beforeEach(() => {
    romanService = new RomanService();
  });
  describe('romanService.toRomanNumeral', () => {
    it('converts basic numbers correctly', () => {
      expect(romanService.toRomanNumeral(1)).toBe('I');
      expect(romanService.toRomanNumeral(3)).toBe('III');
      expect(romanService.toRomanNumeral(5)).toBe('V');
      expect(romanService.toRomanNumeral(10)).toBe('X');
      expect(romanService.toRomanNumeral(50)).toBe('L');
      expect(romanService.toRomanNumeral(100)).toBe('C');
      expect(romanService.toRomanNumeral(500)).toBe('D');
      expect(romanService.toRomanNumeral(1000)).toBe('M');
    });

    it('handles subtractive notation properly', () => {
      expect(romanService.toRomanNumeral(4)).toBe('IV');
      expect(romanService.toRomanNumeral(9)).toBe('IX');
      expect(romanService.toRomanNumeral(40)).toBe('XL');
      expect(romanService.toRomanNumeral(90)).toBe('XC');
      expect(romanService.toRomanNumeral(400)).toBe('CD');
      expect(romanService.toRomanNumeral(900)).toBe('CM');
    });

    it('handles more complex numbers', () => {
      // 1000=M, 900=CM, 80=LXXX, 7=VII
      expect(romanService.toRomanNumeral(1987)).toBe('MCMLXXXVII');
      expect(romanService.toRomanNumeral(3999)).toBe('MMMCMXCIX');
    });

    it('throws an error for out-of-range inputs', () => {
      expect(() => romanService.toRomanNumeral(0)).toThrow();
      expect(() => romanService.toRomanNumeral(-1)).toThrow();
      expect(() => romanService.toRomanNumeral(4000)).toThrow();
    });
  });
});
