import React,{useEffect} from 'react';
import {CoolTextField} from './CoolTextField';
import {CoolButton} from './CoolButton'
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import usePersistentState from '../usePersistentState'
import { useAuth0 } from "@auth0/auth0-react";


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

    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    // const [redirect, setRedirect] = React.useState('');

    // const [login,setLogin] = usePersistentState('login',0)


    // async function tryLogin(){
    //   const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ 
    //           'email': email,
    //           'password': password})
    //   };
    //   const url = 'https://gperfar-utn.herokuapp.com/login';
    //   console.log(requestOptions);
    //   const response = await fetch(url, requestOptions);
    //   const data = await response.json();
    //   console.log(data);
    //   return data;
    // }

    // const handleEmailChange = (event) => {
    //   setEmail(event.target.value);
    // }

    // const handlePasswordChange = (event) => {
    //   setPassword(event.target.value);
    // }

    // const handleLogIn = (event) => {
    //   tryLogin().then((data) => {
    //     if(data.success) setLogin(parseInt(data.message));
    //   });
    // }

    // const handleRegister =(event) => {
    //   setRedirect('connections');
    // }


//  AUTH0 SECTION OF CONSTS
    const LoginButton = () => {
      const { loginWithRedirect } = useAuth0();
    
      return <button onClick={() => loginWithRedirect()}>Log In</button>;
    }
    
    const LogoutButton = () => {
      const { logout } = useAuth0();
    
      return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      );
    }

    const Profile = () => {
      const { user, isAuthenticated, isLoading } = useAuth0();
    
      if (isLoading) {
        return <div>Loading ...</div>;
      }
    
      return (
        isAuthenticated && (
          // <div>
          //   <img src={user.picture} alt={user.name} />
          //   <h2>{user.name}</h2>
          //   <p>{user.email}</p>
          // </div>
          <Redirect to='/panel' />
        )
      );
    }



    // if (login != 0) {
    //   return <Redirect to='/panel' />
    // }

    return(
        <MainWrapper>
          <Title>Log In</Title>
          <form>
            <LoginMainContainer>
              <Profile />
                {/* <CoolTextField type="text" label='Email' onChange={handleEmailChange} />
                <CoolTextField type="text" label='Password' type='password' onChange={handlePasswordChange} /> */}
                <LoginSideContainer>
                    <LoginButton />
                    <LogoutButton />
                    {/* <CoolButton onClick={handleLogIn}> Log In </CoolButton>
                    <CoolButton onClick={handleRegister}> Register </CoolButton> */}
                </LoginSideContainer>
            </LoginMainContainer>
          </form>
        </MainWrapper>
      );
    }
