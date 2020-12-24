import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    marginLeft: 15,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export function VisualizationTypeSelect(props) {
  const classes = useStyles();

  const {visualizationType: [visualizationType, setVisualizationType]} = {visualizationType: React.useState(0),...(props.state || {})};
  
  const handleChange = (event) => {
    setVisualizationType(event.target.value);
  };

  return (
      <FormControl style={{minWidth: 200}} className={classes.formControl}>
        <InputLabel>Visualization Type</InputLabel>
        <Select
          native
          value={visualizationType}
          onChange={handleChange}
        >
        <option aria-label="None" value="" />
        {Object.entries(props.visualizationTypes).map(attr => (
            <option value={attr[1]}> {attr[1]} </option>
            ))}
        </Select>
      </FormControl>
  );
}
