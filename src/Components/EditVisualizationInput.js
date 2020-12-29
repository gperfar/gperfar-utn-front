import React, { useState, useEffect }  from 'react';
import {CoolButton} from './CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {SentenceSelect} from './SentenceSelect';
import {VisualizationTypeSelect} from './VisualizationTypeSelect';
import {ColumnSelect} from './ColumnSelect';
import {ColumnSelectYAxis} from './ColumnSelectYAxis';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {VisualizationController} from './Visualizations/VisualizationController'


export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export function EditVisualizationInput (props){
    
    const { user } = useAuth0();
    const visualizationID = props.visualizationID;

    async function getVisualizationData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'visualization_id': visualizationID,
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/visualizations', requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    }

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
        const url = 'https://gperfar-utn.herokuapp.com/visualization/edit';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                'visualization_id': visualizationID,
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

    async function getQueryResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                'sentence_id': sentenceID})
            };
            const response = await fetch('https://gperfar-utn.herokuapp.com/runquery', requestOptions);
            const data = await response.json();
            // console.log(data.results);
            return data;
        }

    const [sentences, setSentences] = useState([]);
    const [sentenceID, setSentenceID] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [visualizationType, setVisualizationType] = useState('');
    const [params, setParams] = useState({});
    const [visualizationTypes, setVisualizationTypes] = useState([]);
    const [localRenderData, setLocalRenderData]= useState([]);
    const [render, setRender] = useState(0); // This one allows us to refresh state when modifying an array (react wouldn't re-render then)
    const [queryResults, setQueryResults] = useState([]);

    //Type-specific fields
    const [headerRow, setHeaderRow] = useState([]); //We use this to get column names
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [xAxisColumn, setXAxisColumn] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    const [yAxisColumnCount, setYAxisColumnCount] = useState(1);
    const [yAxisColumnNames, setYAxisColumnNames] = useState(['']);
    const [yAxisColumnColors, setYAxisColumnColors] = useState(['']);
    const [yAxisColumnLegends, setYAxisColumnLegends] = useState(['']);

    useEffect(() => {
        getSentences().then(data => 
            setSentences(data.result.sentences)
        );
        getVisualizationTypes().then(data => {
            setVisualizationTypes(data.result["visualization types"]);
            setVisualizationType('Line chart');
        });
        getVisualizationData().then((data) =>{
            setSentenceID(data.result.visualization.sentence_id);
            setComment(data.result.visualization.comment);
            setName(data.result.visualization.name);
            setParams(data.result.visualization.params);
            setVisualizationType(data.result.visualization.type);
            console.log(data);
            });
      }, []);

    useEffect(() => {
        setXAxisLabel(params.xaxis_label);
        if (typeof(params.columns) !== 'undefined') {
            // console.log(params);
            setXAxisColumn(params.columns[0].name);
            setYAxisColumnCount(params.columns.length-1);
            var tempLegends = [];//yAxisColumnLegends;
            var tempColors = [];//yAxisColumnColors;
            var tempNames = [];//yAxisColumnNames;
            [...Array(params.columns.length-1).keys()].map(i => {
                // console.log('this is index ' + i + ', going to ' + (params.columns.length-1).toString()+' because there are ' + yAxisColumnCount.toString());
                tempLegends.push(params.columns[i+1].legend);
                tempColors.push(params.columns[i+1].color);
                tempNames.push(params.columns[i+1].name);    
            })
            setYAxisColumnLegends(tempLegends);
            setYAxisColumnColors(tempColors);
            setYAxisColumnNames(tempNames);
        }
        setYAxisLabel(params.yaxis_label);
        console.log(params);
    },[headerRow]);

    useEffect(() => {
        getQueryResults().then(data => {
            setQueryResults(data.results);
            setHeaderRow(['a','b']);
            if (typeof(data.results)!=='undefined') {
                setHeaderRow(Object.keys(data.results[0]));
            }
        });
    }, [sentenceID]);

    useEffect(() => {
        buildParams();
    }, [render]);

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleSave = (event) => {
        saveVisualization().then(data=> console.log(data));          
    }

    const handleXAxisLabelChange = (event) => {
        setXAxisLabel(event.target.value);
        console.log(xAxisLabel);
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

    const handleRender = (event) => {
        setLocalRenderData({
            column_data: params.columns,
            results: queryResults,
            type: visualizationType,
            xaxis_label: xAxisLabel,
            yaxis_label: yAxisLabel
        });
        console.log(localRenderData);
        console.log(typeof(localRenderData.column_data));
        console.log(params);
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
    } 

    return (
            <div>
                <form >
                    <ContainerVertical>
                        <h3>General</h3>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "50%"}}/>
                            <SentenceSelect style={{width:"100%"}} sentences={sentences} state={{ sentenceID: [sentenceID, setSentenceID] }} />
                            <VisualizationTypeSelect style={{width:"100%"}} visualizationTypes={visualizationTypes} state={{ visualizationType: [visualizationType, setVisualizationType] }} />
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />

                        <h3>X Axis</h3>
                        <ContainerHorizontal>
                            <CoolTextField value={xAxisLabel} style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} />
                            <ColumnSelect style={{width:"100%"}} columns={headerRow} state={{ column: [xAxisColumn, setXAxisColumn] }} />
                        </ContainerHorizontal>
                        <h3>Y Axis</h3>
                        <CoolTextField value={yAxisLabel} type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} />
                        {[...Array(yAxisColumnCount).keys()].map(i => (
                            <ContainerHorizontal>
                                <CoolTextField value={yAxisColumnLegends[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' legend text'} onChange={(event) => handleYAxisColumnLegendsChange(event, i)} />
                                <ColumnSelectYAxis columns={headerRow} colIndex={i} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                                <CoolTextField value={yAxisColumnColors[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' color'} onChange={(event) => handleYAxisColumnColorsChange(event, i)} />
                            </ContainerHorizontal>
                        ))}
                        <CoolButton style={{width:"10%"}} onClick={handleAddLine}> Add Line </CoolButton>
                        <ContainerHorizontal>
                            <CoolButton onClick={handleRender}> Render </CoolButton>
                            <CoolButton onClick={handleSave}> Save </CoolButton>
                        </ContainerHorizontal>
                    </ContainerVertical>
                </form>
                <h2>Render of the chart</h2>
                {typeof(localRenderData.column_data)=='object'?
                  <VisualizationController data={localRenderData} />
                  :
                  <h4>Hit Render to see the chart</h4>
                }
            </div>
      );
    }