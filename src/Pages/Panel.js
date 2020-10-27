import React, { useState, useEffect }  from 'react';
import '../App.css';
import styled from "styled-components";
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, Content} from '../GlobalStyles';
import usePersistentState from '../usePersistentState'


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

    const url = "https://gperfar-utn.herokuapp.com/dashboards";
    
    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    const [login,setLogin] = usePersistentState('login')



    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.dashboards));
      }, []);
    return (
        <MainContainer>
          <GlobalStyle />
            <NavBar />
            <Content>
              <h1>Panel</h1>
              <GridContainer>
                {results.map(result => (
                  <GridItem>
                    <h2>{result.name}</h2>
                    <p className="panel-card-p"> {result.comment} </p>
                  </GridItem>
                    ))}
              </GridContainer>
            </Content>
        </MainContainer>
      );
    }
  