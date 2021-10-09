import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import AddWine from '../features/wine/AddWine'
import Wines from '../features/wine/Wines'
import { fetchWines, selectWineCount } from '../features/wine/wineSlice'

const WineList: React.FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectWineCount)

  useEffect(() => {
    void dispatch(fetchWines())
  }, [dispatch])

  return (
    <div>
      <h2>Wines page ({count} wines)</h2>
      <AddWine />
      <Wines />
    </div>
  )
}

export default WineList
