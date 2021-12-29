export const createError = (error: unknown): Error => (error instanceof Error
  ? new Error(error.message)
  : new Error('Unknown error'));

export default { createError };
