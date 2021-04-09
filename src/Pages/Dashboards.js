import React, { useState, useEffect }  from 'react';
import '../App.css';
import { Redirect, Link, useParams } from "react-router-dom";
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";
import {EditDashboardInput} from '../Components/EditDashboardInput';
import {CoolButton2} from '../Components/CoolButton';
import {VisualizationController} from '../Components/Visualizations/VisualizationController';
import { Divider } from '@material-ui/core';
import { ShareModal } from '../Components/ShareModal';

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

  const handleRender= (event)=>{
    setSelectedDashboard(event.target.getAttribute("data-index"));
    setRedirect('render');
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

  const [selectedDashboardObject, setSelectedDashboardObject] = React.useState({});      
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleShare= (event)=>{
    console.log("Sharing dashboard " + event.target.getAttribute("data-index"));
    setSelectedDashboard(event.target.getAttribute("data-index"));
    setSelectedDashboardObject(results[event.target.getAttribute("data-index") - 1])
    setModalOpen(true);
    
  }

    if (redirect === 'edit' && selectedDashboard > 0) {
      console.log('Editing dashboard ' + selectedDashboard.toString() + '...')
      return <Redirect to={'/dashboards/edit/'+ selectedDashboard.toString()} />
    }

    if (redirect === 'render' && selectedDashboard > 0) {
      console.log('Rendering dashboard ' + selectedDashboard.toString() + '...')
      return <Redirect to={'/dashboards/render/'+ selectedDashboard.toString()} />
    }

    return (
      <MainContainer>
        <ShareModal model='dashboard' state={{ open: [modalOpen, setModalOpen], object: [selectedDashboardObject, setSelectedDashboardObject]}} /> 
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
                      <CoolButton2 data-index={result._id} onClick={handleRender}>
                        <span data-index={result._id}>Render</span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleEdit}>
                        <span data-index={result._id}>Edit</span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleDelete}>
                        <span data-index={result._id}>Delete</span>
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


    export function RenderDashboard (props){
      let { id } = useParams();
      const { user } = useAuth0();

      const [render, setRender] = useState(0);
      const [dashboardVisuals, setDashboardVisuals] = useState([]);
      const [dashboardName, setDashboardName] = useState('');
      const [visualsResults, setVisualsResults] = useState([]);


      async function getDashboardData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'dashboard_id': id,
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/dashboards', requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    }

      async function DashboardPreRender(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                'dashboard_id': id})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/dashboard/pre_render', requestOptions);
        const data = await response.json();
        console.log(data);
        return data.result.rendered_visualization;
      }
    
    
      useEffect(() => {
        getDashboardData().then(data => {
          setDashboardVisuals(data.result.dashboard.dashboard_visualizations);//.sort((a, b) => (a.order > b.order) ? 1 : -1));
          setDashboardName(data.result.dashboard.name);
        })
        }, []);

      useEffect(() => {
        DashboardPreRender().then(data => {
          setVisualsResults(data);
        })
        }, []);
    
      return (
          <MainContainer>
            <NavBar />
            <SideContainer>
              <GlobalStyle />
                <SideBar />
                <Content>
                  <h1>{dashboardName}</h1>
                  {visualsResults.map((visualData,index) => (
                    <div /*style={{textAlign: 'center', justifyContent: 'center'}} */ >
                      {/* <h2>{dashboardVisuals[index].name}</h2> */}
                      {/* <h4 className='coolcolors' style={{marginTop:0}}>{dashboardVisuals[index].comment}</h4> */}
                      {typeof(visualData)=='object'? <VisualizationController visualizationID={dashboardVisuals[index]._id} data={visualData}/>: <h2>Rendering...</h2>}
                      <Divider style={{marginTop:25}}/>
                    </div>
                  ))}
                </Content>
                <SideBar />
            </SideContainer>
          </MainContainer>
      );
    }