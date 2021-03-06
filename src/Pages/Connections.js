import React, { useState, useEffect }  from 'react';
import '../App.css';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";
import {CoolButton2} from '../Components/CoolButton';
import { Redirect, Link, useParams } from "react-router-dom";
import {EditConnectionInput} from '../Components/EditConnectionInput';
import { ShareModal } from '../Components/ShareModal';

export function Connections (){

  
  // async function getResults() {
  //     const url = "https://gperfar-utn.herokuapp.com/connections";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     return data;
  //   adasd}

    const { logout, user, isAuthenticated } = useAuth0();

    async function getResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    async function DeleteConnection(connection_id){
      const url = 'https://gperfar-utn.herokuapp.com/connection/delete';
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              'connection_id': connection_id})
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data.results);
      return data;
  }

    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.connections));
      }, []);

    const [redirect, setRedirect] = React.useState('');      
    const [selectedConnection, setSelectedConnection] = React.useState();      
    
    const handleConnectionEdit= (event)=>{
      console.log("Editing connection " + event.target.getAttribute("data-index"));
      setSelectedConnection(event.target.getAttribute("data-index"));
      setRedirect('edit');
      
    }
    
    const handleConnectionDelete= function(event){
      if (confirm('Are you sure you want to delete this connection?')) {
        // Delete it!
        console.log("Deleting connection " + event.target.getAttribute("data-index"));
        DeleteConnection(event.target.getAttribute("data-index")).then(data=> console.log(data));
        return <Redirect to={'/panel/'} />
      } else {
        // Do nothing!
        console.log('You saved connection ' + event.target.getAttribute("data-index") + '\'s ass');
      }
    }

    const [selectedConnectionObject, setSelectedConnectionObject] = React.useState({});      
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleShare= (event)=>{
    console.log("Sharing dashboard " + event.target.getAttribute("data-index"));
    setSelectedConnection(event.target.getAttribute("data-index"));
    setSelectedConnectionObject(results[event.target.getAttribute("data-index") - 1])
    setModalOpen(true);

  }

    // const {isAuthenticated} = useAuth0();
    if (redirect === 'edit' && selectedConnection > 0) {
      console.log('Editing connection ' + selectedConnection.toString() + '...')
      return <Redirect to={'/connections/edit/'+ selectedConnection.toString()} />
    }
    return (
      <MainContainer>
        <ShareModal model='connection' state={{ open: [modalOpen, setModalOpen], object: [selectedConnectionObject, setSelectedConnectionObject]}} /> 
        <NavBar />
        <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Connections</h1>
                <h2><Link to='/connections/new'> Create New Connection... </Link></h2>
                {results.map(result => (
                  <div>
                    <ContainerHorizontal classname="align-v-center">
                      <h2>{result.name}</h2>
                      <CoolButton2 data-index={result._id} onClick={handleConnectionEdit}>
                        <span data-index={result._id}>
                          Edit
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleConnectionDelete}>
                        <span data-index={result._id}>
                          Delete
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleShare}>
                        <span data-index={result._id}> Share </span>
                      </CoolButton2>
                    </ContainerHorizontal>
                    <ModelCard object={result}/>
                  </div>
                  ))}
              </Content>
              <SideBar />
        </SideContainer>
      </MainContainer>
      );
    }
  
    export function NewConnection (props){
      return (
          <MainContainer>
            <NavBar />
            <SideContainer>
              <GlobalStyle />
                <SideBar />
                <Content>
                  <h1>Add New Connection</h1>
                  <EditConnectionInput />
                </Content>
                <SideBar />
            </SideContainer>
          </MainContainer>
        );
      }
  
  
      export function EditConnection (props){
        let { id } = useParams();
        return (
            <MainContainer>
              <NavBar />
              <SideContainer>
                <GlobalStyle />
                  <SideBar />
                  <Content>
                    <h1>Edit Connection {id}</h1>
                    <EditConnectionInput connectionID={id}/>
                  </Content>
                  <SideBar />
              </SideContainer>
            </MainContainer>
          );
        }