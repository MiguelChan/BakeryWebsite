/**
 * returnes true if the provided is null.
 *
 * @param {any} value .
 *
 * @returns true if the value is null or undefined.
 */
export const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

export const parseIntegerNumber = (value: any, defaultValue: number): number => {
  if (isNullOrUndefined(value)) {
    return defaultValue;
  }
  return parseInt(value, 10) || defaultValue;
};
