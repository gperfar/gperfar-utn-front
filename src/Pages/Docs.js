import React, { Component } from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: rgb(2,0,36);
  background: linear-gradient(132deg, rgba(2,0,36,1) 0%, rgba(29,41,113,1) 60%);
}

h1 {
  font-size: 48pt;  
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2, h4 {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 1em;
}

p{
  text-indent: 40px;
}
`;

const DocsMainContainer = styled.div`
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content:center;

background: rgb(2,0,36);
background: linear-gradient(132deg, rgba(2,0,36,1) 0%, rgba(29,41,113,1) 60%);
height:100vh;

`;

const DocsSideContainer = styled.div`
flex:1;
display: flex;
flex-direction: column;
justify-content:left;
padding: 2em;
`;

const DocsContent = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;

export class Docs extends React.Component {
    render() {
      return (
        <DocsMainContainer>
          <GlobalStyle />
            <DocsSideContainer />
            <DocsContent>
              <h1> Simplified Data Analysis </h1>
              <h2 id="overview">Overview</h2>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <h2 id="connectors">Connectors</h2>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
              <h2 id="transformations">Transformations</h2>
              <p>Executing SQL queries is good. Doing it without knowing SQL is awesome. Building queries based on other queries (what from now on we will call transformations) is beyond this universe!</p>
            </DocsContent>
            <DocsSideContainer>
              <Link to="/">Go Home</Link>
              <nav>
                <h4>Table of Contents</h4>
                <ul>
                  <li><a href="#overview">Overview</a></li>
                  <li><a href="#connectors">Available Connectors</a></li>
                  <li><a href="#transformations">Transformations</a></li>
                </ul>
              </nav>
            </DocsSideContainer>
        </DocsMainContainer>
      );
    }
  }
  