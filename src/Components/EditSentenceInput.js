import React, { useState, useEffect }  from 'react';
import {CoolButton} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
import SDATable from './Table';
import styled from "styled-components";

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function EditSentenceInput (props){
    const sentenceID = props.sentenceID;

    const [connectionID, setConnectionID] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [SQLQuery, setSQLQuery] = useState('');


    async function getSentenceData() {
        const url = "https://gperfar-utn.herokuapp.com/sentences?id="+sentenceID.toString();
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const [sentence, setSentence] = useState([]);
    useEffect(() => {
      getSentenceData().then((data) =>{
          setSentence(data.result.sentence);
          setSQLQuery(data.result.sentence.sql_query);
          setComment(data.result.sentence.comment);
          setName(data.result.sentence.name);
          setConnectionID(data.result.sentence.connection_id);
        } );
    }, []);

    async function getConnections() {
        const url = "https://gperfar-utn.herokuapp.com/connections";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const [connections, setConnections] = useState([]);
      useEffect(() => {
        getConnections().then(data => setConnections(data.result.connections));
      }, []);

    async function getQueryResults(){
        const url = 'https://gperfar-utn.herokuapp.com/runtemporaryquery';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connection_id': connectionID,
                'sql_query': SQLQuery})
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    async function saveEditedSentence(){
        const url = 'https://gperfar-utn.herokuapp.com/sentence/edit';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'sentence_id':sentenceID,
                'connection_id': connectionID,
                'sql_query': SQLQuery,
                'comment': comment,
                'name': name})
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    const [queryResults, setQueryResults] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    
    const handleSQLQueryChange = (event) => {
        setSQLQuery(event.target.value);
      }

    const handleSave = (event) => {
        getQueryResults().then(data => setQueryResults(data.results))   
        saveEditedSentence().then(data=> console.log(data));     
    }

    const handleTest = (event) => {
        getQueryResults().then(data => setQueryResults(data.results))        

    }
    
    return (
            <div>
                <form >
                    <ContainerVertical>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Sentence Name' onChange={handleNameChange} />
                            <ConnectionSelect connections={connections} state={{ connectionID: [connectionID, setConnectionID] }} />
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                        <CoolTextField value={SQLQuery} multiline type="text" label='SQL Query' onChange={handleSQLQueryChange} />
                    </ContainerVertical>
                </form>
                <SDATable info={queryResults} />
                    <div>
                        <CoolButton onClick={handleTest}> Test </CoolButton>
                        <CoolButton onClick={handleSave}> Save </CoolButton>
                    </div>
            </div>
      );
    }