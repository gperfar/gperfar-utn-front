import React, { useState, useEffect }  from 'react';
import {CoolButton, CoolButton2} from '../Components/CoolButton';
import {ContainerVertical} from '../GlobalStyles';
// import {ConnectionSelect} from '../Components/ConnectionSelect';
import {CoolTextField} from './CoolTextField';
import {VisualQueryBuilder} from './VisualQueryBuilder';
import SDATable from './Table';
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {ModelSelect} from './ModelSelect'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';

import _ from 'lodash';

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

const useStyles = makeStyles((theme) => ({
    

    root: {
      marginTop: '15px',
      marginBottom: '15px',
      // paddingTop: '15px',
      paddingBottom: '15px',
      backgroundColor: theme.palette.background.paper,
      // '& .MuiTextField-root': {
      //   margin: theme.spacing(1),
      //   // width: '25ch',
      // },
    },
  
    listcontainer: {
      flexGrow: 1,
      maxWidth: '100%',
      width:'100%',
      height: '100%',
      // minHeight: 400
      // maxHeight: 600,
      // marginTop: '15px'
    },
    list: {
      flexGrow: 1,
      // maxWidth: '30%',
      overflow: 'auto',
      maxHeight: 500,
      height: '100%'
      // marginTop: '15px'
    }
  }));



export function EditSentenceInput (props){

    const classes = useStyles();


    const sentenceID = props.sentenceID;
    const { logout, user } = useAuth0();
    const [render, setRender] = useState(0);
    const [connectionID, setConnectionID] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [SQLQuery, setSQLQuery] = useState('');
    const [connections, setConnections] = useState([]);
    // const [sentence, setSentence] = useState([]);
    const [queryResults, setQueryResults] = useState([]);
    const [connectionStructure, setConnectionStructure] = useState([]);
    const [visualQueryParams, setVisualQueryParams] = useState({});
    const [transformationSteps, setTransformationSteps] = useState([]);
    const [editStep,setEditStep] = useState(); 
    useEffect(() => {
        getSentenceData().then((data) =>{
            //   setSentence(data.result.sentence);
            setSQLQuery(data.result.sentence.sql_query);
            setComment(data.result.sentence.comment);
            setName(data.result.sentence.name);
            setConnectionID(data.result.sentence.connection_id);
            setVisualQueryParams(data.result.sentence.visual_query_params);
        } );
    }, []);
    
    useEffect(() => {
        getConnections().then(data => {
            console.log(data.result.connections);
            setConnections(data.result.connections);
            
        });
    }, []);
    
    useEffect(() => {
        getQueryResults( 
            "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name != 'pg_stat_statements'"
            ).then(data => {
                setConnectionStructure(data.results);            
        });
    }, [connectionID]);
    
    async function getSentenceData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'sentence_id': sentenceID,
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/sentences', requestOptions);
        const data = await response.json();
        return data;
    }

    async function getConnections(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/connections', requestOptions);
        const data = await response.json();
        console.log(data.result);
        return data;
    }


    async function getQueryResults(sql_query = SQLQuery){
        const url = 'https://gperfar-utn.herokuapp.com/runtemporaryquery';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connection_id': connectionID,
                'sql_query': sql_query})
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    async function saveEditedSentence(){
        const url = 'https://gperfar-utn.herokuapp.com/sentence/edit';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id':user.sub,
                'sentence_id':sentenceID,
                'connection_id': connectionID,
                'sql_query': SQLQuery,
                'comment': comment,
                'name': name,
                'visual_query_params': visualQueryParams})
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data.results);
        return data;
    }

    async function createSentence(){
        const url = 'https://gperfar-utn.herokuapp.com/sentence/create';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id':user.sub,
                'connection_id': connectionID,
                'sql_query': SQLQuery,
                'comment': comment,
                'name': name,
                'visual_query_params': visualQueryParams})
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
    
    const handleSQLQueryChange = (event) => {
        setSQLQuery(event.target.value);
      }

    const handleSave = (event) => {
        saveEditedSentence().then(data=> {
            console.log(data)
            alert('Sentence saved successfully!');
        });
    }

    const handleCreate = (event) => {
        createSentence().then(data=> {
            console.log(data);
            alert("Sentence created successfully!");          
        });
    }


    const handleTest = (event) => {
        getQueryResults().then(data => setQueryResults(data.results))        
    }

    const handleAddTransformationStep = (event, type) => {
        const temp_steps = transformationSteps;
        temp_steps.push({
            "type": type,
            "results": queryResults, 
            "params":
                type==='Select columns'? {columns: visualQueryParams.selected_columns} 
                : '',
            "comment": ''
        })
        setTransformationSteps(temp_steps);
        setRender(render + 1);
        console.log(transformationSteps);
    }

    const handleRemoveTransformationStep = (event, index) => {
        var temp_steps = transformationSteps;
        temp_steps.splice(index,1);
        setTransformationSteps(temp_steps);
        setRender(render + 1);
    }

    const handleSetEditTransformationStep = (event, index) => {
        setEditStep(index);
    }

    const handleSelect = (event, stepIndex, selectedColumns) => {
        var temp_queryResults = queryResults;
        console.log(selectedColumns);
        console.log(
            _.map(temp_queryResults, item => _.pick(item,selectedColumns.map(item => item.label)))
        );
        var temp_steps = transformationSteps;
        temp_steps[stepIndex].results = _.map(temp_queryResults, item => _.pick(item,selectedColumns.map(item => item.label)))
        setTransformationSteps(temp_steps);
        setRender(render + 1);
    }
    
    const handleSelectToggle = (event, stepIndex, columnIndex) => {
        console.log('Changing state from step ', stepIndex, ' column ', columnIndex, ' from ', transformationSteps[stepIndex].params.columns[columnIndex].checked);
        var temp_steps = transformationSteps;
        temp_steps[stepIndex].params.columns[columnIndex].checked = temp_steps[stepIndex].params.columns[columnIndex].checked ===false? true: false;
        setTransformationSteps(temp_steps);
        setRender(render + 1);
        console.log('Modified transformationSteps');
    }
    return (
            <div>
                <h2>General information</h2>
                <ContainerVertical className={classes.root}>
                    <ContainerHorizontal>
                        <CoolTextField value={name} type="text" label='Sentence Name' onChange={handleNameChange} />
                        <ModelSelect title='Connection' list={connections} state={{ selectedID: [connectionID, setConnectionID] }} />
                    </ContainerHorizontal>
                    <ContainerHorizontal>
                        <CoolTextField value={comment} type="text" label='Comment' onChange={handleCommentChange} />
                    </ContainerHorizontal>
                </ContainerVertical>
                <h2>Visual Query Builder</h2>
                {typeof(connectionStructure) !== 'undefined'?
                    <VisualQueryBuilder connectionStructure={connectionStructure} state={{ query: [SQLQuery, setSQLQuery] , params: [visualQueryParams, setVisualQueryParams]}} />:
                    <p>{typeof(connectionStructure)}</p>
                }
                {queryResults.length > 0 && 
                <div>
                    <h2>Transformation steps</h2>
                    <div className={classes.root}>
                        <div className={classes.listcontainer}>
                            <List className={classes.list}>
                                {transformationSteps.map((step,index) => 
                                    <div>
                                        <ListItem>
                                            <ListItemText primary={step.type} secondary={step.comment}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="add" onClick={(event) => handleSetEditTransformationStep(event, index)}> <EditIcon /> </IconButton>
                                                <IconButton edge="end" aria-label="add" onClick={(event) => handleRemoveTransformationStep(event, index)}> <DeleteIcon /> </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        {editStep === index &&
                                            <div>
                                                {step.type ==='Select columns' &&
                                                    <List className={classes.list}>
                                                        {step.params.columns.map((column, columnIndex) =>(
                                                            <div>
                                                                <ListItem onClick={(event) => handleSelectToggle(event, index, columnIndex)}>
                                                                    <ListItemIcon> <Checkbox edge="start" checked={typeof(step.params.columns[columnIndex].checked)!== 'undefined'? step.params.columns[columnIndex].checked : true} /> </ListItemIcon>
                                                                    <ListItemText primary={column.label} />
                                                                </ListItem>
                                                                <Divider light center/>
                                                            </div>
                                                        ))
                                                    }
                                                    <CoolButton2 onClick={(event) => handleSelect(event, index, step.params.columns.filter(column => column.checked == true || column.checked == undefined ))}> Save </CoolButton2>
                                                    </List>
                                                }
                                            </div>
                                        }
                                        <Divider/>
                                    </div>
                                )}
                            </List>
                        </div>
                        <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                        <ButtonGroup color='primary' size='small'>
                            <Button onClick={(event) => handleAddTransformationStep(event,'Select columns')}>Select columns</Button>
                            <Button onClick={(event) => handleAddTransformationStep(event,'Sort')}>Sort</Button>
                        </ButtonGroup>
                        </div>
                    </div> 
                    <h2>Query results</h2>
                    <SDATable info={transformationSteps.length > 0? transformationSteps[transformationSteps.length -1].results : queryResults} />
                </div>         
                }
                <div>
                    <CoolButton onClick={handleTest}> Test </CoolButton>
                    {sentenceID > 0? 
                            <CoolButton onClick={handleSave}> Save Changes </CoolButton> : <CoolButton onClick={handleCreate}> Create Sentence </CoolButton>
                    }
                </div>
            </div>
      );
    }