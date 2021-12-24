import { NewWine, WinesCrudService } from '../generated';
import { Wine } from '../generated/models/Wine';

const addWine = async (wine: NewWine): Promise<Wine> => WinesCrudService.addWine(wine);

const getWines = async (): Promise<Wine[]> => WinesCrudService.getWines();

export const WineType = NewWine.type;

export type { NewWine, Wine };
export default { addWine, getWines };
