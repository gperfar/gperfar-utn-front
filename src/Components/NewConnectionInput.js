import React, { useState, useEffect }  from 'react';
import {CoolButton} from './CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {ConnectionTypeSelect} from './ConnectionTypeSelect';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function NewConnectionInput (props){
    
    const { logout, user, isAuthenticated } = useAuth0();

    // async function getTypes(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ 
    //             'user_id': user.sub})
    //     };
    //     const response = await fetch('https://gperfar-utn.herokuapp.com/connections/types', requestOptions);
    //     const data = await response.json();
    //     console.log(data.results);
    //     return data;
    // }

    async function getConnectionTypes() {
        const url = "https://gperfar-utn.herokuapp.com/connections/types";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.result);
        return data.result;
    }


    async function saveConnection(){
        const url = 'https://gperfar-utn.herokuapp.com/connection/create';
        let requestOptions={}
        if (conntype == "postgres") {
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    'name': name,
                    'comment': comment,
                    'user_id': user.sub,
                    'type': "postgres",
                    'host': hostname,
                    'database': database,
                    'username': username,
                    'password': password
                })
            };
        }
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }


    const [results, setResults] = useState([]);
      useEffect(() => {
        getConnectionTypes().then(data => setResults(data["connection types"]));
      }, []);

    const [conntype, setConnType] = useState();
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [queryResults, setQueryResults] = useState([]);


    // Postgres-specific fields
    const [hostname, setHostname] = useState();
    const [database, setDatabase] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    

    const handleCreate = (event) => {
        console.log("Saving connection...")
        saveConnection().then(data=> console.log(data));          
    }

    const handleTest = (event) => {
        // getQueryResults().then(data => setQueryResults(data.results))        

    }
    if (!isAuthenticated) {
        return (
            <Redirect to={'/'} />
            )
      }
    //   if (redirect === 'edit') {
    //     return <Redirect to={'/sentences/edit/'+ selectedSentence.toString()} />
    //   }

    return (
            <div>
                <form >
                    <ContainerVertical>
                        <ContainerHorizontal>
                            <CoolTextField style={{minWidth: 200}} type="text" label='Connection Name' onChange={handleNameChange} />
                            <ConnectionTypeSelect types={results} state={{ conntype: [conntype, setConnType] }} />
                        </ContainerHorizontal>
                        <CoolTextField type="text" label='Comment' onChange={handleCommentChange} />
                        <SpecificTypeFields 
                            conntype={conntype} 
                            state={{ 
                                hostname: [hostname, setHostname],
                                database: [database, setDatabase],
                                username: [username, setUsername],
                                password: [password, setPassword]
                                }} 
                        />
                        <ContainerHorizontal><CoolButton onClick={handleCreate}> Create </CoolButton></ContainerHorizontal>
                        {/* <CoolTextField multiline type="text" label='SQL Query' onChange={handleSQLQueryChange} /> */}
                        <p>{hostname} is the hostname, {password} is the password</p>
                    </ContainerVertical>
                </form>
            </div>
      );
    }

    export function SpecificTypeFields (props){
        const {hostname: [hostname, setHostname]} = {type: React.useState(),...(props.state || {})};
        const {database: [database, setDatabase]} = {type: React.useState(),...(props.state || {})};
        const {username: [username, setUsername]} = {type: React.useState(),...(props.state || {})};
        const {password: [password, setPassword]} = {type: React.useState(),...(props.state || {})};
          
        const handleHostnameChange = (event) => {
            setHostname(event.target.value);
        }
        const handleDatabaseChange = (event) => {
            setDatabase(event.target.value);
        }
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        }
        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        }

        if (props.conntype == "postgres") {
            return (
                <ContainerVertical>
                    <CoolTextField type="text" label='Hostname' onChange={handleHostnameChange} />
                    <CoolTextField type="text" label='Database' onChange={handleDatabaseChange} />
                    {/* <ContainerHorizontal> */}
                        <CoolTextField type="text" label='Username' onChange={handleUsernameChange} />
                        <CoolTextField type="password" label='Password' onChange={handlePasswordChange} />
                    {/* </ContainerHorizontal> */}
                </ContainerVertical>
                )
          }
          return(
              <p></p>
          )
        }