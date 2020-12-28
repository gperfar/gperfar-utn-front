import React, { useState, useEffect }  from 'react';
import '../App.css';
import styled from "styled-components";
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, Content} from '../GlobalStyles';
import usePersistentState from '../usePersistentState'
import { useAuth0 } from "@auth0/auth0-react";


const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(340px, 1fr));
justify-content: space-evenly;
align-items: center;
`;

const GridItem = styled.div`
height:200px;
width: 300px;
background-color: rgb(240,240,240);
border: solid 1px rgb(210,210,210);
text-align: center;
margin: 20px;
`;



// const Profile = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [userMetadata, setUserMetadata] = useState(null);

//   useEffect(() => {
//     const getUserMetadata = async () => {
//       const domain = "simplifieddataanalysis.us.auth0.com";
  
//       try {
//         const accessToken = await getAccessTokenSilently({
//           audience: `https://${domain}/api/v2/`,
//           scope: "read:current_user",
//         });
  
//         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
//         const metadataResponse = await fetch(userDetailsByIdUrl, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
  
//         const { user_metadata } = await metadataResponse.json();
  
//         setUserMetadata(user_metadata);
//       } catch (e) {
//         console.log(e.message);
//       }
//     };
  
//     getUserMetadata();
//   }, []);

//   return (
//     isAuthenticated && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//         <h3>User Metadata</h3>
//         {userMetadata ? (
//           <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
//         ) : (
//           "No user metadata defined"
//         )}
//       </div>
//     )
//   );
// };





export function Panel (){

  
  // async function getResults() {
  //     const url = "https://gperfar-utn.herokuapp.com/dashboards";
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
        const response = await fetch('https://gperfar-utn.herokuapp.com/dashboards', requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }


    // const [login,setLogin] = usePersistentState('login')



    const [results, setResults] = useState([]);
    useEffect(() => {
        getResults().then(data => setResults(data.result.dashboards));
        console.log(results);
      }, []);
    return (
        <MainContainer>
          <GlobalStyle />
            <NavBar />
            <Content>
              <h1>Panel</h1>
              <GridContainer>
                {results.map(result => (
                  <GridItem>
                    <h2>{result.name}</h2>
                    <p className="panel-card-p"> {result.comment} </p>
                  </GridItem>
                    ))}
              </GridContainer>
            </Content>
        </MainContainer>
      );
    }
  