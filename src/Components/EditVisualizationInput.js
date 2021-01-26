import React, { useState, useEffect }  from 'react';
import {CoolButton, CoolButton2} from './CoolButton';
import {ContainerVertical} from '../GlobalStyles';
import {SentenceSelect} from './SentenceSelect';
import {VisualizationTypeSelect} from './VisualizationTypeSelect';
import {ColumnSelect} from './ColumnSelect';
import {InsideMapSelect} from './InsideMapSelect';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {VisualizationController} from './Visualizations/VisualizationController'
import {SimpleSelect} from './SimpleSelect'
import {ModelSelect} from './ModelSelect'

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

    async function createVisualization(){
        const url = 'https://gperfar-utn.herokuapp.com/visualization/create';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub,
                // 'visualization_id': visualizationID,
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
    const [sentenceID, setSentenceID] = useState(props.sentenceID);
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
    const [scatterShape, setScatterShape] = useState('circle');
    
    const allScatterShapes = ['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye' ]

    useEffect(() => {
        getSentences().then(data => 
            setSentences(data.result.sentences)
        );
        getVisualizationTypes().then(data => {
            setVisualizationTypes(data.result["visualization types"]);
            // setVisualizationType('Line chart');
        });
        getVisualizationData().then((data) =>{
            setSentenceID(data.result.visualization.sentence_id);
            setComment(data.result.visualization.comment);
            setName(data.result.visualization.name);
            setParams(data.result.visualization.params);
            setVisualizationType(data.result.visualization.type);
            // console.log(params);
            });
      }, []);

    useEffect(() => {
        if (sentenceID > 0) {
            console.log(sentenceID);
            getQueryResults().then(data => {
                setQueryResults(data.results);
                console.log(data);
                setHeaderRow(['a','b']);
                if (typeof(data.results)!=='undefined') {
                    setHeaderRow(Object.keys(data.results[0]));
                }
            });
        }
    }, [sentenceID]);

    useEffect(() => {
        setXAxisLabel(params.xaxis_label);
        if (typeof(params.columns) !== 'undefined') {
            setXAxisColumn(params.columns[0].name);
            setYAxisColumnCount(params.columns.length-1);
            var tempLegends = [];//yAxisColumnLegends;
            var tempColors = [];//yAxisColumnColors;
            var tempNames = [];//yAxisColumnNames;
            [...Array(params.columns.length-1).keys()].map(i => {
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
        // setRender(render + 1);
    },[headerRow]);

    useEffect(() => {
        buildParams();
    }, [render]);
    
    useEffect(() => {
        // if ((visualizationType === 'Radar chart' ||  visualizationType === 'Pie chart' ) && render > 0){
        if ((visualizationType === 'Radar chart' ||  visualizationType === 'Pie chart' )){
            console.log('Render ' + render);
            // alert("radar chart");
            setYAxisColumnCount(1);
            console.log(yAxisColumnCount);
            if (render > 0) setRender(render + 1);
        }
    }, [visualizationType]);

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleScatterShapeChange = (event) => {
        setScatterShape(event.target.value);
    }
    
    const handleXAxisLabelChange = (event) => {
        setXAxisLabel(event.target.value);
        console.log(xAxisLabel);
        setRender(render + 1);
    }
    
    const handleYAxisLabelChange = (event) => {
        setYAxisLabel(event.target.value);
        setRender(render + 1);
    }
    
    const handleYAxisColumnLegendsChange = (event, index) => {
        var temp = yAxisColumnLegends;
        temp[index] = event.target.value;
        setYAxisColumnLegends(temp);
        setRender(render + 1);
        // buildParams();
    }
    
    const handleYAxisColumnColorsChange = (event, index) => {
        var temp = yAxisColumnColors;
        temp[index] = event.target.value;
        setYAxisColumnColors(temp);
        setRender(render + 1)
        // buildParams();
    }
    
    function buildParams (){
        var tempColumns = [];
        tempColumns.push({name: xAxisColumn});
        [...Array(yAxisColumnCount).keys()].map(i => {
            tempColumns.push({
                name: yAxisColumnNames[i],
                color: yAxisColumnColors[i],
                legend: yAxisColumnLegends[i]
            })
        });
        var tempParams = {
            columns: tempColumns,
            xaxis_label: xAxisLabel,
            yaxis_label: yAxisLabel,
            scatter_shape: scatterShape
        }
        setParams(tempParams);
    } 
    
    const handleAddLine = (event) => {
        setYAxisColumnCount(yAxisColumnCount + 1);
        var temp = yAxisColumnNames;
        temp.push('');
        setYAxisColumnNames(temp);
        setRender(render + 1);
    }
    
    const handleToggleZAxis = (event) => {
        if (yAxisColumnCount > 1){
            setYAxisColumnCount(1);
            setRender(render + 1);
        }
        if (yAxisColumnCount == 1){
            setYAxisColumnCount(2);
            var temp = yAxisColumnNames;
            temp.push('');
            setYAxisColumnNames(temp);
            setRender(render + 1);
        }
    }
    
    const handleRender = (event) => {
        // buildParams();
        setLocalRenderData({
            column_data: params.columns,
            results: queryResults,
            type: visualizationType,
            scatter_shape: scatterShape,
            xaxis_label: xAxisLabel !==''? xAxisLabel:'',
            yaxis_label: yAxisLabel !==''? yAxisLabel:''
        });
        console.log(localRenderData);
        // console.log(typeof(localRenderData.column_data));
        console.log(params);
    }
    
    const handleSave = (event) => {
        saveVisualization().then(data=> {
            console.log(data)
            alert("Visualization saved successfully!");          
        });
    }

    const handleCreate = (event) => {
        createVisualization().then(data=> {
            console.log(data)
            alert("Visualization created successfully!");          
        });
    }

    if (visualizationType === 'Radar chart' || visualizationType === 'Pie chart') {
        return (
            <div>
                <form >
                    <ContainerVertical>
                        <h3>General</h3>
                        <ContainerHorizontal>
                            <CoolTextField value={name} type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "100%"}}/>
                            <ModelSelect title='Sentence' list={sentences} state={{ selectedID: [sentenceID, setSentenceID] }} />
                            <SimpleSelect title='Visualization type' /*style={{width:"100%"}}*/ list={visualizationTypes} state={{ selectedItem: [visualizationType, setVisualizationType] }} />
                        </ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                        <h3>Category Field</h3>
                        <ContainerHorizontal>
                            {/* <CoolTextField value={xAxisLabel} style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} /> */}
                            <SimpleSelect title='Column' list={headerRow} state={{ selectedItem: [xAxisColumn, setXAxisColumn] }} />
                        </ContainerHorizontal>
                        <h3>Value Field</h3>
                        {/* <CoolTextField value={yAxisLabel} type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} /> */}
                        {[...Array(yAxisColumnCount).keys()].map(i => (
                            <ContainerHorizontal>
                                <CoolTextField value={yAxisColumnLegends[i]} style={{width:"100%"}} type="text" label={'Value text'} onChange={(event) => handleYAxisColumnLegendsChange(event, i)} />
                                <InsideMapSelect title='Column' list={headerRow} colIndex={i} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                                <CoolTextField value={yAxisColumnColors[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' color'} onChange={(event) => handleYAxisColumnColorsChange(event, i)} />
                            </ContainerHorizontal>
                        ))}
                        {/* <CoolButton style={{width:"10%"}} onClick={handleAddLine}> Add Line </CoolButton> */}
                        <ContainerHorizontal>
                            <CoolButton onClick={handleRender}> Render </CoolButton>
                            {visualizationID > 0? 
                                <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Visualization </CoolButton>
                            }
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
    if (visualizationType === 'Scatter chart') {
        return (
            <div>
            <form >
                <ContainerVertical>
                    <h3>General</h3>
                    <ContainerHorizontal>
                        <CoolTextField value={name} type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "100%"}}/>
                        <ModelSelect title='Sentence' list={sentences} state={{ selectedID: [sentenceID, setSentenceID] }} />
                        <SimpleSelect title='Visualization type' /*style={{width:"100%"}}*/ list={visualizationTypes} state={{ selectedItem: [visualizationType, setVisualizationType] }} />
                    </ContainerHorizontal>
                    <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                    <ContainerHorizontal>
                        <CoolTextField value={yAxisColumnColors[0]} style={{width:"100%"}} type="text" label={'Color'} onChange={(event) => handleYAxisColumnColorsChange(event, 0)} />
                        <SimpleSelect title='Shape' style={{width:"100%"}} list={allScatterShapes} state={{ selectedItem: [scatterShape, setScatterShape] }}/>
                    </ContainerHorizontal>
                    <h3>X Axis</h3>
                    <ContainerHorizontal>
                        <CoolTextField value={xAxisLabel||''} style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} />
                        <SimpleSelect title='Column' list={headerRow} state={{ selectedItem: [xAxisColumn, setXAxisColumn] }} />
                    </ContainerHorizontal>
                    <h3>Y Axis</h3>
                    <CoolTextField value={yAxisLabel||''} type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} />
                    <ContainerHorizontal>
                        <CoolTextField value={yAxisColumnLegends[0]} style={{width:"100%"}} type="text" label={'Column '+(0+1)+' legend text'} onChange={(event) => handleYAxisColumnLegendsChange(event, 0)} />
                        <InsideMapSelect title='Column' list={headerRow} colIndex={0} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                    </ContainerHorizontal>
                    <ContainerHorizontal>
                        <h3>Z Axis </h3>
                        <CoolButton2 /*style={{width:"10%"}}*/ onClick={handleToggleZAxis}>{yAxisColumnCount == 1? 'Add': 'Remove'}</CoolButton2>
                    </ContainerHorizontal>
                    {
                        yAxisColumnCount > 1 &&
                        <ContainerHorizontal>
                            <CoolTextField value={yAxisColumnLegends[1]||''} style={{width:"100%"}} type="text" label={'Z-Axis Label'} onChange={(event) => handleYAxisColumnLegendsChange(event, 1)} />
                            <InsideMapSelect title='Column' list={headerRow} colIndex={1} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                        </ContainerHorizontal>
                    }
                    <ContainerHorizontal>
                        <CoolButton onClick={handleRender}> Render </CoolButton>
                        {visualizationID > 0? 
                            <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Visualization </CoolButton>
                        }
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
    return (
        <div>
            <form >
                <ContainerVertical>
                    <h3>General</h3>
                    <ContainerHorizontal>
                        <CoolTextField value={name} type="text" label='Visualization Name' onChange={handleNameChange} style={{width: "100%"}}/>
                        <ModelSelect title='Sentence' list={sentences} state={{ selectedID: [sentenceID, setSentenceID] }} />
                        <SimpleSelect title='Visualization type' /*style={{width:"100%"}}*/ list={visualizationTypes} state={{ selectedItem: [visualizationType, setVisualizationType] }} />
                    </ContainerHorizontal>
                    <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                    <h3>X Axis</h3>
                    <ContainerHorizontal>
                        <CoolTextField value={xAxisLabel} style={{width:"100%"}} type="text" label='X-Axis Label' onChange={handleXAxisLabelChange} />
                        <SimpleSelect title='Column' list={headerRow} state={{ selectedItem: [xAxisColumn, setXAxisColumn] }} />
                    </ContainerHorizontal>
                    <h3>Y Axis</h3>
                    <CoolTextField value={yAxisLabel} type="text" label='Y-Axis Label' onChange={handleYAxisLabelChange} />
                    {[...Array(yAxisColumnCount).keys()].map(i => (
                        <ContainerHorizontal>
                            <CoolTextField value={yAxisColumnLegends[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' legend text'} onChange={(event) => handleYAxisColumnLegendsChange(event, i)} />
                            <InsideMapSelect title='Column' list={headerRow} colIndex={i} state={{ columnArray: [yAxisColumnNames, setYAxisColumnNames], render: [render, setRender] }}/>
                            <CoolTextField value={yAxisColumnColors[i]} style={{width:"100%"}} type="text" label={'Column '+(i+1)+' color'} onChange={(event) => handleYAxisColumnColorsChange(event, i)} />
                        </ContainerHorizontal>
                    ))}
                    <CoolButton style={{width:"10%"}} onClick={handleAddLine}> Add Line </CoolButton>
                    <ContainerHorizontal>
                        <CoolButton onClick={handleRender}> Render </CoolButton>
                        {visualizationID > 0? 
                            <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Visualization </CoolButton>
                        }
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