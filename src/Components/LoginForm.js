import React from 'react';
import {CoolTextField} from './CoolTextField';
import {CoolButton} from './CoolButton'
import styled from "styled-components";
import { Redirect } from "react-router-dom";
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

export function LoginForm(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [redirect, setRedirect] = React.useState('');

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
      // alert('I can\'t log you in, ' + email + '! But worry not, I won\'t tell anyone your password is ' + password);
      setRedirect('panel');
    }

    const handleRegister =(event) => {
      setRedirect('connections');
    }

    if (redirect === 'panel') {
      return <Redirect to='/panel' />
    }
    if (redirect === 'connections') {
      return <Redirect to='/connections' />
    }
    return(
        <MainWrapper>
          <Title>Log In</Title>
          <form onSubmit={handleSubmit}>
            <LoginMainContainer>
                <CoolTextField type="text" label='Email' onChange={handleEmailChange} />
                <CoolTextField type="text" label='Password' type='password' onChange={handlePasswordChange} />
                <LoginSideContainer>
                    <CoolButton type="submit"> Log In </CoolButton>
                    <CoolButton onClick={handleRegister}> Register </CoolButton>
                </LoginSideContainer>
            </LoginMainContainer>
          </form>
        </MainWrapper>
      );
    }
  