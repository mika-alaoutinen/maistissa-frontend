import { NewWine, WineType } from './wineAPI';

const parseWineType = (wineType: string): NewWine.type => {
  switch (wineType) {
    case 'OTHER':
      return WineType.OTHER;
    case 'RED':
      return WineType.RED;
    case 'ROSE':
      return WineType.ROSE;
    case 'SPARKLING':
      return WineType.SPARKLING;
    case 'WHITE':
      return WineType.WHITE;
    default:
      throw new Error(`Could not parse wine type "${wineType}"`);
  }
};

export default { parseWineType };
