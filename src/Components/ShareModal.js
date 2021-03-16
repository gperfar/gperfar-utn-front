import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal, ContainerVertical} from '../GlobalStyles';
import { CoolTextField } from '../Components/CoolTextField';
import { CoolButton, CoolButton2 } from './CoolButton';
import { InsideMapSelect } from './InsideMapSelect';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '60%',
      border: '0px solid #000',
      outline: 'none',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export function ShareModal(props) {
    
  const classes = useStyles();
  const {open: [open, setOpen]} = {modalOpen: React.useState(0),...(props.state || {})};
  const {object: [object, setObject]} = {object: React.useState({}),...(props.state || {})};

  const [accessLines, setAccessLines] = React.useState([{"user_id": '', "model": props.model, "model_id": object._id||'', "level": 'admin'}]);
  const [render, setRender] = React.useState(0);





  async function saveAccess(user_id, model, model_id, level){
    const url = 'https://gperfar-utn.herokuapp.com/access/create';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'user_id':user_id,
            'model':model,
            'model_id': model_id,
            'level': level})
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data.results);
    return data;
}


  const handleClose = () => {
    setOpen(false);
  }

  const handleAddLine = () => {
    var temp_accessLines = accessLines;
    temp_accessLines.push({"user_id": '', "model": props.model, "model_id": 0||'', "level": 'admin'}) /* model_id is added later*/
    setAccessLines(temp_accessLines);
    setRender(render + 1);
  }

  const handleAccessLineUserChange = (event, index) => {
    var temp_accessLines = accessLines;
    temp_accessLines[index].user_id = event.target.value;
    setAccessLines(temp_accessLines);
    setRender(render + 1);
  }

  const handleRemoveAccessLine = (event, index) => {
    var temp_accessLines = accessLines;
    temp_accessLines.splice(index,1);
    setAccessLines(temp_accessLines);
    setRender(render + 1);
  }

  const handleShare = () => {
    accessLines.map((line, index) => {
      console.log(line);
      saveAccess(line.user_id, line.model, object._id, line.level).then( data=>
        console.log(data)
      );
    }
    )
  }


  const shareModal = (
    <div style={{top:`50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
      <h2 id="simple-modal-title">Share {props.model} {typeof(object)!=='undefined' && object._id }</h2>
      {accessLines.map((line, index) => (
        <ContainerHorizontal style={{display:'flex', alignItems: 'baseline'}}>
          <CoolTextField value={line.user_id||''} type="text" label={'User'} onChange={(event) => handleAccessLineUserChange(event, index)}/>
          <InsideMapSelect title='Access level' list={['admin', 'editor', 'viewer']} colIndex={index} rowProperty='level' state={{ columnArray: [accessLines, setAccessLines], render: [render, setRender]}}/>
          <IconButton edge="end" aria-label="add" onClick={(event) => handleRemoveAccessLine(event, index)}> <DeleteIcon /> </IconButton>
        </ContainerHorizontal>
      ))}
      <div>
        <CoolButton2 onClick={handleAddLine}>+</CoolButton2>
      </div>
      <div style={{left: `80%`, transform: `translate(90%, 0%)`}}>
        <CoolButton onClick={handleShare}>Share</CoolButton>
      </div>
    </div>
  );

    return (
      <Modal open={open} onClose={handleClose}>{shareModal}</Modal>
    );
  }