import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectWines } from './wineSlice'

const WineList: React.FC = () => {
  const wines = useAppSelector(selectWines)

  const renderWines = (): JSX.Element[] => wines.map(({ name }) => <p key={name}>{name}</p>)

  return <div>{renderWines()}</div>
}

export default WineList
