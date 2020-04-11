import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';

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
        <Button variant="contained" color="primary">Do nothing</Button>
      </div>
    );
  }
}

export default App;
