import api from '../wineInfoAPI';
import { WinesInfoService } from '../../../generated';

describe('API functions call REST services', () => {
  it('getCountries calls WinesInfoService', () => {
    const mockFn = jest.fn();
    WinesInfoService.findCountries = mockFn;

    void api.getCountries();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
