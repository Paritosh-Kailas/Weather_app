import { useState } from 'react';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Settings } from './pages/Settings';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="container">
      <Search />
    </div>
  );
}

export default App;