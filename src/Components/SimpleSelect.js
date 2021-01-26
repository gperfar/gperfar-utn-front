import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      marginRight: 12,
      minWidth: 200,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  
  export function SimpleSelect(props) {
    const classes = useStyles();
  
    const {selectedItem: [selectedItem, setSelectedItem]} = {selectedItem: React.useState(''),...(props.state || {})};
    
    const handleChange = (event) => {
      setSelectedItem(event.target.value);
    };
  
    return (
        <FormControl className={classes.formControl}>
          <InputLabel>{props.title? props.title: "Select..."}</InputLabel>
          <Select
            native
            value={selectedItem||''}
            onChange={handleChange}
          >
          <option aria-label="None" value="" />
          {Object.entries(props.list).map(item => (
              <option value={item[1]}> {item[1].charAt(0).toUpperCase() + item[1].substring(1)} </option>
              ))}
          </Select>
        </FormControl>
    );
  }