import api, { NewWine, WineType } from '../wineAPI';
import { WinesCrudService } from '../../../generated';

describe('API functions call REST services', () => {
  it('addWine calls WinesCrudService', () => {
    const newWine: NewWine = {
      name: 'White wine 1',
      type: WineType.WHITE,
      country: 'Spain',
      price: 10.5,
      volume: 0.75,
      description: ['dry', 'aromatic'],
      foodPairings: ['white meat'],
      url: '',
    };

    const mockFn = jest.fn();
    WinesCrudService.addWine = mockFn;

    void api.addWine(newWine);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('getWines calls WinesCrudService', () => {
    const mockFn = jest.fn();
    WinesCrudService.getWines = mockFn;

    void api.getWines();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
