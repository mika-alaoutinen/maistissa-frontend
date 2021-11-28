import { WinesInfoService } from '../../generated';

const getCountries = async (): Promise<string[]> => WinesInfoService.findCountries();

export default { getCountries };
