import { createError } from '../errorHandling';

describe('Creates errors with message', () => {
  it('error has given message', () => {
    const { message } = createError(new Error('message'));
    expect(message).toBe('message');
  });

  it('handles unknown input by returning an unknown error', () => {
    const { message } = createError('what is this');
    expect(message).toBe('Unknown error');
  });
});
