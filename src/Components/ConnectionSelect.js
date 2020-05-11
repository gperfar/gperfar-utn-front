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

export function ConnectionSelect(props) {
  const classes = useStyles();

  const {connectionID: [connectionID, setConnectionID]} = {connectionID: React.useState(0),...(props.state || {})};
  
  const handleChange = (event) => {
    setConnectionID(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel>Connection</InputLabel>
        <Select
          native
          value={connectionID}
          onChange={handleChange}
        >
        <option aria-label="None" value="" />
        {Object.entries(props.connections).map(attr => (
            <option value={attr[1]._id}> {attr[1].name} </option>
            ))}
        </Select>
      </FormControl>
  );
}
