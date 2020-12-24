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

export function SentenceSelect(props) {
  const classes = useStyles();

  const {sentenceID: [sentenceID, setSentenceID]} = {sentenceID: React.useState(0),...(props.state || {})};
  
  const handleChange = (event) => {
    setSentenceID(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel>Sentence</InputLabel>
        <Select
          native
          value={sentenceID}
          onChange={handleChange}
        >
        <option aria-label="None" value="" />
        {Object.entries(props.sentences).map(attr => (
            <option value={attr[1]._id}> {attr[1].name} </option>
            ))}
        </Select>
      </FormControl>
  );
}
