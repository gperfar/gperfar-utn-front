import React, { useState, useEffect }  from 'react';
import {CoolButton} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
// import SDATable from './Table';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {ConnectionTypeSelect} from './ConnectionTypeSelect';

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

// export function EditConnectionInput (props){
//     const connectionID = props.connectionID;

//     const [name, setName] = useState('');
//     const [comment, setComment] = useState('');
//     // const [connectionID, setConnectionID] = useState(0);
//     // const [SQLQuery, setSQLQuery] = useState('');

//     const { logout, user } = useAuth0();

//     async function getConnectionData(){
//         console.log('Getting connection data...')
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 'connection_id': connectionID,
//                 'user_id': user.sub})
//         };
//         const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
//         const data = await response.json();
//         console.log(data.result);
//         return data;
//     }

//     const [connection, setConnection] = useState([]);
//     useEffect(() => {
//       getConnectionData().then((data) =>{
//           setComment(data.result.connection.comment);
//           setName(data.result.connection.name);
//         } );
//     }, []);

//     async function saveEditedConnection(){
//         const url = 'https://gperfar-utn.herokuapp.com/connection/edit';
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 'connection_id': connectionID,
//                 'comment': comment,
//                 'name': name})
//         };
//         const response = await fetch(url, requestOptions);
//         const data = await response.json();
//         console.log(data.results);
//         return data;
//     }

//     const handleNameChange = (event) => {
//         setName(event.target.value);
//       }

//     const handleCommentChange = (event) => {
//         setComment(event.target.value);
//     }
    
//     // const handleSQLQueryChange = (event) => {
//     //     setSQLQuery(event.target.value);
//     //   }

//     const handleSave = (event) => {
//         // getQueryResults().then(data => setQueryResults(data.results))   
//         saveEditedConnection().then(data=> console.log(data));     
//     }

//     // const handleTest = (event) => {
//     //     getQueryResults().then(data => setQueryResults(data.results))        

//     // }
    
//     return (
//             <div>
//                 <form >
//                     <ContainerVertical>
//                         <ContainerHorizontal>
//                             <CoolTextField value={name} type="text" label='Sentence Name' onChange={handleNameChange} />
//                             {/* <ConnectionSelect connections={connections} state={{ connectionID: [connectionID, setConnectionID] }} /> */}
//                         </ContainerHorizontal>
//                         <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
//                         {/* <CoolTextField value={SQLQuery} multiline type="text" label='SQL Query' onChange={handleSQLQueryChange} /> */}
//                     </ContainerVertical>
//                 </form>
//                 {/* <SDATable info={queryResults} /> */}
//                     <div>
//                         {/* <CoolButton onClick={handleTest}> Test </CoolButton> */}
//                         <CoolButton onClick={handleSave}> Save </CoolButton>
//                     </div>
//             </div>
//       );
//     }



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
                        'type': connType,
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
    
        const handleNameChange = (event) => {
            setName(event.target.value);
          }
    
        const handleCommentChange = (event) => {
            setComment(event.target.value);
        }
        
    
        const handleSave = (event) => {
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
        // if (!isAuthenticated) {
        //     return (
        //         <Redirect to={'/'} />
        //         )
        //   }
    
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
                                    password: [password, setPassword]
                                    }} 
                            />
                            <ContainerHorizontal>
                                <CoolButton onClick={handleSave}> Save </CoolButton>
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
                        <CoolTextField value={hostname} type="text" label='Hostname' onChange={handleHostnameChange} />
                        <CoolTextField value={database} type="text" label='Database' onChange={handleDatabaseChange} />
                        {/* <ContainerHorizontal> */}
                            <CoolTextField value={username} type="text" label='Username' onChange={handleUsernameChange} />
                            <CoolTextField value={password} type="password" label='Password' onChange={handlePasswordChange} />
                        {/* </ContainerHorizontal> */}
                    </ContainerVertical>
                    )
              }
              return(
                  <p></p>
              )
            }