import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import EnhancedTable from '../Components/Table';
import SDALineChart from '../Components/LineChart';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

h1, h2, h3 {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px;   
}

h1 {
  font-size: 48pt;  
  margin-top: 10px;
  margin-bottom: 10px;
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

const TopContainer = styled.div`
display: flex;
flex-direction: row;
justify-content:left;
`;

const Content = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;

export function RunQuery (){

    let { id } = useParams();

    const url = "https://gperfar-utn.herokuapp.com/runquery?sentence_id=".concat(id);
    
    async function getResults() {
      console.log("Fetching results from ".concat(url).concat("..."));
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    const [results, setResults] = useState([]);
      useEffect(() => {
        getResults().then(data => setResults(data.results));
      }, []);


    const [sentence, setSentence] = useState([]);
      useEffect(() => {
        getResults().then(data => setSentence(data.sentence));
      }, []);


    const [connection, setConnection] = useState([]);
      useEffect(() => {
        getResults().then(data => setConnection(data['connection name']));
      }, []);


    return (
        <MainContainer>
          <GlobalStyle />
            <TopContainer>
              <Link to="/panel"><h4>Panel</h4></Link>
              <Link to="/connections"><h4>Connections</h4></Link>
              <Link to="/runquery/2"><h4>Sample Query Results</h4></Link>
              <Link to="/docs"><h4>Docs</h4></Link>
              <Link to="/"><h4>Log out</h4></Link>
            </TopContainer>
            <Content>
              <h1>Query Results</h1>
              <h2>Connection: {connection}</h2>
              <h3>Query: {sentence}</h3>
              <EnhancedTable info={results}/>
              <SDALineChart />
            </Content>
        </MainContainer>
      );
    }
  