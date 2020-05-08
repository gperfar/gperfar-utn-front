import React, { Component } from 'react';
// import '../App.css';
import {CoolTextField} from './CoolTextField';
import {CoolButton} from './CoolButton'
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
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
text-align: center;
background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
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
        password:'',
        redirect: ''
      };
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);    
      this.handleSubmit = this.handleSubmit.bind(this); //I think it's not necessary to bind them with this way of having it... but it doesn't break anything!
      this.handleRegister = this.handleRegister.bind(this);
    }
    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }
    handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }
    handleSubmit(event) {
      this.setState(()=>({
        redirect: 'panel'
      }))
      // alert('I can\'t log you in, ' + this.state.email + '! But worry not, I won\'t tell anyone your password is ' + this.state.password);
    }
    handleRegister(event) {
      this.setState(()=>({
        redirect: 'connections'
      }))
      // event.preventDefault();
      // alert('You don\'t want to register to this crappy platform, my man.');
    }
    render() {

      if (this.state.redirect === 'panel') {
        return <Redirect to='/panel' />
      }
      if (this.state.redirect === 'connections') {
        return <Redirect to='/connections' />
      }

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
  