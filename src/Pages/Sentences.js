import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import {ModelCard} from '../Components/ModelCard';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

h1, h2 {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 {
  font-size: 48pt;  
}
h2 {
  padding: 0.5em;
}
h4{
  padding-right: 1em;
  margin-bottom:10px;
  margin-left:10px;
  color: #FFDEB3;
}
ul{
  margin:0;
}
`;

const MainContainer = styled.div`
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content:center;
background-color: rgb(75, 98, 160);
height:100vh;
@media (max-width: 600px) {
  flex-direction: column;
  height: auto;
}

`;

const SideContainer = styled.div`
flex:1;
display: flex;
flex-direction: column;
justify-content:left;
padding: 1em;

`;

const Content = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;



export function Sentences (){

    const url = "https://gperfar-utn.herokuapp.com/sentences";
    
    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.sentences));
      }, []);

    return (
        <MainContainer>
          <GlobalStyle />
            <SideContainer>
              <Link to="/panel"><h4>Panel</h4></Link>
              <Link to="/connections"><h4>Connections</h4></Link>
              <Link to="/runquery/2"><h4>Sample Query Results</h4></Link>
              <Link to="/docs"><h4>Docs</h4></Link>
              <Link to="/"><h4>Log out</h4></Link>
            </SideContainer>
            <Content>
              <h1>Sentences</h1>
              {results.map(result => (
                <div>
                  <h2>{result.name}</h2>
                  <ModelCard object={result}/>
                </div>
                ))}
            </Content>
            <SideContainer>

            </SideContainer>
        </MainContainer>
      );
    }
  