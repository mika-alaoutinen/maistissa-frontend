import api from '../wineInfoAPI';
import { WinesInfoService } from '../../../generated';

describe('API functions call REST services', () => {
  it('getCountries calls WinesInfoService', () => {
    const mockFn = jest.fn();
    WinesInfoService.findCountries = mockFn;

    void api.getCountries();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('getDescriptions calls WinesInfoService', () => {
    const mockFn = jest.fn();
    WinesInfoService.findDescriptions = mockFn;

    void api.getDescriptions();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('getFoodPairings calls WinesInfoService', () => {
    const mockFn = jest.fn();
    WinesInfoService.findFoodPairings = mockFn;

    void api.getFoodPairings();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
