import React  from 'react';
import '../App.css';
import {LoginForm} from '../Components/LoginForm'
import styled from "styled-components";
import {GlobalStyle, MainContainer} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";


const LandingContent = styled.div`
flex: 3;
overflow-y: auto;
background: rgb(2,0,36);
padding: 2em 6em;
background: linear-gradient(132deg, rgba(2,0,36,1) 0%, rgba(29,41,113,1) 60%);
@media (max-width: 600px) {
  flex: 1;
}
`;

const LandingContentText = styled.div`
  text-align: left;
  text-indent: 40px;
  margin: 0em 0em 0em;
  font-size: x-large;
  line-height: 1.5em;
  color: #FFAE83;
  padding: 20px 20px 10px;
`

export function Landing()  {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <MainContainer>
        <GlobalStyle />
          <LandingContent>
            <h1 className="landing-title">Loading...</h1>
          </LandingContent>
      </MainContainer>
    );
  }

    return (
      <MainContainer>
        <GlobalStyle />
        <LandingContent>
          <LoginForm />
          <h1 className="landing-title">WELCOME TO THE MOST POWERFUL DATA ANALYSIS TOOL IN THE WORLD</h1>
          <h2 className="landing-subtitle">SDA is the Business Intelligence platform all small and medium-sized businesses are looking for. Consisting of a completely online experience, powerful analysis tools and beautiful visualizations, you'll have to look no further in the quest for adding value to your organization. All you need is a working database on which to perform these queries.</h2>
          <LandingContentText>
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
          </LandingContentText>
        </LandingContent>
      </MainContainer>
    );
  }
