import { wines } from '../../tests/testdata';
import { WineType } from '../../features/wine/wineAPI';
import { sortAscending, sortDescending } from '../sorting';

// Tests for sorting Wine objects
describe('Sort ascending by key', () => {
  it('sorts wines by country from a to z', () => {
    const sorted = sortAscending(wines, 'country');
    const countries = sorted.map((wine) => wine.country);
    expect(countries).toEqual(['Italy', 'Spain']);
  });

  it('sorts wines by name from a to z', () => {
    const sorted = sortAscending(wines, 'name');
    const names = sorted.map((wine) => wine.name);
    expect(names).toEqual(['Red wine 1', 'White wine 1']);
  });

  it('sorts wines by price from low to high', () => {
    const sorted = sortAscending(wines, 'price');
    const prices = sorted.map((wine) => wine.price);
    expect(prices).toEqual([10.5, 33.5]);
  });

  it('sorts wines by type from low to high', () => {
    const sorted = sortAscending(wines, 'type');
    const types = sorted.map((wine) => wine.type);
    expect(types).toEqual([WineType.RED, WineType.WHITE]);
  });

  it('sorts wines by volume from low to high', () => {
    const sorted = sortAscending(wines, 'volume');
    const volumes = sorted.map((wine) => wine.volume);
    expect(volumes).toEqual([0.75, 3]);
  });
});

describe('Sort descending by key', () => {
  it('sorts wines by country from z to a', () => {
    const sorted = sortDescending(wines, 'country');
    const countries = sorted.map((wine) => wine.country);
    expect(countries).toEqual(['Spain', 'Italy']);
  });

  it('sorts wines by name from z to a', () => {
    const sorted = sortDescending(wines, 'name');
    const names = sorted.map((wine) => wine.name);
    expect(names).toEqual(['White wine 1', 'Red wine 1']);
  });

  it('sorts wines by price from high to low', () => {
    const sorted = sortDescending(wines, 'price');
    const prices = sorted.map((wine) => wine.price);
    expect(prices).toEqual([33.5, 10.5]);
  });

  it('sorts wines by type from high to low', () => {
    const sorted = sortDescending(wines, 'type');
    const types = sorted.map((wine) => wine.type);
    expect(types).toEqual([WineType.WHITE, WineType.RED]);
  });

  it('sorts wines by volume from high to low', () => {
    const sorted = sortDescending(wines, 'volume');
    const volumes = sorted.map((wine) => wine.volume);
    expect(volumes).toEqual([3, 0.75]);
  });
});

describe('Sorting does not mutate the input array', () => {
  it('sort ascending does not mutate its input', () => {
    const initialWines = [...wines];
    sortAscending(wines, 'country');
    expect(wines).toEqual(initialWines);
  });

  it('sort descending does not mutate its input', () => {
    const initialWines = [...wines];
    sortDescending(wines, 'country');
    expect(wines).toEqual(initialWines);
  });
});
