import React, { Component } from 'react';
// import '../App.css';
import {CoolTextField} from './CoolTextField';
import {CoolButton} from './CoolButton'
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const MainWrapper = styled.div`
`

const LoginMainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content:center;

`;

const LoginSideContainer = styled.div`
justify-content:center;
display: flex;
padding: 1em;
flex-direction: row;

@media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Title = styled.h4`
color: #FFDEB3;  
margin: 0;
font-size: xx-large;
padding: 2em 1em 0.5em;
line-height: 1.5em;
`

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
        <MainWrapper>
          <Title>Log In</Title>
          <form onSubmit={this.handleSubmit}>
            <LoginMainContainer>
                <CoolTextField type="text" label='Email' onChange={this.handleEmailChange} />
                <CoolTextField type="text" label='Password' type='password' onChange={this.handlePasswordChange} />
                <LoginSideContainer>
                    <CoolButton type="submit"> Log In </CoolButton>
                    <CoolButton onClick={this.handleRegister}> Register </CoolButton>
                </LoginSideContainer>
            </LoginMainContainer>
          </form>
        </MainWrapper>
      );
    }
  }
  