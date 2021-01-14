// import React, { useState, useEffect }  from 'react';
// import {CoolButton} from '../Components/CoolButton';
// import {ContainerVertical} from '../GlobalStyles';
// import {ConnectionSelect} from '../Components/ConnectionSelect';
// import {CoolTextField} from './CoolTextField';
// import SDATable from './Table';
// import styled from "styled-components";
// import { useAuth0 } from "@auth0/auth0-react";

// export const ContainerHorizontal = styled.div`
// display:flex;
// flex-direction: row;
// justify-content: left;
// align-items: baseline;
// `

// export function NewSentenceInput (props){
    
//     // ----OLD GET RESULTS METHOD (USING GET INSTEAD OF POST, AND NOT SENDING USER ID)----
//     // async function getResults() {
//     //   const url = "https://gperfar-utn.herokuapp.com/connections";
//     //   const response = await fetch(url);
//     //   const data = await response.json();
//     //   return data;
//     // }
    
//     const { logout, user } = useAuth0();

//     async function getResults(){
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 'user_id': user.sub,
//                 'sql_query': SQLQuery})
//         };
//         const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
//         const data = await response.json();
//         console.log(data.results);
//         return data;
//     }


//     async function getQueryResults(){
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 'connection_id': connectionID,
//                 'sql_query': SQLQuery})
//         };
//         const response = await fetch('https://gperfar-utn.herokuapp.com/runtemporaryquery', requestOptions);
//         const data = await response.json();
//         console.log(data.results);
//         return data;
//     }


//     async function saveSentence(){
//         const url = 'https://gperfar-utn.herokuapp.com/sentence/create';
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 'connection_id': connectionID,
//                 'sql_query': SQLQuery,
//                 'comment': comment,
//                 'name': name})
//         };
//         const response = await fetch(url, requestOptions);
//         const data = await response.json();
//         console.log(data.results);
//         return data;
//     }


//     const [results, setResults] = useState([]);
//       useEffect(() => {
//         getResults().then(data => setResults(data.result.connections));
//       }, []);

//     const [connectionID, setConnectionID] = useState();
//     const [name, setName] = useState();
//     const [comment, setComment] = useState();
//     const [SQLQuery, setSQLQuery] = useState();
//     const [queryResults, setQueryResults] = useState([]);

//     const handleNameChange = (event) => {
//         setName(event.target.value);
//       }

//     const handleCommentChange = (event) => {
//         setComment(event.target.value);
//     }
    
//     const handleSQLQueryChange = (event) => {
//         setSQLQuery(event.target.value);
//       }

//     const handleCreate = (event) => {
//         saveSentence().then(data=> console.log(data));          
//     }

//     const handleTest = (event) => {
//         getQueryResults().then(data => setQueryResults(data.results))        

//     }
    
//     return (
//             <div>
//                 <form >
//                     <ContainerVertical>
//                         <ContainerHorizontal>
//                             <CoolTextField type="text" label='Sentence Name' onChange={handleNameChange} />
//                             <ConnectionSelect connections={results} state={{ connectionID: [connectionID, setConnectionID] }} />
//                         </ContainerHorizontal>
//                         <CoolTextField type="text" label='Comment' onChange={handleCommentChange} />
//                         <CoolTextField multiline type="text" label='SQL Query' onChange={handleSQLQueryChange} />
//                     </ContainerVertical>
//                 </form>
//                 <SDATable info={queryResults} />
//                     <div>
//                         <CoolButton onClick={handleTest}> Test </CoolButton>
//                         <CoolButton onClick={handleCreate}> Create </CoolButton>
//                     </div>
//             </div>
//       );
//     }