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
        if (connType == "postgres") {
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

    async function testConnection(){
        const url = 'https://gperfar-utn.herokuapp.com/connection/test';
        let requestOptions={}
        if (connType == "postgres") {
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
        console.log(data);
        return data;
    }


    const [results, setResults] = useState([]);
      useEffect(() => {
        getConnectionTypes().then(data => setResults(data["connection types"]));
      }, []);

    const [connType, setConnType] = useState(0);
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    // const [queryResults, setQueryResults] = useState([]);


    // Postgres-specific fields
    const [hostname, setHostname] = useState();
    const [database, setDatabase] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    useEffect(() => {
        getConnectionTypes().then((data) =>{
            setConnType('postgres');
          } );
      }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    

    const handleCreate = (event) => {
        console.log("Saving connection...");
        saveConnection().then(data=> console.log(data));          
    }

    const handleTest = (event) => {
        console.log("Testing connection...");
        testConnection().then(data=> {
                console.log(data);
                alert(data.message);
            });
        


    }
    if (!isAuthenticated) {
        return (
            <Redirect to={'/'} />
            )
      }

    return (
            <div>
                <form >
                    <ContainerVertical>
                        <ContainerHorizontal>
                            <CoolTextField style={{minWidth: 200}} type="text" label='Connection Name' onChange={handleNameChange} />
                            <ConnectionTypeSelect types={results} state={{ connType: [connType, setConnType] }} />
                        </ContainerHorizontal>
                        <CoolTextField type="text" label='Comment' onChange={handleCommentChange} />
                        <SpecificTypeFields 
                            connType={connType} 
                            state={{ 
                                hostname: [hostname, setHostname],
                                database: [database, setDatabase],
                                username: [username, setUsername],
                                password: [password, setPassword]
                                }} 
                        />
                        <ContainerHorizontal>
                            <CoolButton onClick={handleCreate}> Create </CoolButton>
                            <CoolButton onClick={handleTest}> Test </CoolButton>
                        </ContainerHorizontal>
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

        if (props.connType == "postgres") {
            return (
                <ContainerVertical>
                    <CoolTextField type="text" label='Hostname' onChange={handleHostnameChange} />
                    <CoolTextField type="text" label='Database' onChange={handleDatabaseChange} />
                    <CoolTextField type="text" label='Username' onChange={handleUsernameChange} />
                    <CoolTextField type="password" label='Password' onChange={handlePasswordChange} />
                </ContainerVertical>
                )
          }
          return(
              <p></p>
          )
        }