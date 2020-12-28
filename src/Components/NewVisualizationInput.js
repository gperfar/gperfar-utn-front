import React, { useState, useEffect }  from 'react';
import {CoolButton} from './CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {SentenceSelect} from './SentenceSelect';
import {VisualizationTypeSelect} from './VisualizationTypeSelect';
import {ColumnSelect} from './ColumnSelect';
import {ColumnSelectYAxis} from './ColumnSelectYAxis';
import {CoolTextField} from './CoolTextField';
import SDATable from './Table';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import useMutableState from '../useMutableState'
import { render } from 'react-dom';
import {VisualizationController} from '../Pages/Visualizations'


export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function NewVisualizationInput (props){
    
    const { logout, user } = useAuth0();
    const [localRenderData, setLocalRenderData]= useState([]);

    async function getVisualizationTypes() {
      const url = "https://gperfar-utn.herokuapp.com/visualizations/types";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    async function getSentences(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/sentences', requestOptions);
        const data = await response.json();
        console.log(data.result);
        return data;
    }

    async function saveVisualization(){
        const url = 'https://gperfar-utn.herokuapp.com/visualization/create';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'sentence_id': sentenceID,
                'type': visualizationType,
                'comment': comment,
                'name': name,
                'params': params
            })
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    async function getResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                'sentence_id': sentenceID})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/runquery', requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    const [sentences, setSentences] = useState([]);
      useEffect(() => {
        getSentences().then(data => setSentences(data.result.sentences));
      }, []);
    
    const [visualizationTypes, setVisualizationTypes] = useState([]);
      useEffect(() => {
        getVisualizationTypes().then(data => {
            setVisualizationTypes(data.result["visualization types"]);
            setVisualizationType('Line chart');
        }
        );
      }, []);

    const [sentenceID, setSentenceID] = useState(props.sentenceID);
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [visualizationType, setVisualizationType] = useState('');
    const [params, setParams] = useState({});

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleCreate = (event) => {
        saveVisualization().then(data=> console.log(data));          
    }

    const handleRender = (event) => {
        getResults().then(data => {
            setLocalRenderData({
                column_data: params.columns,
                results: data.results,
                type: visualizationType,
                xaxis_label: params.xaxis_label,
                yaxis_label: params.yaxis_label
            });
            console.log(localRenderData);
            console.log(typeof(localRenderData.column_data));
            console.log(params);
        });         
    }
    
    return (
            <div>
                <form >
                    <ContainerVertical>
                        <h3>General</h3>
                        <ContainerHorizontal>
                            <CoolTextField type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "50%"}}/>
                            <SentenceSelect style={{width:"100%"}} sentences={sentences} state={{ sentenceID: [sentenceID, setSentenceID] }} />
                            <VisualizationTypeSelect style={{width:"100%"}} visualizationTypes={visualizationTypes} state={{ visualizationType: [visualizationType, setVisualizationType] }} />
                        </ContainerHorizontal>
                        <CoolTextField type="text" label='Comment' onChange={handleCommentChange} />
                        <SpecificTypeFields sentenceID={sentenceID} visualizationType={visualizationType} state={{ params: [params, setParams] }}  />
                    </ContainerVertical>
                </form>
                <div>
                    <CoolButton onClick={handleCreate}> Create </CoolButton>
                    <CoolButton onClick={handleRender}> Render </CoolButton>
                </div>
                <h2>Render of the chart</h2>
                {typeof(localRenderData.column_data)=='object'?
                  <VisualizationController data={localRenderData} />
                  :
                  <h4>Hit Render to see the chart</h4>
                }
            </div>
      );
    }


export function SpecificTypeFields (props){
    const { user } = useAuth0();

    
    const {params: [params, setParams]} = {type: React.useState(),...(props.state || {})};
    
    
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [xAxisColumn, setXAxisColumn] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    
    const [yAxisColumnCount, setYAxisColumnCount] = useState(1);
    
    const [yAxisColumnNames, setYAxisColumnNames] = useState(['']);
    const [yAxisColumnColors, setYAxisColumnColors] = useState(['']);
    const [yAxisColumnLegends, setYAxisColumnLegends] = useState(['']);

        
    const [render, setRender] = useState(0);

    async function getResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                'sentence_id': props.sentenceID})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/runquery', requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    const [headerRow, setHeaderRow] = useState([]);
    const [results, setResults] = useState([]);
    useEffect(() => {
        getResults().then(data => {
            setResults(data.results);
            setHeaderRow(Object.keys(data.results[0]));
        });
    }, [props.sentenceID]);


    const handleXAxisLabelChange = (event) => {
        setXAxisLabel(event.target.value);
        buildParams();
    }

    const handleYAxisLabelChange = (event) => {
        setYAxisLabel(event.target.value);
        buildParams();
    }

    const handleYAxisColumnLegendsChange = (event, index) => {
        var temp = yAxisColumnLegends;
        temp[index] = event.target.value;
        setYAxisColumnLegends(temp);
        setRender(render + 1);
        buildParams();

    }

    const handleYAxisColumnColorsChange = (event, index) => {
        var temp = yAxisColumnColors;
        temp[index] = event.target.value;
        setYAxisColumnColors(temp);
        setRender(render + 1)
        buildParams();
    }

    const handleAddLine = (event) => {
        setYAxisColumnCount(yAxisColumnCount + 1);
        var temp = yAxisColumnNames;
        temp.push('');
        setYAxisColumnNames(temp);
        buildParams();
    }

    function buildParams (){
        var tempColumns = [];
        tempColumns.push({name: xAxisColumn});
        for (const [i, value] of yAxisColumnNames.entries()) {
            tempColumns.push({
                name: yAxisColumnNames[i],
                color: yAxisColumnColors[i],
                legend: yAxisColumnLegends[i]
            })
        }
        var tempParams = {
            columns: tempColumns,
            xaxis_label: xAxisLabel,
            yaxis_label: yAxisLabel
        }
        setParams(tempParams);
        console.log("params set!");
    } 

    if (props.sentenceID>0 && (props.visualizationType == "Line chart"|| props.visualizationType == "Bar chart" )) {
        return (
            <ContainerVertical>
                <h3>X Axis</h3>
                <ContainerHorizontal>
                    <CoolTextField style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} />
                    <ColumnSelect style={{width:"100%"}} columns={headerRow} state={{ column: [xAxisColumn, setXAxisColumn] }} />
                </ContainerHorizontal>
                <h3>Y Axis</h3>
                <CoolTextField type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} />
                {[...Array(yAxisColumnCount).keys()].map(i => (
                    <ContainerHorizontal>
                        <CoolTextField style={{width:"100%"}} type="text" label={'Column '+(i+1)+' name'} onChange={(event) => handleYAxisColumnLegendsChange(event, i)} />
                        <ColumnSelectYAxis columns={headerRow} colIndex={i} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                        <CoolTextField style={{width:"100%"}} type="text" label={'Column '+(i+1)+' color'} onChange={(event) => handleYAxisColumnColorsChange(event, i)} />
                    </ContainerHorizontal>
                ))}
                <CoolButton style={{width:"10%"}} onClick={handleAddLine}> Add Line </CoolButton>
            </ContainerVertical>
            )
        }
        return(
            <p></p>
        )
}
