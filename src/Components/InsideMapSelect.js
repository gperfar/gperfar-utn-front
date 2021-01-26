import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 60,
    width:'100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export function InsideMapSelect(props) {
  //This takes a whole array even though the intention is to always update the same value (given by props.colIndex). Useful for when you're inside a map function.
  
  const classes = useStyles();

  const {columnArray: [columnArray, setColumnArray]} = {columnArray: React.useState([]),...(props.state || {})};
  const {render: [render, setRender]} = {render: React.useState(1),...(props.state || {})};
  const indexInColumn = props.colIndex;
  const propertyInRow = props.rowProperty;

  const title = props.title;
  const listOfOptions = props.list;
  
  const handleChange = (event) => {
    var temp = columnArray;
    propertyInRow? 
      temp[indexInColumn][propertyInRow] = event.target.value
      :
      temp[indexInColumn] = event.target.value;
    setColumnArray(temp);
    console.log(columnArray);
    setRender(render + 1)
  };

  return (
      <FormControl style={{width:"100%"}} className={classes.formControl}>
        <InputLabel>{title || 'Select...'}</InputLabel>

        <Select native value={propertyInRow? columnArray[indexInColumn][propertyInRow] : columnArray[indexInColumn]} onChange={handleChange}>
          <option aria-label="None" value="" />
          {Object.entries(listOfOptions).map(opt => (
              <option value={opt[1]}> {opt[1]} </option>
              ))}
        </Select>
      </FormControl>
  );
}
