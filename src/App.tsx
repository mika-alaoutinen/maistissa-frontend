import React from 'react';
import Header from './components/Header';
import ReviewPage from './views/ReviewPage';
import WinePage from './views/WinePage';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <WinePage />
    <ReviewPage />
  </div>
);

export default App;
