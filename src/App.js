import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CoolButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Hola'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('Hello ' + this.state.value + '!');
    window.location.href = "http://google.com/search?q=" + this.state.value;    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField type="text" label='Google Query' onChange={this.handleChange} />
        <CoolButton type="submit" className="App-logo"> HIT IT! </CoolButton>
      </form>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simplified Data Analysis</h2>
          <NavBar/>
        </div>
        <p className="App-intro">I'm the best front-end developer in the world.</p>
        <p className="App-intro">However, I only barely know how to put components here... I have no idea how to get them to do anything.</p>
        <NameForm />
      </div>
    );
  }
}

export default App;
