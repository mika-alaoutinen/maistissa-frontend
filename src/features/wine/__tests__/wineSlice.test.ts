import { RootState } from '../../../app/store'
import { wines } from '../../../tests/testdata'
import { CounterState } from '../../counter/counterSlice'
import wineReducer, { selectWineCount, selectWines, WineState } from '../wineSlice'

describe('Wine reducer', () => {
  it('reducer should handle initial state', () => {
    const initialState: WineState = {
      wines: [],
      status: 'idle',
    }
    expect(wineReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })
})

const initRootState = (): RootState => {
  const counterState: CounterState = {
    value: 0,
    status: 'idle',
  }

  const wineState: WineState = {
    wines,
    status: 'idle',
  }

  return {
    counter: counterState,
    wines: wineState,
  }
}

describe('Selectors', () => {
  const state = initRootState()

  it('should return wine count', () => {
    expect(selectWineCount(state)).toBe(2)
  })

  it('should return all wines', () => {
    expect(selectWines(state)).toEqual(wines)
  })
})
