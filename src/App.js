import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


const CoolButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});


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
        <p>
          However, I don't know how any of this works, so even though I can show a very cool looking button, I don't know how to do something with it
        </p>
        <CoolButton variant="contained" color="primary">Do nothing</CoolButton>
      </div>
    );
  }
}

export default App;
