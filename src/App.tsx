import React from 'react';
import './App.css';
import Search from './components/Search/search';
import { Users } from './mock';

function App() {
  return (
    <div className="App">
      <h1>Demo Search App</h1>
      <Search users={Users}/>
    </div>
  );
}

export default App;
