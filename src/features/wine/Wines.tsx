import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { wines } from './wineSlice'

const Wines: React.FC = () => {
  const allWines = useAppSelector(wines)

  const renderWines = (): JSX.Element[] => allWines.map(({ name }) => <p key={name}>{name}</p>)

  return <div>{renderWines()}</div>
}

export default Wines
