import React, { Component, useState, useEffect }  from 'react';
import landing from './Assets/landing.jpg';
import './App.css';
import {LoginForm} from './Components/LoginForm'
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

body * {
}
`;

const MainContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
`;

const Header = styled.div`
padding: 1em;
border-bottom: 1px solid black;

`;

const Footer = styled.div`
border-top: 1px solid black;
padding: 1em;

`;

const ContentWrapper = styled.div`
flex: 1;
display: flex;
overflow-y: hidden;

@media (max-width: 300px) {
  flex-direction: column;
}
`

const Content = styled.div`
flex: 1;
overflow-y: scroll;

> div {
  padding: 1em;

  :not(:last-child) {
    margin-bottom: 1em;
  }
}
`;

const SidePanel = styled.div`
min-width: 3em;
border-left: 1px solid black;

`;


export default function App()  {
    // const url = "https://gperfar-utn.herokuapp.com/users";
    // // "https://dummy.restapiexample.com/api/v1/employees";
    
    // async function getResults() {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   console.log(data["result"].users)
    //   return data;
    // }
    // const [results, setResults] = useState([]);
    //   console.log(results);
    //   useEffect(() => {
    //     getResults().then(data => setResults(data.result.users));
    //   }, []);

    return (
      <div className="App">
        <MainContainer>
          <GlobalStyle />
            <Header>Smplified Data Analysis</Header>
            <ContentWrapper>
              <Content>
                <h3>Welcome to the most powerful data analysis tool in the world</h3>
                {/* {results.map(result => (
                  <div>{result.name}</div>
                ))} */}
              </Content>
              <SidePanel>
                <LoginForm />
              </SidePanel>
            </ContentWrapper>
            <Footer>Proyecto Final - Gonzalo Pérez Fariña</Footer>
        </MainContainer>
      </div>
    );
  }
