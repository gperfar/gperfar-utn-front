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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    maxHeight: 600,
    height: '100%'
    // marginTop: '15px'
  }
}));

export function VisualQueryBuilder(props) {
  const classes = useStyles();

  const {query: [query, setQuery]} = {query: React.useState(''),...(props.state || {})};
  const {params: [params, setParams]} = {params: React.useState({}),...(props.state || {})};
  
  const structure = props.connectionStructure;

  const [tables, setTables] = React.useState([]);
  const [selectedTable, setSelectedTable] = React.useState('');
  const [allSelectedTableColumns, setAllSelectedTableColumns] = React.useState([]);

  // These below are the ones saved in VisualQueryParams
  const [selectedColumns, setSelectedColumns] = React.useState(params["selected_columns"]|| []);
  const [selectedFilters, setSelectedFilters] = React.useState(params["selected_filters"]|| []);
  const [selectedTables, setSelectedTables] = React.useState(params["selected_tables"] || [] );
  const [tableJoins, setTableJoins] = React.useState(params["table_joins"] || []);
  const [joinKeys, setJoinKeys] = React.useState(params["join_keys"] || []);
  // This are just things we need to render stuff properly
  const [render, setRender] = React.useState(1);
  const [render2, setRender2] = React.useState(1);
  const [updateInTables, setUpdateInTables] = React.useState(1);
  // Consts...
  const grouping_options = ['Distinct', 'Max', 'Min', 'Count', 'Sum', 'Avg'];
  const filtering_options = ['Null', 'Not null', 'Less than', 'Greater than', 'Equals', 'Does not Equal'];
  const join_options = ['Full Outer Join', 'Left Join', 'Inner Join'];
  
  const grouping_options_convert = {
      'Max': 'MAX(',
      'Min': 'MIN(',
      'Count': 'COUNT(',
      'Sum': 'SUM(',
      'Avg': 'AVG('
  }

  const filtering_options_convert = {
      'Null': ' IS NULL ',
      'Not null': ' IS NOT NULL ',
      'Less than': ' < ',
      'Greater than': ' > ',
      'Equals': ' = ',
      'Does not Equal': ' != '
  }

  useEffect(() => {
    const uniqueTableNames = [...new Set(structure.map(item => item.table_name))];
    setTables(uniqueTableNames);
  }, []);

  useEffect(() => {
    const possibleColumns = [...new Set(structure.filter(item => item.table_name === selectedTable))];
    setAllSelectedTableColumns(possibleColumns);
  }, [selectedTable]);

  useEffect(() => {
    setSelectedTables([...new Set(selectedColumns.map(item => item.table_name).concat(selectedFilters.map(item => item.table_name)))]);
    setUpdateInTables(updateInTables + 1);
  }, [render]);
  
  useEffect(() => {
      selectedTables.map((t, index) => {
        var temp_tableJoins = tableJoins;
        if (temp_tableJoins.length -1  < index) {
            temp_tableJoins.push('Full Outer Join');
            setTableJoins(temp_tableJoins);

        }

        var temp_joinKeys = joinKeys;
        if (temp_joinKeys.length -1 < index) {
            temp_joinKeys.push({'left': '', 'right': ''});
            setJoinKeys(temp_joinKeys);
        }
        console.log(tableJoins);
        console.log(joinKeys);
      })
      setRender2(render2 + 1);
    }, [updateInTables]);
  
  useEffect(() => {
      buildQuery();
    }, [render2]);

  const handleAddColumnToQuery = (event, data) => {
    console.log(data);
    data["grouping"] = 'Distinct';
    var temp_selectedColumns = selectedColumns;
    temp_selectedColumns.push(data);
    setSelectedColumns(temp_selectedColumns);
    setRender(render + 1);
  }

  const handleRemoveColumnFromQuery = (event, index) => {
    var temp_selectedColumns = selectedColumns;
    temp_selectedColumns.splice(index,1);
    setSelectedColumns(temp_selectedColumns);
    setRender(render + 1);
  }

  const handleAddColumnToFilter = (event, data) => {
    console.log(data);
    data["filtering"] = 'Not null';
    var temp_selectedFilters = selectedFilters;
    temp_selectedFilters.push(data);
    setSelectedFilters(temp_selectedFilters);
    setRender(render + 1);
  }

  const handleRemoveColumnFromFilter = (event, index) => {
    var temp_selectedFilters = selectedFilters;
    temp_selectedFilters.splice(index,1);
    setSelectedFilters(temp_selectedFilters);
    setRender(render + 1);
  }

  const handleFilteringParamChange = (event, index) => {
    var temp_selectedFilters = selectedFilters;
    temp_selectedFilters[index]['filtering_param']= event.target.value;
    setSelectedFilters(temp_selectedFilters);
    setRender(render + 1);
  }

  function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

const handleMoveTableUp = (event, index) => {
    var temp_selectedTables = selectedTables;
    temp_selectedTables = array_move(temp_selectedTables,index,index -1);
    setSelectedTables(temp_selectedTables);
    console.log(temp_selectedTables);
    setRender2(render2 + 1);
  }

  const handleMoveTableDown = (event, index) => {
    var temp_selectedTables = selectedTables;
    temp_selectedTables = array_move(temp_selectedTables,index,index +1);
    setSelectedTables(temp_selectedTables);
    setRender2(render2 + 1);
    console.log(temp_selectedTables);
  }

  const buildQuery = (event) => {
    var temp_query = 'SELECT \n \t'
    // All columns selected
    selectedColumns.map(column => (
      temp_query = temp_query.concat(column.grouping != 'Distinct'?grouping_options_convert[column.grouping]:'','"', column.table_name, '"."', column.column_name, column.grouping!= 'Distinct'? '"),\n\t':'",\n\t')
    ));
    temp_query = temp_query.slice(0,-3).concat('\nFROM \n \t');
    // All involved tables
    selectedTables.map((table, index) => {
      if (index > 0) temp_query = temp_query.concat(' ', tableJoins[index-1], ' ');
      temp_query = temp_query.concat(table);
      if (index > 0) temp_query = temp_query.concat(' ON ', joinKeys[index-1]["left"], ' = ', joinKeys[index-1]["right"],' \n\t');
    });
    temp_query = selectedTables.length > 1 ? temp_query.slice(0,-3): temp_query;
    if (selectedFilters.length > 0){
      temp_query = temp_query.concat( '\nWHERE \n \t');
      selectedFilters.map(column => (
        temp_query = temp_query.concat('"', column.table_name, '"."', column.column_name,'"', filtering_options_convert[column.filtering], column.filtering_param? column.filtering_param: '', '\n\t')
      ));
    }
    if (selectedColumns.filter(item => item.grouping == 'Distinct').length > 0) {
        temp_query = temp_query.concat('\n GROUP BY \n \t');
        selectedColumns.filter(item => item.grouping =='Distinct').map(column => (
            temp_query = temp_query.concat('"', column.table_name, '"."', column.column_name, '", \n\t')
        ))
        temp_query = temp_query.slice(0,-4);
    }
    setQuery(temp_query);
    setParams({
        'selected_tables': selectedTables,
        'selected_columns': selectedColumns,
        'selected_filters': selectedFilters,
        'table_joins': tableJoins,
        'join_keys': joinKeys
    })
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
                {/* {selectedTable.length > 0 && */}
                    <div>
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
                {/* } */}
            </div>
            <Divider orientation="vertical" flexItem variant="middle"/>
                <div className={classes.listcontainer}>
                    {/* {selectedTables.length > 0 && */}
                    <div>
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
                                            {['Less than', 'Greater than', 'Equals', 'Does not equal'].includes(row['filtering'])? 
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
                    {/* } */}
                </div>
        </ContainerHorizontal2>
        <Divider />
        {selectedTables.length > 0 &&
            <div className={classes.listcontainer}>
                <h3 style={{margin:'0px 15px', paddingTop:10}}>
                    Table Joins
                </h3>
                <Divider style={{marginLeft:15, marginRight:15}}/>
                <List className={classes.list} style={{paddingRight:15}}>
                    {selectedTables.map((row, index) => (
                        <div>
                            <ListItem style={{alignItems: 'baseline'}}>
                                <div style={{width: '25%', marginRight: 15}}>
                                    {index == 0 &&
                                        <h3 style={{margin:'0px 15px'}}> {row.charAt(0).toUpperCase() + row.substring(1)} </h3>
                                    } 
                                </div>
                                <div style={{width:'100%'}}>
                                    {index > 0 && 
                                        <div style={{width:'100%', display:'flex',flexDirection:'row', alignItems:'baseline'}}>
                                            <InsideMapSelect title='Join type' list={join_options} colIndex={index-1} state={{columnArray: [tableJoins,setTableJoins], render: [render, setRender] }}/>
                                            <h3 style={{margin:'0px 15px', minWidth:250}}> {row.charAt(0).toUpperCase() + row.substring(1)} </h3>
                                            <p style={{marginLeft: 15, marginRight: 15, textIndent: 0}}> ON </p>
                                            <InsideMapSelect title={'Previous tables\'s key'} list={[...new Set(structure.filter(item => selectedTables.slice(0,index).includes(item.table_name)))].map(item => item.table_name.concat('.',item.column_name))} rowProperty='left' colIndex={index-1} state={{columnArray: [joinKeys,setJoinKeys], render: [render, setRender] }}/>
                                            <p style={{marginLeft: 15, marginRight: 15, textIndent: 0}}> = </p>
                                            <InsideMapSelect title={row + ' key'} list={[...new Set(structure.filter(item => item.table_name === row))].map(item => item.table_name.concat('.',item.column_name))} colIndex={index-1} rowProperty='right' state={{columnArray: [joinKeys,setJoinKeys], render: [render, setRender] }}/>
                                        </div>
                                    }
                                </div>
                                <ButtonGroup style={{marginLeft: 15, marginRight: 15}} color="primary" aria-label="outlined primary button group">
                                    {index > 0 ? <Button onClick={(event) => handleMoveTableUp(event,index)}>▲</Button> : <Button disabled onClick={(event) => handleMoveTableUp(event,index)}>▲</Button>}
                                    {index < selectedTables.length - 1 ? <Button onClick={(event) => handleMoveTableDown(event,index)}>▼</Button> : <Button disabled onClick={(event) => handleMoveTableDown(event,index)}>▼</Button>}
                                </ButtonGroup>
                            </ListItem>
                            <Divider light />
                        </div>
                    ))}
                </List>
            </div>
        }
        <Divider />
        {/* {selectedTables.length > 0 && */}
            <div className={classes.listcontainer}>
                <h3 style={{margin:'0px 15px', paddingTop:10}}>
                    Sorting & Row limiting options
                </h3>
                <Divider style={{marginLeft:15, marginRight:15}}/>
                <p>I have to do this :) </p>
            </div>
        {/* } */}
        <Divider />
        {/* {selectedTables.length > 0 && */}
            <div>
                <h3 style={{margin:'0px 15px', paddingTop:10}}>
                    Resulting SQL
                </h3>
                <CoolTextField value={query} style={{paddingRight: 25, height:'100%'}} maxRows={8} multiline disabled label='SQL Query' />
            </div>
        {/* } */}
    </div>
  );
}