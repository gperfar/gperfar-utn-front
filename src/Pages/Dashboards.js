import React, { useState, useEffect }  from 'react';
import '../App.css';
import { Redirect, Link, useParams } from "react-router-dom";
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";
import {EditDashboardInput} from '../Components/EditDashboardInput';
import {CoolButton2} from '../Components/CoolButton';

export function Dashboards (){

  
  // async function getResults() {
  //     const url = "https://gperfar-utn.herokuapp.com/dashboards";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     return data;
  //   }

  const [redirect, setRedirect] = React.useState('');      
  const [selectedDashboard, setSelectedDashboard] = React.useState();      
  const { user } = useAuth0();
  const [results, setResults] = useState([]);
  
  
  useEffect(() => {
    getResults().then(data => setResults(data.result.dashboards));
  }, []);
  
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

  async function DeleteDashboard(id){
    const url = 'https://gperfar-utn.herokuapp.com/dashboard/delete';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'dashboard_id': id})
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data.results);
    return data;
}


  const handleEdit= (event)=>{
    setSelectedDashboard(event.target.getAttribute("data-index"));
    setRedirect('edit');
  }
  
  const handleDelete= function(event){
    if (confirm('Are you sure you want to delete this dashboard?')) {
      // Delete it!
      console.log("Deleting dashboard " + event.target.getAttribute("data-index"));
      DeleteDashboard(event.target.getAttribute("data-index")).then(data=> console.log(data));
      return <Redirect to={'/panel/'} />
    } else {
      // Do nothing!
      console.log('You saved dashboard ' + event.target.getAttribute("data-index") + '\'s ass');
    }
  }

    if (redirect === 'edit' && selectedDashboard > 0) {
      console.log('Editing dashboard ' + selectedDashboard.toString() + '...')
      return <Redirect to={'/dashboards/edit/'+ selectedDashboard.toString()} />
    }

    return (
      <MainContainer>
        <NavBar />
        <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Dashboards</h1>
                <h2><Link to='/dashboards/new'> Create New Dashboard... </Link></h2>
                {results.map(result => (
                  <div>
                    <ContainerHorizontal classname="align-v-center">
                      <h2>{result.name}</h2>
                      <CoolButton2 data-index={result._id} onClick={handleEdit}>
                        <span data-index={result._id}>Edit</span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleDelete}>
                        <span data-index={result._id}>Delete</span>
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
  
    export function NewDashboard (props){
      return (
          <MainContainer>
            <NavBar />
            <SideContainer>
              <GlobalStyle />
                <SideBar />
                <Content>
                  <h1>Add New Dashboard</h1>
                  <EditDashboardInput />
                </Content>
                <SideBar />
            </SideContainer>
          </MainContainer>
        );
      }
  
  
      export function EditDashboard (props){
        let { id } = useParams();
        return (
            <MainContainer>
              <NavBar />
              <SideContainer>
                <GlobalStyle />
                  <SideBar />
                  <Content>
                    <h1>Edit Dashboard {id}</h1>
                    <EditDashboardInput dashboardID={id}/>
                  </Content>
                  <SideBar />
              </SideContainer>
            </MainContainer>
          );
        }