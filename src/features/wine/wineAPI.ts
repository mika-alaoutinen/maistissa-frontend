import { Wine } from "../../generated/models/Wine";
import { WinesCrudService } from "../../generated/services/WinesCrudService";

const addWine = async (wine: Wine): Promise<Wine> =>
  WinesCrudService.addWine(wine);

const getWines = async (): Promise<Wine[]> => WinesCrudService.getWines();

export { Wine };
export default { addWine, getWines };
