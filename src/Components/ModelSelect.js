import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    marginRight:12,
    minWidth: 120,
    width:'100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export function ModelSelect(props) {
  const classes = useStyles();

  const {selectedID: [selectedID, setSelectedID]} = {selectedID: React.useState(0),...(props.state || {})};
  
  const handleChange = (event) => {
    setSelectedID(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel>{props.title? props.title: "Model"}</InputLabel>
        <Select
          native
          value={selectedID||0}
          onChange={handleChange}
        >
        <option aria-label="None" value="" />
        {Object.entries(props.list).map(attr => (
            <option value={attr[1]._id}> {attr[1].name} </option>
            ))}
        </Select>
      </FormControl>
  );
}
