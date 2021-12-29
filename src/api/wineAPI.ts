import { NewWine, WinesCrudService } from '../generated';
import { Wine } from '../generated/models/Wine';
import { createError } from './errorHandling';

const addWine = async (wine: NewWine): Promise<Wine> => {
  try {
    return await WinesCrudService.addWine(wine);
  } catch (error) {
    throw createError(error);
  }
};

const getWines = async (): Promise<Wine[]> => {
  try {
    return await WinesCrudService.getWines();
  } catch (error) {
    throw createError(error);
  }
};

export const WineType = NewWine.type;

export type { NewWine, Wine };
export default { addWine, getWines };
