import React, { useState, useEffect }  from 'react';
import {CoolTextField} from './CoolTextField';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { SimpleSelect } from './SimpleSelect';
import Divider from '@material-ui/core/Divider';
import { InsideMapSelect } from './InsideMapSelect';

export const ContainerHorizontal = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: baseline;
`

export const ContainerHorizontal2 = styled.div`
display:flex;
flex-direction: row;
justify-content: left;
align-items: flex-start;
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
    width:'100%'
    // maxHeight: 400,
    // marginTop: '15px'
  },
  list: {
    flexGrow: 1,
    // maxWidth: '30%',
    overflow: 'auto',
    maxHeight: 400,
    // marginTop: '15px'
  }
}));

export function VisualQueryBuilder(props) {
  const classes = useStyles();

  const {query: [query, setQuery]} = {render: React.useState(''),...(props.state || {})};
  const structure = props.connectionStructure;

  const [tables, setTables] = React.useState([]);
  const [selectedTable, setSelectedTable] = React.useState('');
  const [allSelectedTableColumns, setAllSelectedTableColumns] = React.useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [render, setRender] = React.useState(1);
  
  const grouping_options = ['Distinct', 'Max', 'Min', 'Count', 'Sum', 'Avg'];
  const filtering_options = ['Null', 'Not null', 'Less than', 'Greater than', 'Equals', 'Does not Equal'];

  useEffect(() => {
    const uniqueTableNames = [...new Set(structure.map(item => item.table_name))];
    setTables(uniqueTableNames);
  }, []);

  useEffect(() => {
    const possibleColumns = [...new Set(structure.filter(item => item.table_name === selectedTable))];
    setAllSelectedTableColumns(possibleColumns);
  }, [selectedTable]);


  const handleAddColumnToQuery = (event, data) => {
    console.log(data);
    data["grouping"] = 'Distinct';
    const temp_selectedColumns = selectedColumns;
    temp_selectedColumns.push(data);
    setSelectedColumns(temp_selectedColumns);
    buildQuery();
    setRender(render + 1);
  }

  const handleRemoveColumnFromQuery = (event, index) => {
    const temp_selectedColumns = selectedColumns;
    temp_selectedColumns.splice(index,1);
    setSelectedColumns(temp_selectedColumns);
    buildQuery();
    setRender(render + 1);
  }

  const handleAddColumnToFilter = (event, data) => {
    console.log(data);
    data["filtering"] = 'Not null';
    const temp_selectedFilters = selectedFilters;
    temp_selectedFilters.push(data);
    setSelectedFilters(temp_selectedFilters);
    buildQuery();
    setRender(render + 1);
  }

  const handleRemoveColumnFromFilter = (event, index) => {
    const temp_selectedFilters = selectedFilters;
    temp_selectedFilters.splice(index,1);
    setSelectedFilters(temp_selectedFilters);
    buildQuery();
    setRender(render + 1);
  }

  const handleFilteringParamChange = (event, index) => {
    const temp_selectedFilters = selectedFilters;
    temp_selectedFilters[index]['filtering_param']= event.target.value;
  }

  const buildQuery = (event) => {
    var temp_query = 'SELECT \n \t'
    // All columns selected
    selectedColumns.map(column => (
      temp_query = temp_query.concat('"', column.table_name, '"."', column.column_name,'",\n\t')
    ));
    temp_query = temp_query.slice(0,-3).concat('\nFROM \n \t');
    // All involved tables
    [...new Set(selectedColumns.map(item => item.table_name).concat(selectedFilters.map(item => item.table_name)))].map(table => (
      temp_query = temp_query.concat(table,',\n\t')
    ));
    temp_query = temp_query.slice(0,-3);
    setQuery(temp_query);
    // setQuery('SELECT * \nFROM Customers \nWHERE country = \'Argentina\' ');
  }

  return (
    <div className={classes.root} >
        <div style={{maxWidth:'25%', padding:15, justifyContent:'right'}}>
            <SimpleSelect title='Table name' list={tables} state={{ selectedItem: [selectedTable, setSelectedTable] }}/>
        </div>
        <ContainerHorizontal2>
            <div className={classes.listcontainer}>
                <h3 style={{margin:0, paddingTop:10, marginLeft:15}}>Available Columns</h3>
                <Divider style={{marginLeft:15}}/>
                <List className={classes.list} style={{paddingLeft:15}}>
                    {allSelectedTableColumns.map((row) => (
                        <div>
                            <ListItem>
                                <ListItemText
                                    primary={row["column_name"]}
                                    secondary={row["data_type"]}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="add" onClick={(event) => handleAddColumnToQuery(event, row)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="add" onClick={(event) => handleAddColumnToFilter(event, row)}>
                                        <FilterListIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider light />
                        </div>
                    ))}
                </List>
            </div>
            <Divider orientation="vertical" flexItem variant="middle"/>
            <div className={classes.listcontainer}>
                <h3 style={{margin:0, paddingTop:10}}>Selected Columns</h3>
                <Divider />
                <List className={classes.list} >
                    {selectedColumns.map((row, index) => (
                        <div>
                            <ListItem>
                                <ListItemAvatar style={{maxWidth:'40%', width: '30%'}}>
                                    <InsideMapSelect title='Grouping' list={grouping_options} colIndex={index} rowProperty='grouping' state={{columnArray: [selectedColumns,setSelectedColumns], render: [render, setRender] }}/>
                                    
                                </ListItemAvatar>
                                <ListItemText style={{marginRight:20, textAlign:'right'}}
                                    primary={row["column_name"]}
                                    secondary={row["table_name"]}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="add" onClick={(event) => handleRemoveColumnFromQuery(event, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider light />
                        </div>
                    ))}
                </List>
            </div>
            <Divider orientation="vertical" flexItem variant="middle"/>
            <div className={classes.listcontainer}>
                <h3 style={{margin:0, paddingTop:10}}>
                    Filters
                </h3>
                <Divider style={{marginRight:15}}/>
                <List className={classes.list} style={{paddingRight:15}}>
                    {selectedFilters.map((row, index) => (
                        <div>
                            <ListItem>
                                <ListItemAvatar style={{width:'50%', display:'flex', alignItems:'baseline'}}>
                                    <InsideMapSelect title='Filter type' list={filtering_options} colIndex={index} rowProperty='filtering' state={{columnArray: [selectedFilters,setSelectedFilters], render: [render, setRender] }}/>
                                    {['Less than', 'Greater than'].includes(row['filtering'])? 
                                        <CoolTextField style={{width:'40%', marginTop:0, marginRight:0}} placeholder='0' type='text' label='Value' value={row['filtering_param']} onChange={(event)=>handleFilteringParamChange(event,index)}/> : 
                                        <p></p>
                                    }
                                </ListItemAvatar>
                                <ListItemText style={{marginRight:20, textAlign:'right'}}
                                    primary={row["column_name"]}
                                    secondary={row["table_name"]}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="add" onClick={(event) => handleRemoveColumnFromFilter(event, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider light />
                        </div>
                    ))}
                </List>
            </div>
        </ContainerHorizontal2>
        <Divider />
        <CoolTextField value={query} style={{paddingRight: 25, height:'100%'}} maxRows={8} multiline disabled label='SQL Query' />
    </div>
  );
}