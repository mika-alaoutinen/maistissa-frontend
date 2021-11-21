import { NewWine } from '../../generated/models/NewWine';
import { Wine } from '../../generated/models/Wine';
import { WinesCrudService } from '../../generated/services/WinesCrudService';

const addWine = async (wine: NewWine): Promise<Wine> => WinesCrudService.addWine(wine);

const getWines = async (): Promise<Wine[]> => WinesCrudService.getWines();

export const WineType = NewWine.type;

// export type WineProps = 'name' | 'type' | 'country' | 'volume' | 'price';
export type WineProps = keyof Wine;
export type WineData = Pick<Wine, keyof Wine>;
export type { NewWine, Wine };
export default { addWine, getWines };
