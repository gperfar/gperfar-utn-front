import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export function ColumnSelectYAxis(props) {
  const classes = useStyles();

  const {columnArray: [columnArray, setColumnArray]} = {columnArray: React.useState([]),...(props.state || {})};
  const {render: [render, setRender]} = {render: React.useState(1),...(props.state || {})};
  
  const handleChange = (event) => {
    var temp = columnArray;
    temp[props.colIndex] = event.target.value;
    setColumnArray(temp);
    console.log(columnArray);
    setRender(render + 1)
  };

  return (
      <FormControl style={{width:"100%"}} className={classes.formControl}>
        <InputLabel>Column</InputLabel>
        <Select
          native
          value={columnArray[props.colIndex]}
          onChange={handleChange}
        >
        <option aria-label="None" value="" />
        {Object.entries(props.columns).map(col => (
            <option value={col[1]}> {col[1]} </option>
            ))}
        </Select>
      </FormControl>
  );
}
