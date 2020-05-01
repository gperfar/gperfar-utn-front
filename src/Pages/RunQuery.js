import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import SDATable from '../Components/Table';
import SDALineChart from '../Components/LineChart';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content} from '../GlobalStyles';

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
            <NavBar />
            <Content>
              <h1>Query Results</h1>
              <h2>Connection: {connection}</h2>
              <h3>Query: {sentence}</h3>
              <SDATable info={results}/>
              <SDALineChart />
            </Content>
        </MainContainer>
      );
    }
  