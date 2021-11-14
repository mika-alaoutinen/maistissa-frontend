import React from 'react';
import Header from './components/header/Header';
import Router from './app/Router';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Router />
  </div>
);

export default App;
