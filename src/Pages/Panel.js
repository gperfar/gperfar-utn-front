import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
// import SDAGrid from '../Components/Grid'


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
padding: 2em;

`;

const Content = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;

const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(340px, 1fr));
// flex-direction: row;
// flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
`;

const GridItem = styled.div`
height:200px;
width: 300px;
border: solid 1px black;
text-align: center;
margin: 20px;
`;

export function Panel (){
    return (
        <MainContainer>
          <GlobalStyle />
            <TopContainer>
              <Link to="/"><h4>Home</h4></Link>
              <Link to="/docs"><h4>Docs</h4></Link>
            </TopContainer>
            <Content>
              <h1>Panel</h1>
              <GridContainer>
                <GridItem><h2>Connections</h2></GridItem>
                <GridItem><h2>Sentences</h2></GridItem>
                <GridItem><h2>Visualizations</h2></GridItem>
                <GridItem><h2>Connections</h2></GridItem>
                <GridItem><h2>Connections</h2></GridItem>
                <GridItem><h2>Connections</h2></GridItem>
              </GridContainer>
            </Content>
        </MainContainer>
      );
    }
  