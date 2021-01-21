import React, { useState, useEffect }  from 'react';
import {CoolButton, CoolButton2} from './CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {ModelCard} from '../Components/ModelCard';
import {ModelSelect} from './ModelSelect';

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

    export function EditDashboardInput (props){
    
        const { user } = useAuth0();

        const dashboardID = props.dashboardID;
        
        const [visualizations, setVisualizations] = useState([]);
        const [name, setName] = useState('');
        const [comment, setComment] = useState('');
        const [visualizationID, setVisualizationID] = useState(0);
        const [allVisualizations, setAllVisualizations] = useState([]);
        const [addVisualization, setAddVisualization] = useState(false);
        
        const [render, setRender] = useState();

        async function getDashboardData(){
            console.log('Getting dashboard data...')
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    'dashboard_id': dashboardID,
                    'user_id': user.sub})
                };
                const response = await fetch('https://gperfar-utn.herokuapp.com/dashboards', requestOptions);
                const data = await response.json();
                // console.log(data.result.dashboard);
                return data.result.dashboard;
            }

        async function getVisualizations(){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        'user_id': user.sub})
                };
                const response = await fetch('https://gperfar-utn.herokuapp.com/visualizations', requestOptions);
                const data = await response.json();
                // console.log(data.result);
                return data;
            }

        // async function getOneVisualization(visualizationID){
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ 
        //             'user_id': user.sub,
        //             'visualization_id': visualizationID
        //         })
        //     };
        //     const response = await fetch('https://gperfar-utn.herokuapp.com/visualizations', requestOptions);
        //     const data = await response.json();
        //     console.log(data.result);
        //     return data;
        // }
            
        useEffect(() => {
            getVisualizations().then(data => 
                setAllVisualizations(data.result.visualizations)
            );
            getDashboardData().then((data) => {
                setName(data["name"]);
                setComment(data["comment"]);
                setVisualizations(data["visualizations"])
            });
            }, []);
            
        async function saveDashboard(){
            const url = 'https://gperfar-utn.herokuapp.com/dashboard/edit';
            let requestOptions={}
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    'dashboard_id': dashboardID,
                    'name': name,
                    'comment': comment,
                    'visualizations': visualizations,
                    'user_id': user.sub
                })
            };
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data.results);
            return data;
        }

        async function createDashboard(){
            const url = 'https://gperfar-utn.herokuapp.com/dashboard/create';
            let requestOptions={}
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        'name': name,
                        'comment': comment,
                        'visualizations': visualizations,
                        'user_id': user.sub
                    })
                };
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data.results);
            return data;
        }
    
        const handleNameChange = (event) => {
            setName(event.target.value);
          }
    
        const handleCommentChange = (event) => {
            setComment(event.target.value);
        }
        
    
        const handleSave = (event) => {
            console.log("Saving dashboard...");
            saveDashboard().then(data=> {
                console.log(data);
                alert('Dashboard saved successfully!')
            });          
        }

        const handleCreate = (event) => {
            console.log("Saving dashboard...");
            createDashboard().then(data=> {
                console.log(data);
                if (data.success) alert('Dashboard created successfully!')
            });          
        }

        const handleRemoveVisualization = (event, index) => {
            console.log("Removing visualization from dashboard...");
            console.log(visualizations)
            var temp_visualizations = visualizations;
            console.log(temp_visualizations);
            temp_visualizations.pop(index);
            setVisualizations(temp_visualizations);
            setRender(render + 1);
            console.log(temp_visualizations);
        }

        const toggleAddVisualization = (event) => {
            addVisualization?  setAddVisualization(false): setAddVisualization(true)        
        }

        const handleAddVisualization = (event) => {
            console.log('Adding visualization ' + visualizationID);
            var temp_visualizations = visualizations;
            var selectedVisualization = allVisualizations.find(vis => vis._id == visualizationID);
            temp_visualizations.push(selectedVisualization)
            setAddVisualization(false); 
            setVisualizations(temp_visualizations); 
            console.log(visualizations);
        }

        return (
                <div>
                    <form >
                        <ContainerVertical>
                            <CoolTextField value={name} style={{minWidth: 200}} type="text" label='Dashboard Name' onChange={handleNameChange} />
                            <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                            <h2 style={{marginBottom: '0px'}}>Visualizations (selected is {visualizationID})</h2>
                            {visualizations.map((vis,index) => (
                                <div>
                                    <ContainerHorizontal>
                                        <h3 >{vis.name} </h3>
                                        <CoolButton2 onClick={(event) => handleRemoveVisualization(event, index)}> Remove </CoolButton2>
                                        {/* <CoolTextField value={i.name} style={{width:"100%"}} type="text" label={'Value text'} onChange={(event) => handleYAxisColumnLegendsChange(event, i)} /> */}
                                        {/* <ColumnSelectYAxis columns={headerRow} colIndex={i} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/> */}
                                        {/* <CoolTextField value={yAxisColumnColors[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' color'} onChange={(event) => handleYAxisColumnColorsChange(event, i)} /> */}
                                    </ContainerHorizontal>
                                    {/* {delete vis._id} */}
                                    {/* {delete vis.sentence_id} */}
                                    <ModelCard nameInHeader={false} object={vis}/>
                                </div>
                            ))}
                            <ContainerHorizontal style={{marginTop: '15px'}}>

                            <CoolButton2  onClick={toggleAddVisualization}>Add Visualization</CoolButton2>
                            </ContainerHorizontal>
                            {addVisualization?
                                <ContainerHorizontal style={{marginTop:"15px"}}>
                                    <ModelSelect style={{width:"100%"}} title='Visualization' list={allVisualizations} state={{ selectedID: [visualizationID, setVisualizationID] }} />
                                    <CoolButton2 onClick={handleAddVisualization}>Add</CoolButton2>
                                </ContainerHorizontal>
                            :
                            <p></p>
                            }
                            <ContainerHorizontal style={{marginTop: '15px'}}>
                                {dashboardID > 0? 
                                    <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Dashboard </CoolButton>
                                }
                            </ContainerHorizontal>
                        </ContainerVertical>
                    </form>
                </div>
        );
    }