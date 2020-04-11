import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simplified Data Analysis</h2>
        </div>
        <p className="App-intro">
          I'm the best front-end developer in the world.
        </p>
      </div>
    );
  }
}

export default App;
