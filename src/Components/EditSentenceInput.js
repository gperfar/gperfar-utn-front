import React, { useState, useEffect }  from 'react';
import {CoolButton} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
// import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
import {VisualQueryBuilder} from './VisualQueryBuilder';
import SDATable from './Table';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {ModelSelect} from './ModelSelect'

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function EditSentenceInput (props){
    const sentenceID = props.sentenceID;
    const { logout, user } = useAuth0();
    
    const [connectionID, setConnectionID] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [SQLQuery, setSQLQuery] = useState('');
    const [connections, setConnections] = useState([]);
    // const [sentence, setSentence] = useState([]);
    const [queryResults, setQueryResults] = useState([]);
    const [connectionStructure, setConnectionStructure] = useState([]);

    
    useEffect(() => {
        getSentenceData().then((data) =>{
            //   setSentence(data.result.sentence);
            setSQLQuery(data.result.sentence.sql_query);
            setComment(data.result.sentence.comment);
            setName(data.result.sentence.name);
            setConnectionID(data.result.sentence.connection_id);
        } );
    }, []);
    
    useEffect(() => {
        getConnections().then(data => {
            console.log(data.result.connections);
            setConnections(data.result.connections);
            
        });
    }, []);
    
    useEffect(() => {
        getQueryResults( 
            "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name != 'pg_stat_statements'"
            ).then(data => {
                setConnectionStructure(data.results);            
        });
    }, [connectionID]);
    
    async function getSentenceData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'sentence_id': sentenceID,
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/sentences', requestOptions);
        const data = await response.json();
        return data;
    }

    async function getConnections(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
        const data = await response.json();
        console.log(data.result);
        return data;
    }


    async function getQueryResults(sql_query = SQLQuery){
        const url = 'https://gperfar-utn.herokuapp.com/runtemporaryquery';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connection_id': connectionID,
                'sql_query': sql_query})
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

    async function createSentence(){
        const url = 'https://gperfar-utn.herokuapp.com/sentence/create';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
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
        saveEditedSentence().then(data=> {
            console.log(data)
            alert('Sentence saved successfully!');
        });
    }

    const handleCreate = (event) => {
        createSentence().then(data=> {
            console.log(data);
            alert("Sentence created successfully!");          
        });
    }


    const handleTest = (event) => {
        getQueryResults().then(data => setQueryResults(data.results))        
    }
    
    return (
            <div>
                {/* <form > */}
                    <ContainerVertical>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Sentence Name' onChange={handleNameChange} />
                            <ModelSelect title='Connection' list={connections} state={{ selectedID: [connectionID, setConnectionID] }} />
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                        {typeof(connectionStructure) !== 'undefined'?
                            <VisualQueryBuilder connectionStructure={connectionStructure} state={{ query: [SQLQuery, setSQLQuery] }} />:
                            <p>{typeof(connectionStructure)}</p>
                        }
                        {/* <CoolTextField value={SQLQuery} multiline type="text" placeholder='SELECT * FROM movies WHERE stars = 5' label='SQL Query' onChange={handleSQLQueryChange} /> */}
                    </ContainerVertical>
                {/* </form> */}
                <SDATable info={queryResults} />
                    <div>
                        <CoolButton onClick={handleTest}> Test </CoolButton>
                        {/* <CoolButton onClick={handleSave}> Save </CoolButton> */}
                        {sentenceID > 0? 
                                <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Sentence </CoolButton>
                        }
                    </div>
            </div>
      );
    }