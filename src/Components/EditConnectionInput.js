import React, { useState, useEffect }  from 'react';
import {CoolButton} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
// import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {ConnectionTypeSelect} from './ConnectionTypeSelect';

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

    export function EditConnectionInput (props){
    
        const { user, isAuthenticated } = useAuth0();

        const connectionID = props.connectionID;
        
        const [connTypes, setConnTypes] = useState([]);
        // useEffect(() => {
        // getConnectionTypes().then(data => setConnTypes(data["connection types"]));
        // }, []);
        const [connType, setConnType] = useState('');
        const [name, setName] = useState('');
        const [comment, setComment] = useState('');
        // const [queryResults, setQueryResults] = useState([]);
    
        // Postgres-specific fields
        const [hostname, setHostname] = useState('');
        const [database, setDatabase] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [port, setPort] = useState();
    
        useEffect(() => {
            getConnectionTypes().then((data) =>{
                setConnTypes(data["connection types"]);
              } );
            getConnectionData().then((data) => {
                setConnType(data["type"]);
                setName(data["name"]);
                setComment(data["comment"]);
                if (data["type"]=="postgres"){
                    setHostname(data["host"]);
                    setDatabase(data["database"]);
                    setUsername(data["username"]);
                    setPassword(data["password"]);
                    setPort(data["port"]);
                }
            });
          }, []);
        

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
            console.log(data.result.connection);
            return data.result.connection;
        }

        async function getConnectionTypes() {
            const url = "https://gperfar-utn.herokuapp.com/connections/types";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.result);
            return data.result;
        }
    
        async function saveConnection(){
            const url = 'https://gperfar-utn.herokuapp.com/connection/edit';
            let requestOptions={}
            if (connType == "postgres") {
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        'connection_id': connectionID,
                        'name': name,
                        'comment': comment,
                        'user_id': user.sub,
                        'type': "postgres",
                        'host': hostname,
                        'database': database,
                        'username': username,
                        'password': password,
                        'port': port
                    })
                };
            }
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data.results);
            return data;
        }

        async function createConnection(){
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
                        'password': password,
                        'port': port
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
                        'type': connType,
                        'host': hostname,
                        'database': database,
                        'username': username,
                        'password': password,
                        'port': port
                    })
                };
            }
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            return data;
        }
    
        const handleNameChange = (event) => {
            setName(event.target.value);
          }
    
        const handleCommentChange = (event) => {
            setComment(event.target.value);
        }
        
    
        const handleSave = (event) => {
            console.log("Saving connection...");
            saveConnection().then(data=> {
                console.log(data);
                alert('Connection saved successfully!')
            });          
        }

        const handleCreate = (event) => {
            console.log("Saving connection...");
            createConnection().then(data=> {
                console.log(data);
                if (data.success) alert('Connection created successfully!')
            });          
        }
    
        const handleTest = (event) => {
            console.log("Testing connection...");
            testConnection().then(data=> {
                    console.log(data);
                    alert(data.message);
                });    
        }
    
        return (
                <div>
                    <form >
                        <ContainerVertical>
                            <ContainerHorizontal>
                                <CoolTextField value={name} style={{minWidth: 200}} type="text" label='Connection Name' onChange={handleNameChange} />
                                <ConnectionTypeSelect types={connTypes} state={{ connType: [connType, setConnType] }} />
                            </ContainerHorizontal>
                            <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                            <SpecificTypeFields 
                                connType={connType} 
                                state={{ 
                                    hostname: [hostname, setHostname],
                                    database: [database, setDatabase],
                                    username: [username, setUsername],
                                    password: [password, setPassword],
                                    port: [port, setPort]
                                    }} 
                            />
                            <ContainerHorizontal>
                                {connectionID > 0? 
                                    <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Connection </CoolButton>
                                }
                                {/* <CoolButton onClick={handleSave}> Save </CoolButton> */}
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
            const {port: [port, setPort]} = {type: React.useState(),...(props.state || {})};

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
            const handlePortChange = (event) => {
                setPort(event.target.value);
            }
    
            if (props.connType == "postgres") {
                return (
                    <ContainerVertical>
                        <CoolTextField value={hostname} type="text" label='Hostname' onChange={handleHostnameChange} />
                        <CoolTextField value={database} type="text" label='Database' onChange={handleDatabaseChange} />
                        <CoolTextField value={port} type="text" label='Port' onChange={handlePortChange} />
                        <CoolTextField value={username} type="text" label='Username' onChange={handleUsernameChange} />
                        <CoolTextField value={password} type="password" label='Password' onChange={handlePasswordChange} />
                    </ContainerVertical>
                    )
              }
              return(
                  <p></p>
              )
            }