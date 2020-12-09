import React, { useState, useEffect }  from 'react';
import '../App.css';
import { useParams } from "react-router-dom";
import SDATable from '../Components/Table';
import SDALineChart from '../Components/Visualizations/LineChart';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, Content} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";

export function RunQuery (){

    let { id } = useParams();

    
    async function getResults() {
      const url = "https://gperfar-utn.herokuapp.com/runquery?sentence_id=".concat(id);
      console.log("Fetching results from ".concat(url).concat("..."));
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
// NO PODEMOS PASARLO A POST PORQUE TODAVÍA NO HAY UN RUNQUERY QUE FUNCIONE POR POST
    // const { user } = useAuth0();
    // async function getResults(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ 
    //             'user_id': user.sub})
    //     };
    //     const response = await fetch('https://gperfar-utn.herokuapp.com/visualizations', requestOptions);
    //     const data = await response.json();
    //     console.log(data.results);
    //     return data;
    // }

    const [results, setResults] = useState([]);
      useEffect(() => {
        getResults().then(data => setResults(data.results));
      }, []);


    const [sentence, setSentence] = useState([]);
      useEffect(() => {
        getResults().then(data => setSentence(data.sentence));
      }, []);


    const [connection, setConnection] = useState([]);
      useEffect(() => {
        getResults().then(data => setConnection(data['connection name']));
      }, []);


    return (
        <MainContainer>
          <GlobalStyle />
            <NavBar />
            <Content>
              <h1>Query Results</h1>
              <h2>Connection: {connection}</h2>
              <h3>Query: {sentence}</h3>
              <SDATable info={results}/>
              <SDALineChart />
            </Content>
        </MainContainer>
      );
    }
  