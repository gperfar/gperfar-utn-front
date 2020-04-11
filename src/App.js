import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


const CoolButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});


function handleChange(e) {
  console.log(e.target.value);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simplified Data Analysis</h2>
        </div>
        <p className="App-intro">I'm the best front-end developer in the world.</p>
        <p className="App-intro">However, I only barely know how to put components here... I have no idea how to get them to do anything.</p>
        <form>
            <TextField id="standard-basic" label="Standard" onChange={handleChange}/>
            <CoolButton className="App-logo">{this.props.hola} Do nothing</CoolButton>
        </form>
        
      </div>
    );
  }
}

export default App;
