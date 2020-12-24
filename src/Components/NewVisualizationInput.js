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

export function NewVisualizationInput (props){
    
    const { logout, user } = useAuth0();

    async function getVisualizationTypes() {
      const url = "https://gperfar-utn.herokuapp.com/visualizations/types";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    // async function getVisualizationTypes(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ 
    //             'user_id': user.sub})
    //     };
    //     const response = await fetch('https://gperfar-utn.herokuapp.com/visualization/types', requestOptions);
    //     const data = await response.json();
    //     console.log(data.result);
    //     return data;
    // }

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


    // async function getQueryResults(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ 
    //             'connection_id': connectionID,
    //             'sql_query': SQLQuery})
    //     };
    //     const response = await fetch('https://gperfar-utn.herokuapp.com/runtemporaryquery', requestOptions);
    //     const data = await response.json();
    //     console.log(data.results);
    //     return data;
    // }


    async function saveVisualization(){
        const url = 'https://gperfar-utn.herokuapp.com/visualization/create';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'sentence_id': sentenceID,
                'type': visualizationType,
                'comment': comment,
                'name': name})
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
    
    const [visualizationTypes, setVisualizationTypes] = useState([]);
      useEffect(() => {
        getVisualizationTypes().then(data => {
            setVisualizationTypes(data.result["visualization types"]);
            setVisualizationType('linechart');
        }
        );
      }, []);

    const [sentenceID, setSentenceID] = useState('');
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
    
    // const handleSQLQueryChange = (event) => {
    //     setSQLQuery(event.target.value);
    //   }

    const handleCreate = (event) => {
        saveVisualization().then(data=> console.log(data));          
    }

    // const handleTest = (event) => {
    //     getQueryResults().then(data => setQueryResults(data.results))        

    // }
    
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
                {/* <SDATable info={queryResults} /> */}
                    <div>
                        {/* <CoolButton onClick={handleTest}> Test </CoolButton> */}
                        <CoolButton onClick={handleCreate}> Create </CoolButton>
                    </div>
            </div>
      );
    }


export function SpecificTypeFields (props){
    const { logout, user } = useAuth0();

    
    const {params: [params, setParams]} = {type: React.useState(),...(props.state || {})};
    
    
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [xAxisColumn, setXAxisColumn] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    const [columns, setColumns] = useState([]);
    
    const [yAxisColumns, setYAxisColumns] = useState(['']);

    const [yAxisColumnCount, setYAxisColumnCount] = useState(1);
    // const [yNames, setYNames] = useState(['']);
    // const [yColors, setYColors] = useState(['']);
    // useEffect(() => {
        
    const [render, setRender] = useState(0);
    // }, []);
    // function setValueAtIndex(index, value) {
    //     setColumns(columns => {
    //         columns[index]= value;
    //     })
    // }

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
    }

    // const handleXAxisColumnChange = (event) => {
    //     setXAxisColumn(event.target.value);
    // }

    const handleYAxisLabelChange = (event) => {
        setYAxisLabel(event.target.value);
    }
    const handleAddLine = (event) => {
        setYAxisColumnCount(yAxisColumnCount + 1);
        var temp = yAxisColumns;
        temp.push('');
        setYAxisColumns(temp);
        console.log(yAxisColumns);
    }

    if (props.sentenceID!='' && props.visualizationType == "linechart") {
        return (
            <ContainerVertical>
                <h3>X Axis</h3>
                <ContainerHorizontal>
                    <CoolTextField style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} />
                    <ColumnSelect style={{width:"100%"}} columns={headerRow} state={{ column: [xAxisColumn, setXAxisColumn] }} />
                    {/* <CoolTextField style={{width:"100%"}} type="text" label='X-Axis Column' onChange={handleXAxisColumnChange} /> */}
                </ContainerHorizontal>
                <h3>Y Axis</h3>
                {/* <p>{yAxisColumns.toString()}</p> */}
                <CoolTextField type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} />
                {[...Array(yAxisColumnCount).keys()].map(i => (
                    <ContainerHorizontal>
                        <ColumnSelectYAxis columns={headerRow} colIndex={i} state={{ columnArray: [yAxisColumns, setYAxisColumns], render: [render, setRender] }}/>
                        {/* <CoolTextField style={{width:"25%"}} type="text" label='Line color' onChange={handleYAxisLabelChange} /> */}
                    </ContainerHorizontal>
                ))}
                <CoolButton style={{width:"15%"}} onClick={handleAddLine}> Add Line </CoolButton>
                {/* <p>{yAxisColumnCount}</p> */}
            </ContainerVertical>
            )
        }
        return(
            <p></p>
        )
}
