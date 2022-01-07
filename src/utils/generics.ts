type GenericObject = Record<string, unknown>;

/**
 * A helper function for working around TypeScript's Object.keys() limitations.
 * This function can be used instead of Object.keys() when the type information
 * of an object is important. Object.keys() alwaysdisplays the type of key as
 * 'string'.
 *
 * @param obj arbitrary object
 * @returns the same object correctly typed
 */
const keysOf = <T extends GenericObject>(obj: T): (keyof T)[] => Array.from(Object.keys(obj));

export default { keysOf };
