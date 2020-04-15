import React, { Component } from 'react';
import logo from './Assets/logo.svg';
import landing from './Assets/landing.jpg';
import './App.css';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CoolButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 1,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 40,
  width: 100
  // padding: '0 30px',
});


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this); //I think it's not necessary to bind them with this way of having it... but it doesn't break anything!
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    alert('I can\'t log you in, ' + this.state.email + '! But worry not, I won\'t tell anyone your password is ' + this.state.password);
    event.preventDefault();
  }
  handleRegister(event) {
    alert('You don\'t want to register to this crappy platform, my man.');
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <p className="Base">Insert fake credentials!</p>
        <form onSubmit={this.handleSubmit}>
          <label ><TextField className="Base login-input" type="text" label='Email' onChange={this.handleEmailChange} /></label>
          <label ><TextField className="Base login-input" type="text" label='Password' type='password' onChange={this.handlePasswordChange} /></label>
          <div className="Container">
            <label className="Base" name="login"><CoolButton type="submit"> Log In </CoolButton></label>
            <label className="Base" name="register"><CoolButton onClick={this.handleRegister}> Register </CoolButton></label>
          </div>
        </form>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="Container">
          <img src={landing} className="Landing"/>
          <div className = "landing-text">
            <p>Welcome to the most powerful Data Analysis tool in the world.</p>
          </div>
          <label className="login-form"><LoginForm/></label>
        </div>
      </div>
    );
  }
}

export default App;
