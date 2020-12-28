import React, { useState, useEffect }  from 'react';
import '../App.css';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {CoolButton, CoolButton2} from '../Components/CoolButton';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, Link, useParams } from "react-router-dom";
// import { LineChart } from 'recharts';
// import {SDALineChart} from '../Components/Visualizations/Chart Types/LineChart';
import {NewVisualizationInput} from '../Components/NewVisualizationInput';
import {EditVisualizationInput} from '../Components/EditVisualizationInput';
import {VisualizationController} from '../Components/Visualizations/VisualizationController';

export function Visualizations (){

  
  // async function getResults() {
  //     const url = "https://gperfar-utn.herokuapp.com/visualizations";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     return data;
  //   }

    const { user } = useAuth0();
    
    async function getVisualizations(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/visualizations', requestOptions);
        const data = await response.json();
        console.log(data.result);
        return data;
    }

    async function DeleteVisualization(visualization_id){
      const url = 'https://gperfar-utn.herokuapp.com/visualization/delete';
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              'visualization_id': visualization_id})
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data.results);
      return data;
  }
    
    const [visualizations, setVisualizations] = useState([]);
    const [redirect, setRedirect] = React.useState('');      
    const [selectedVisualization, setSelectedVisualization] = React.useState();     
    
    useEffect(() => {
      getVisualizations().then(data => setVisualizations(data.result.visualizations));
      }, []);

    const handleVisualizationRender= (event)=>{
      // TO DO
      console.log("Rendering visualization " + event.target.getAttribute("data-index"));
      setSelectedVisualization(event.target.getAttribute("data-index"));
      setRedirect('render');
    }

    const handleVisualizationDelete= function(event){
      if (confirm('Are you sure you want to delete this visualization?')) {
        // Delete it!
        console.log("Deleting visualization " + event.target.getAttribute("data-index"));
        DeleteVisualization(event.target.getAttribute("data-index")).then(data=> console.log(data));
        return <Redirect to={'/panel/'} />
      } 
      else {
        // Do nothing!
        console.log('You saved visualization ' + event.target.getAttribute("data-index") + '\'s ass');
      }
    }

    const handleVisualizationEdit= (event)=>{
      console.log("Editing visualization " + event.target.getAttribute("data-index"));
      setSelectedVisualization(event.target.getAttribute("data-index"));
      setRedirect('edit');
      
    }

    if (redirect === 'render') {
      return <Redirect to={'/visualizations/render/'+ selectedVisualization.toString()} />
    }
    if (redirect === 'edit') {
      return <Redirect to={'/visualizations/edit/'+ selectedVisualization.toString()} />
    }
    return (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Visualizations</h1>
                <h2><Link to='/visualizations/new'> Create new Visualization... </Link></h2>
                {visualizations.map(result => (
                  <div>
                    <ContainerHorizontal classname="align-v-center">
                      <h2>{result.name}</h2>
                      <CoolButton2 data-index={result._id} onClick={handleVisualizationRender}>
                        <span data-index={result._id}>
                          Render
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleVisualizationDelete}>
                        <span data-index={result._id}>
                          Delete
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleVisualizationEdit}>
                        <span data-index={result._id}>
                          Edit
                        </span>
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
  



export function RenderVisualization (props){
  let { id } = useParams();
  const { user } = useAuth0();

  async function VisualizationPreRender(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'user_id': user.sub,
            'visualization_id': id})
    };
    const response = await fetch('https://gperfar-utn.herokuapp.com/visualization/pre_render', requestOptions);
    const data = await response.json();
    console.log(data);
    return data.result;
  }

  const [preRenderData, setPreRenderData] = useState([]);

  useEffect(() => {
    VisualizationPreRender().then(data => setPreRenderData(data));
    }, []);

  return (
      <MainContainer>
        <NavBar />
        <SideContainer>
          <GlobalStyle />
            <SideBar />
            <Content>
              <h1>Render Visualization {id}</h1>
              <div style={{textAlign: 'center', justifyContent: 'center'}}>
                {typeof(preRenderData.column_data)=='object'?
                  <VisualizationController data={preRenderData}/>:
                  <h2>Rendering...</h2>
                }
              </div>
            </Content>
            <SideBar />
        </SideContainer>
      </MainContainer>
    );
  }




  export function NewVisualization (props){
    let { sentenceid } = useParams();
    return (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Add new Visualization</h1>
                <NewVisualizationInput sentenceID={sentenceid} />
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
      );
    }

    export function EditVisualization (props){
      let { id } = useParams();
      return (
          <MainContainer>
            <NavBar />
            <SideContainer>
              <GlobalStyle />
                <SideBar />
                <Content>
                  <h1>Edit Visualization {id}</h1>
                  <EditVisualizationInput visualizationID={id}/>
                </Content>
                <SideBar />
            </SideContainer>
          </MainContainer>
        );
      }