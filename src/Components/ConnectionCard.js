import React, { Component, useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function ConnectionCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

//   const url = "https://gperfar-utn.herokuapp.com/connections?id="+props.connection._id;
  
//   async function getConnectionDetails() {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }
//   const [results, setResults] = useState([]);
//     console.log(results);
//     useEffect(() => {
//       getConnectionDetails().then(data => setResults(data.result.connection_details));
//       results.pop("name")
//     }, []);

  return (
    <List
      component="nav"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="See conneciton details" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" >   
            {console.log(Object.keys(props.connection))}
            {Object.entries(props.connection).map(attr => ( //Don't show ID, name or User ID. Sort them better! Backend
                <ListItem className={classes.nested}>
                    <ListItemText primary= {attr[0].charAt(0).toUpperCase() + attr[0].substring(1)} secondary={attr[1]} />
                </ListItem>
            ))}
        </List>
      </Collapse>
    </List>
  );
}