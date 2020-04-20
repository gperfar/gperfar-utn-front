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
}

body * {
}
`;

const MainContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
text-align: center;

`;

const Header = styled.div`
padding: 1em;
border-bottom: 1px solid black;
`;

const Footer = styled.div`
border-top: 1px solid black;
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
margin: 2em;
@media (max-width: 600px) {
  flex: 1;
}

> div {
  padding: 1em;

  :not(:last-child) {
    margin-bottom: 1em;
  }
}
`;

const SidePanel = styled.div`
flex:1;
min-width: 6em;
border: 1px solid black;

@media (max-width: 600px) {
  flex: 3;
}
`;

export function Landing()  {
    // const url = "https://gperfar-utn.herokuapp.com/users";
    // // "https://dummy.restapiexample.com/api/v1/employees";
    
    // async function getResults() {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   console.log(data["result"].users)
    //   return data;
    // }
    // const [results, setResults] = useState([]);
    //   console.log(results);
    //   useEffect(() => {
    //     getResults().then(data => setResults(data.result.users));
    //   }, []);

    return (
        <MainContainer>
            <GlobalStyle />
            {/* <Header className="landing-text">Smplified Data Analysis</Header> */}
            <ContentWrapper>
                <Content>
                <h1 className="landing-text">Welcome to the most powerful data analysis tool in the world</h1>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>
                <p>Gonzalo Pérez Fariña is the greatest wizard of all time. He's often compared to other warlocks like Dumbledore, Voldemort and Grindelwald, as well as other universes' characters like Sauron, Gandalf, Saruman, or even Thor.</p>

                <nav>
                    <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    </ul>
                </nav>
                {/* {results.map(result => (
                    <div>{result.name}</div>
                ))} */}
                </Content>
                <SidePanel>
                <LoginForm />
                </SidePanel>
            </ContentWrapper>
            {/* <Footer className="footer landing-text">Proyecto Final - Gonzalo Pérez Fariña</Footer> */}
        </MainContainer>
    );
  }
