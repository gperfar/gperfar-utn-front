import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Redirect } from "react-router-dom";

export function SDAText (props){

  // const data= props.data.results;
  const title = props.data.name;
  const subtitle = props.data.comment;
  var body = props.data.column_data.slice(1,)[0].legend;

  const visualizationID = props.visualizationID;
  const [redirect, setRedirect] = React.useState('');      
  const [selectedVisualization, setSelectedVisualization] = React.useState();
  const handleNameClick = (event) => {
    console.log("Editing visualization " + visualizationID.toString());
    setSelectedVisualization(visualizationID);
    setRedirect('edit');
  }
  if (redirect === 'edit' && selectedVisualization > 0) {
    return <Redirect to={'/visualizations/edit/'+ selectedVisualization.toString()} />
  }

  return (
    <ResponsiveContainer width="100%" height={400} style={{}} >
      <div style={{textAlign: 'left', margin:15, paddingRight:15, height:'100%', overflowY:'scroll'}}>
        <h2 style={{cursor:'pointer', textAlign:'center'}} onClick={handleNameClick}>{title}</h2>
        {subtitle && <h3>{subtitle}</h3>}
        <p>{body}</p>
      </div>
    </ResponsiveContainer>
  )
}
