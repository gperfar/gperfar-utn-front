import React, { useState, useEffect }  from 'react';
import {CoolButton} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
import SDATable from './Table';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function EditConnectionInput (props){
    const connectionID = props.connectionID;

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    // const [connectionID, setConnectionID] = useState(0);
    // const [SQLQuery, setSQLQuery] = useState('');

    const { logout, user } = useAuth0();

    async function getConnectionData(){
        console.log('Getting connection data...')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connection_id': connectionID,
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
        const data = await response.json();
        console.log(data.result);
        return data;
    }

    const [connection, setConnection] = useState([]);
    useEffect(() => {
      getConnectionData().then((data) =>{
          setComment(data.result.connection.comment);
          setName(data.result.connection.name);
        } );
    }, []);

    async function saveEditedConnection(){
        const url = 'https://gperfar-utn.herokuapp.com/connection/edit';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connection_id': connectionID,
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
    
    // const handleSQLQueryChange = (event) => {
    //     setSQLQuery(event.target.value);
    //   }

    const handleSave = (event) => {
        // getQueryResults().then(data => setQueryResults(data.results))   
        saveEditedConnection().then(data=> console.log(data));     
    }

    // const handleTest = (event) => {
    //     getQueryResults().then(data => setQueryResults(data.results))        

    // }
    
    return (
            <div>
                <form >
                    <ContainerVertical>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Sentence Name' onChange={handleNameChange} />
                            {/* <ConnectionSelect connections={connections} state={{ connectionID: [connectionID, setConnectionID] }} /> */}
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                        {/* <CoolTextField value={SQLQuery} multiline type="text" label='SQL Query' onChange={handleSQLQueryChange} /> */}
                    </ContainerVertical>
                </form>
                {/* <SDATable info={queryResults} /> */}
                    <div>
                        {/* <CoolButton onClick={handleTest}> Test </CoolButton> */}
                        <CoolButton onClick={handleSave}> Save </CoolButton>
                    </div>
            </div>
      );
    }