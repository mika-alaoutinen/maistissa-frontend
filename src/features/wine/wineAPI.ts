import { Wine } from '../../generated/models/Wine'
import { WinesCrudService } from '../../generated/services/WinesCrudService'

const addWine = async (wine: Wine): Promise<Wine> => await WinesCrudService.addWine(wine)

const getWines = async (): Promise<Wine[]> => await WinesCrudService.getWines()

export { Wine }
export default { addWine, getWines }
