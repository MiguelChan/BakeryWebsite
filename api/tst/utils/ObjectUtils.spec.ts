import { isNullOrUndefined, parseIntegerNumber } from '../../src/utils/ObjectUtils';

describe('ObjectUtils', () => {
  describe('isNullOrUndefined', () => {
    it('Should return true when provided value is null', () => {
      expect(isNullOrUndefined(null)).toBeTruthy();
    });

    it('Should return true when provide value is undefined', () => {
      expect(isNullOrUndefined(undefined)).toBeTruthy();
    });

    it('Should return false when provided value is not undefined nor null', () => {
      expect(isNullOrUndefined('Blabla')).toBeFalsy();
    });
  });

  describe('parseNumer', () => {
    it('Should return the defaultValue when provided value is null', () => {
      expect(parseIntegerNumber(null, 123)).toBe(123);
    });

    it('Should return the defaultValue when provided value is undefined', () => {
      expect(parseIntegerNumber(undefined, 123)).toBe(123);
    });

    it('Should return the defaultValue when provided value is not a number', () => {
      expect(parseIntegerNumber('lalala', 123)).toBe(123);
    });

    it('Should return the value when provide value is a number', () => {
      expect(parseIntegerNumber('1234.123', 0)).toBe(1234);
    });
  });
});
