import React,{useEffect} from 'react';
import {CoolTextField} from './CoolTextField';
import {CoolButton} from './CoolButton'
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import usePersistentState from '../usePersistentState'


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

    const [login,setLogin] = usePersistentState('login')


    async function tryLogin(){
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              'email': email,
              'password': password})
      };
      const url = 'https://gperfar-utn.herokuapp.com/login';
      console.log(requestOptions);
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    }



    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
      // alert('I can\'t log you in, ' + email + '! But worry not, I won\'t tell anyone your password is ' + password);
      // setRedirect('panel');
      tryLogin().then(data => setLogin(data.message));
    }
    const handleLogIn = (event) => {
      tryLogin().then((data) => {
        console.log(data);
        if(data.success) setLogin(data.message);
      });
    }

    const handleLogOut = (event) => {
        setLogin(0);
    }

    const handleRegister =(event) => {
      setRedirect('connections');
    }

    if (login != 0) {
      alert('welcome, '+ login.toString());
    }
    if (redirect === 'connections') {
      return <Redirect to='/connections' />
    }
    return(
        <MainWrapper>
          <Title>Log In {login}</Title>
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
          <CoolButton onClick={handleLogIn}> Log in test </CoolButton>
          <CoolButton onClick={handleLogOut}> Log out test </CoolButton>
        </MainWrapper>
      );
    }
  