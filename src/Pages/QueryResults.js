import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import {ConnectionCard} from '../Components/ConnectionCard';
import EnhancedTable from '../Components/Table';
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

const QueryResultsMainContainer = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
justify-content:center;
background-color: rgb(75, 98, 160);
height:100vh;
@media (max-width: 600px) {
//   flex-direction: column;
  height: auto;
}

`;

const QueryResultsTopContainer = styled.div`
display: flex;
flex-direction: row;
justify-content:left;
padding: 2em;

`;

const QueryResultsContent = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;



export function QueryResults (){

    const url = "https://gperfar-utn.herokuapp.com/runquery?sentence_id=2";
    
    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.results));
      }, []);

    return (
        <QueryResultsMainContainer>
          <GlobalStyle />
            <QueryResultsTopContainer>
              <Link to="/"><h4>Home</h4></Link>
              <Link to="/docs"><h4>Docs</h4></Link>
            </QueryResultsTopContainer>
            <QueryResultsContent>
              <h1>Query Results</h1>
              <EnhancedTable info={results}/>
            </QueryResultsContent>
        </QueryResultsMainContainer>
      );
    }
  