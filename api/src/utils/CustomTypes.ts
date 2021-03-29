/**
 * Defines a Type that can be Null.
 */
export type Nullable<T> = T | null;

/**
 * Defines a Type that can be Undefined.
 */
export type Undefinable<T> = T | null;

/**
 * Defines a Type that can be either Null or Undefined.
 */
export type NullOrUndef<T> = Nullable<T> | Undefinable<T>;