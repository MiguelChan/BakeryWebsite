/**
 * Returns true if the provided object is null or undefined.
 * @param object .
 */
export const isNullOrUndefined = (object: any): boolean => {
    return object === null || object === undefined;
};

/**
 * Returns true if the provided string is null or null or undefined.
 * 
 * @param object .
 * @returns .
 */
export const isNullOrEmpty = (object: string | null): boolean => {
    if (isNullOrUndefined(object)) {
        return true;
    }

    return object === '';
};