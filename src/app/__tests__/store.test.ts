import store from '../store';

describe('Store creates a Redux store', () => {
  it('store should have initial state', () => {
    const initialState = store.getState();
    ['reviews', 'wines', 'wineInfo']
      .forEach((slice) => expect(initialState).toHaveProperty(slice));
  });
});
