import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import {CoolButton} from './CoolButton'
import styled, { createGlobalStyle } from "styled-components";

const LoginMainContainer = styled.div`
display: flex;
padding: 1em;
flex-direction: column;
justify-content:center;

`;

const LoginSideContainer = styled.div`
justify-content:center;
display: flex;
padding: 1em;
flex-direction: row;

@media (max-width: 1000px) {
    flex-direction: column;
  }
`;

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
        <div>
          <p>Insert fake credentials!</p>
          <form onSubmit={this.handleSubmit}>
            <LoginMainContainer>
                <TextField type="text" label='Email' onChange={this.handleEmailChange} />
                <TextField type="text" label='Password' type='password' onChange={this.handlePasswordChange} />
                <LoginSideContainer>
                    <CoolButton type="submit"> Log In </CoolButton>
                    <CoolButton onClick={this.handleRegister}> Register </CoolButton>
                </LoginSideContainer>
            </LoginMainContainer>
          </form>
        </div>
      );
    }
  }
  