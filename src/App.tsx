import React, { useEffect, useState } from 'react'
import './App.css'
import Counter from './features/counter/Counter'
import { Wine } from './generated/models/Wine'
import wineService from './services/wineService'

const App: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([])

  useEffect(() => {
    const fetchWines = async (): Promise<void> => {
      setWines(await wineService.getWines())
    }
    void fetchWines()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Number of wines {wines ? wines.length : 0}</h2>

        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className='App-link'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux-toolkit.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className='App-link'
            href='https://react-redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}

export default App
