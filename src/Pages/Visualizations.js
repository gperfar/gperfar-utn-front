import React, { useState, useEffect }  from 'react';
import '../App.css';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content} from '../GlobalStyles';

export function Visualizations (){

    const url = "https://gperfar-utn.herokuapp.com/visualizations";
    
    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.visualizations));
      }, []);

    return (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Visualizations</h1>
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
  