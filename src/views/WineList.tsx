import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Wines from '../features/wine/Wines'
import { fetchWines, wineCount } from '../features/wine/wineSlice'

const WineList: React.FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(wineCount)

  useEffect(() => {
    void dispatch(fetchWines())
  }, [dispatch])

  return (
    <div>
      <h2>Wines page ({count} wines)</h2>
      <Wines />
    </div>
  )
}

export default WineList
