import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Router from './app/Router';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Navigation />
    <Router />
  </div>
);

export default App;
