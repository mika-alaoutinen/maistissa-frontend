import { Wine } from '../features/wine/wineAPI';
import { RootState } from './store';

const selectWineCount = (state: RootState): number => state.wines.wines.length;
const selectWines = (state: RootState): Wine[] => state.wines.wines;

export { selectWineCount, selectWines };
