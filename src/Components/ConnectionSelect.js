import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function ConnectionSelect(props) {
  const classes = useStyles();

  const {connectionID: [connectionID, setConnectionID]} = {connectionID: React.useState(0),...(props.state || {})};

  // const [connectionID, setConnectionID] = React.useState('');

  const handleChange = (event) => {
    setConnectionID(event.target.value);
  };

  return (
    <div>
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
    </div>
  );
}
