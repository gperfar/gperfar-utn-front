import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import {CoolButton} from './CoolButton'

export class LoginForm extends React.Component {
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
        <div className="Base">
          <p>Insert fake credentials!</p>
          <form onSubmit={this.handleSubmit}>
            <label ><TextField className="login-input" type="text" label='Email' onChange={this.handleEmailChange} /></label>
            <label ><TextField className="login-input" type="text" label='Password' type='password' onChange={this.handlePasswordChange} /></label>
            <div className="Container">
              <label className="Base" name="login"><CoolButton type="submit"> Log In </CoolButton></label>
              <label className="Base" name="register"><CoolButton onClick={this.handleRegister}> Register </CoolButton></label>
            </div>
          </form>
        </div>
      );
    }
  }
  