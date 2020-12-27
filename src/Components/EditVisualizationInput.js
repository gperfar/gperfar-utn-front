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

    const [sentences, setSentences] = useState([]);
      useEffect(() => {
        getSentences().then(data => setSentences(data.result.sentences));
      }, []);
    
      const [sentenceID, setSentenceID] = useState('');
      const [name, setName] = useState('');
      const [comment, setComment] = useState('');
      const [visualizationType, setVisualizationType] = useState('');
      const [params, setParams] = useState({});

    const [visualizationTypes, setVisualizationTypes] = useState([]);
      
    useEffect(() => {
        getVisualizationTypes().then(data => {
            setVisualizationTypes(data.result["visualization types"]);
            setVisualizationType('linechart');
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


    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleSave = (event) => {
        saveVisualization().then(data=> console.log(data));          
    }
    
    return (
            <div>
                <form >
                    <ContainerVertical>
                        <h3>General</h3>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "50%"}}/>
                            <SentenceSelect style={{width:"100%"}} sentences={sentences} state={{ sentenceID: [sentenceID, setSentenceID] }} />
                            <VisualizationTypeSelect value={visualizationType} style={{width:"100%"}} visualizationTypes={visualizationTypes} state={{ visualizationType: [visualizationType, setVisualizationType] }} />
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                        <SpecificTypeFields sentenceID={sentenceID} visualizationType={visualizationType} state={{ params: [params, setParams] }}  />
                    </ContainerVertical>
                </form>
                    <div>
                        <CoolButton onClick={handleSave}> Save </CoolButton>
                    </div>
            </div>
      );
    }


export function SpecificTypeFields (props){
    const { user } = useAuth0();

    
    const {params: [params, setParams]} = {type: React.useState([{}]),...(props.state || {})};
    
    
    const [xAxisLabel, setXAxisLabel] = useState();
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
            // console.log(data.results);
            return data;
        }
        
        const [headerRow, setHeaderRow] = useState([]);
        const [results, setResults] = useState([]);
        
        useEffect(() => {
            getResults().then(data => {
                setResults(data.results);
                setHeaderRow(['a','b']);
                if (typeof(data.results)!=='undefined') {
                    setHeaderRow(Object.keys(data.results[0]));
                }
                // setXAxisColumn('a');
            });
        }, [props.sentenceID]);
        
        useEffect(() => {
            setXAxisLabel(params.xaxis_label);
            if (typeof(params.columns) !== 'undefined') {
                console.log(params);
                setXAxisColumn(params.columns[0].name);
                setYAxisColumnCount(params.columns.length-1);
                var tempLegends = [];//yAxisColumnLegends;
                var tempColors = [];//yAxisColumnColors;
                var tempNames = [];//yAxisColumnNames;
                [...Array(params.columns.length-1).keys()].map(i => {
                    console.log('this is index ' + i + ', going to ' + (params.columns.length-1).toString()+' because there are ' + yAxisColumnCount.toString());
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
        }, [params]);
        
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

    if (props.sentenceID!='' && props.visualizationType == "linechart") {
        return (
            <ContainerVertical>
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
            </ContainerVertical>
            )
        }
        return(
            <p></p>
        )
}
