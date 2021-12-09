import React from 'react';
import Header from './components/header/Header';
import Router from './app/Router';
import styles from './App.module.css';

const App: React.FC = () => (
  <div id={styles.App}>
    <Header />
    <Router />
  </div>
);

export default App;
