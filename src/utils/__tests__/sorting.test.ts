import { reviews, wines } from '../../tests/testdata';
import { WineType } from '../../api/wineAPI';
import { sortByWineName, sortAscending, sortDescending } from '../sorting';

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

describe('Sorting equal values does not change item order', () => {
  interface TestItem {
    id: number,
    name: string
  }

  const testItems: TestItem[] = [
    { id: 1, name: 'item' },
    { id: 2, name: 'item' },
  ];

  it('sorting items with the same name in ascending order', () => {
    const sorted = sortAscending(testItems, 'name');
    const ids = sorted.map((item) => item.id);
    expect(ids).toEqual([1, 2]);
  });

  it('sorting items with the same name in descending order', () => {
    const sorted = sortDescending(testItems, 'name');
    const ids = sorted.map((item) => item.id);
    expect(ids).toEqual([1, 2]);
  });
});

describe('Sorting reviews by wine name', () => {
  it('sorts reviews by wine name from a to z', () => {
    const sorted = sortByWineName(reviews, 'ASC');
    const wineNames = sorted.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['Red wine 1', 'White wine 1']);
  });

  it('sorts reviews by wine name from a to z, reverse input', () => {
    const sorted = sortByWineName(reviews.reverse(), 'ASC');
    const wineNames = sorted.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['Red wine 1', 'White wine 1']);
  });

  it('sorts reviews by wine name from z to a', () => {
    const sorted = sortByWineName(reviews, 'DESC');
    const wineNames = sorted.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['White wine 1', 'Red wine 1']);
  });

  it('sorts reviews by wine name from z to a, reverse input', () => {
    const sorted = sortByWineName(reviews.reverse(), 'DESC');
    const wineNames = sorted.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['White wine 1', 'Red wine 1']);
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
