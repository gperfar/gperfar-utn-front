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
        
        const [dashboardVisualizations, setDashboardVisualizations] = useState([]);
        const [name, setName] = useState('');
        const [comment, setComment] = useState('');
        const [visualizationID, setVisualizationID] = useState(0);
        const [allVisualizations, setAllVisualizations] = useState([]);
        const [addVisualization, setAddVisualization] = useState(false);
        
        const [render, setRender] = useState(0);

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

        
            
        useEffect(() => {
            getVisualizations().then(data => 
                setAllVisualizations(data.result.visualizations)
            );
            getDashboardData().then((data) => {
                setName(data["name"]);
                setComment(data["comment"]);
                setDashboardVisualizations(data["dashboard_visualizations"].sort((a, b) => (a.order > b.order) ? 1 : -1));
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
                    'visualizations': dashboardVisualizations,
                    'user_id': user.sub
                })
            };
            console.log(requestOptions.body);
            const response = await fetch(url, requestOptions);
            const data = await response.json();
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
                        'visualizations': dashboardVisualizations,
                        'user_id': user.sub
                    })
                };
            console.log(requestOptions);
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
            console.log(dashboardVisualizations)
            var temp_visualizations = dashboardVisualizations;
            console.log(temp_visualizations);
            temp_visualizations.pop(index);
            setDashboardVisualizations(temp_visualizations);
            setRender(render + 1);
            console.log(temp_visualizations);
        }

        const handleVisualizationOrderChange = (event, index, prevOrder) => {
            console.log("Changing order of visualization " + index + ' from ' + prevOrder + ' to ' + event.target.value);
            console.log(dashboardVisualizations[index])
            var temp_visualizations = dashboardVisualizations;
            temp_visualizations[index].order = event.target.value;
            setDashboardVisualizations(temp_visualizations);
            setRender(render + 1);
            console.log(temp_visualizations);
        }

        const handleRefreshOrder = (event) => {
            console.log("Refreshing order of visualizations...");
            var temp_visualizations = dashboardVisualizations;
            setDashboardVisualizations(temp_visualizations.sort((a, b) => (a.order > b.order) ? 1 : -1));
            setRender(render + 1);
            console.log(temp_visualizations);
        }

        const toggleAddVisualization = (event) => {
            addVisualization?  setAddVisualization(false): setAddVisualization(true)        
        }

        const handleAddVisualization = (event) => {
            console.log('Adding visualization ' + visualizationID);
            var temp_visualizations = dashboardVisualizations;
            var selectedVisualization = JSON.parse(JSON.stringify(allVisualizations.find(vis => vis._id == visualizationID)));
            // var selectedVisualization = allVisualizations.find(vis => vis._id == visualizationID);
            selectedVisualization.order=1;
            temp_visualizations.push(selectedVisualization)
            setAddVisualization(false); 
            setDashboardVisualizations(temp_visualizations); 
            console.log(dashboardVisualizations);
        }

        return (
                <div>
                    <form >
                        <ContainerVertical>
                            <CoolTextField value={name} style={{minWidth: 200}} type="text" label='Dashboard Name' onChange={handleNameChange} />
                            <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                            <h2 style={{marginBottom: '0px'}}>Visualizations </h2>
                            {dashboardVisualizations.map((vis,index) => (
                                <div>
                                    <ContainerHorizontal>
                                        <h3 >{vis.name} </h3>
                                        <CoolTextField value={vis.order} InputLabelProps={{shrink: true}} type="number" label={'Order'} onChange={(event) => handleVisualizationOrderChange(event, index, vis.order)} />
                                        <CoolButton2 onClick={(event) => handleRemoveVisualization(event, index)}> Remove </CoolButton2>
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
                            <CoolButton2  onClick={handleRefreshOrder}>Refresh Order</CoolButton2>
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