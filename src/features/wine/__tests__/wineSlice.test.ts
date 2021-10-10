import { initRootState } from '../../../tests/testutils'
import wineReducer, { selectWines, WineState } from '../wineSlice'

describe('Wine reducer', () => {
  it('reducer should handle initial state', () => {
    const initialState: WineState = {
      wines: [],
      status: 'idle',
    }
    expect(wineReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })
})

describe('Selectors', () => {
  const state = initRootState()

  it('should return all wines', () => {
    const allWines = selectWines(state)
    expect(allWines[0].name).toBe('White wine 1')
    expect(allWines[1].name).toBe('Red wine 1')
  })
})
