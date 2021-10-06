import { Wine } from '../generated/models/Wine'
import { WinesCrudService } from '../generated/services/WinesCrudService'

const getWines = async (): Promise<Wine[]> => await WinesCrudService.getWines()

export default { getWines }
