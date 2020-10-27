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

    const LoginButton = () => {
      const { loginWithRedirect } = useAuth0();
    
      return <CoolButton onClick={() => loginWithRedirect()}>Log In / Register</CoolButton>;
    }

    const LoggedRedirect = () => {
      const {isAuthenticated} = useAuth0();

      return (
        isAuthenticated && (
          <Redirect to='/panel' />
        )
      );
    }

    return(
      
        <MainWrapper>
          <LoginMainContainer>
            <LoggedRedirect />
              <LoginSideContainer>
                  <LoginButton />
              </LoginSideContainer>
          </LoginMainContainer>
        </MainWrapper>
      );
    }
