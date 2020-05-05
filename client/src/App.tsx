import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

const getData = () => {
  axios.get('/api/bugs')
  .then((response: object) => {
    console.log(response);
  })
}

function App() {
  getData();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save me.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
