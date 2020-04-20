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
  border: 1px solid black;
}
`;

const MainContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
`;

const Header = styled.div`
padding: 1em;
`;

const Footer = styled.div``;

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
min-width: 7em;
`;


export default function App()  {
    const url = "https://gperfar-utn.herokuapp.com/users";
    // "https://dummy.restapiexample.com/api/v1/employees";
    
    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data["result"].users)
      return data;
    }
    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data["result"].users));
      }, []);

    return (
      <div className="App">
        <MainContainer>
          <GlobalStyle />
          <Header>Header</Header>
          <ContentWrapper>
            <Content>
              {results.map(result => (
                <div>{result.name}</div>
              ))}
            </Content>
            <SidePanel>
              <LoginForm />
            </SidePanel>
          </ContentWrapper>
          <Footer>Footer</Footer>
        </MainContainer>
      </div>
    );
  }
