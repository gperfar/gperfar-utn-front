import React, { Component, useState, useEffect }  from 'react';
import '../App.css';
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {CoolButton} from '../Components/CoolButton';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content} from '../GlobalStyles';


const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(340px, 1fr));
justify-content: space-evenly;
align-items: center;
`;

const GridItem = styled.div`
height:200px;
width: 300px;
background-color: rgb(240,240,240);
border: solid 1px rgb(210,210,210);
text-align: center;
margin: 20px;
`;

export function Panel (){
    return (
        <MainContainer>
          <GlobalStyle />
            <NavBar />
            <Content>
              <h1>Panel</h1>
              <GridContainer>
                <GridItem>
                  <h2>My Dashboard 1</h2>
                  <p> Some information about it </p>
                </GridItem>
                <GridItem>
                  <h2>My Dashboard 2</h2>
                  <p> Some information about it </p>
                </GridItem>
                <GridItem>
                  <h2>My Dashboard 3</h2>
                  <p> Some information about it </p>
                </GridItem>
                <GridItem>
                  <h2>My Dashboard 4</h2>
                  <p> Some information about it </p>
                </GridItem>
                <GridItem>
                  <h2>My Dashboard 5</h2>
                  <p> Some information about it </p>
                </GridItem>
                <GridItem>
                  <h2>My Dashboard 6</h2>
                  <p> Some information about it </p>
                </GridItem>
              </GridContainer>
            </Content>
        </MainContainer>
      );
    }
  