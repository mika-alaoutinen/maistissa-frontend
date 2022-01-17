import { WineType } from '../wineAPI';
import utils from '../wineUtils';

const { parseWineType } = utils;

describe('Should parse string into wine type', () => {
  it('parses OTHER', () => {
    expect(parseWineType('OTHER')).toBe(WineType.OTHER);
  });

  it('parses RED', () => {
    expect(parseWineType('RED')).toBe(WineType.RED);
  });

  it('parses ROSE', () => {
    expect(parseWineType('ROSE')).toBe(WineType.ROSE);
  });

  it('parses SPARKLING', () => {
    expect(parseWineType('SPARKLING')).toBe(WineType.SPARKLING);
  });

  it('parses WHITE', () => {
    expect(parseWineType('WHITE')).toBe(WineType.WHITE);
  });

  it('throws error if cannot parse', () => {
    expect(() => parseWineType('not a wine')).toThrow('Could not parse wine type "not a wine"');
  });
});
