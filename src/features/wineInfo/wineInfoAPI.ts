import { WinesInfoService } from '../../generated';

const getCountries = async (): Promise<string[]> => WinesInfoService.findCountries();
const getDescriptions = async (): Promise<string[]> => WinesInfoService.findDescriptions();
const getFoodPairings = async (): Promise<string[]> => WinesInfoService.findFoodPairings();

export default { getCountries, getDescriptions, getFoodPairings };
