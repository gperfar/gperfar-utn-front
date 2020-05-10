import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content} from '../GlobalStyles';
import {NewSentenceInput} from '../Components/NewSentenceInput';
import SDATable from '../Components/Table';

export function Sentences (props){

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
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Sentences</h1>
                <h2><Link to='/sentences/new'> Create new Sentence... </Link></h2>
                {results.map(result => (
                  <div>
                    <h2>{result.name}</h2>
                    <ModelCard object={result}/>
                  </div>
                  ))}
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
      );
    }
  
  export function NewSentence (props){
    return (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Add new Sentence</h1>
                <NewSentenceInput />
                {/* <SDATable info={queryResults.results}/> */}
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
      );
    }