import React, { Component, useState, useEffect }  from 'react';
import landing from '../Assets/landing.jpg';
import '../App.css';
import {LoginForm} from '../Components/LoginForm'
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
  line-height: 2em;
  
}

h2 {
  font-size: xx-large;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 20px 20px 10px;
  line-height: 1.5em;
  
}

.nomargin{
  margin:0;
  font-size:18px;
  color: #FFDEB3;
}
`;

const MainContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
text-align: center;

@media (max-width: 600px) {
height:auto;
}

`;

const Header = styled.div`
padding: 1em;
`;

const Footer = styled.div`
padding: 1em;

`;

const ContentWrapper = styled.div`
flex: 1;
display: flex;
overflow-y: auto;
flex-direction: row;
@media (max-width: 600px) {
  flex-direction: column;
}
`

const Content = styled.div`
flex: 3;
overflow-y: auto;
@media (max-width: 600px) {
  flex: 1;
}

> div {
  padding: 1em;

> p {
  // font-size: 20px;
}

  :not(:last-child) {
    margin-bottom: 1em;
  }
}
`;

const SidePanel = styled.div`
flex:1;
min-width: 6em;
background-color: rgb(75, 98, 160);
padding: 1em;
padding-top:1em;
overflow-y:auto;
@media (max-width: 600px) {
  flex: 3;
}
`;

const ContentText = styled.div`
  text-align: left;
  text-indent: 40px;
  margin: 0em 0em 0em;
  font-size: x-large;
  line-height: 1.5em;
  color: #FFAE83;
  padding: 20px 20px 10px;
`
export function Landing()  {

    return (
        <MainContainer>
            <GlobalStyle />
            <ContentWrapper>
                <Content>
                <h1>WELCOME TO THE MOST POWERFUL DATA ANALYSIS TOOL IN THE WORLD</h1>
                <h2>SDA is the Business Intelligence platform all small and medium-sized businesses are looking for. Consisting of a completely online experience, powerful analysis tools and beautiful visualizations, you'll have to look no further in the quest for adding value to your organization. All you need is a working database on which to perform these queries.</h2>
                <ContentText>
                  <p>We are convinced that data analysis is key for improving a company's decision making. There is an endless number of questions we could answer just looking at our data...</p>
                  <ul>
                    <li>Which products are driving our revenue?</li>
                    <p className="nomargin">Desarrollo</p>
                    <li>Who should I promote to Customer Success Manager?</li>
                    <p className="nomargin">Desarrollo</p>
                    <li>Are we really improving our delivery time since we implemented the new system?</li>
                    <p className="nomargin">Desarrollo</p>
                    <li>Where should we open our new branch?</li>
                    <p className="nomargin">Desarrollo</p>
                    <li>What's the age distribution of our employees?</li>
                    <p className="nomargin">Desarrollo</p>
                  </ul>
                  <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <h2>This is great... but who is it for?</h2>
                  <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                  <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                  <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                </ContentText>
                </Content>
                <SidePanel>
                <LoginForm />
                <p className="nomargin">If you want to learn more about SDA and how it works, visit the <Link to="/docs">documentation</Link>.</p>
                <p className="nomargin">If you want to check out our users' actual connections, visit <Link to="/connections">connections</Link>.</p>
                <p className="nomargin">If you want to check out how a query runs like the wind, visit <Link to="/runquery/2">query results</Link>.</p>
                <p className="nomargin">If you want to simulate you've just logged in, visit your <Link to="/panel">panel</Link>.</p>
                <p className="nomargin">If you want to see the sentences stored visit your <Link to="/sentences">sentences</Link>.</p>
                </SidePanel>
            </ContentWrapper>
            {/* <Footer className="footer landing-text">Proyecto Final - Gonzalo Pérez Fariña</Footer> */}
        </MainContainer>
    );
  }
