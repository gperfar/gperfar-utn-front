import React, { useState, useEffect }  from 'react';
import '../App.css';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";


export function Connections (){

  
  // async function getResults() {
  //     const url = "https://gperfar-utn.herokuapp.com/connections";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     return data;
  //   }

    const { user } = useAuth0();
    async function getResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }


    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.connections));
      }, []);

    return (
      <MainContainer>
        <NavBar />
        <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Connections</h1>
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
  