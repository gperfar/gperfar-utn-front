import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label, ResponsiveContainer
} from 'recharts';
import { Redirect } from "react-router-dom";

// const data = [
//   {name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
//   {name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
//   {name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
//   {name: 'Page D', uv: 2780, pv: 3908, amt: 2000,},
//   {name: 'Page E', uv: 1890, pv: 4800, amt: 2181,},
//   {name: 'Page F', uv: 2390, pv: 3800, amt: 2500,},
//   {name: 'Page G', uv: 3490, pv: 4300, amt: 2100,},
// ];

export function SDALineChart (props){

  const data= props.data.results;
  var xaxis_column = props.data.column_data[0];
  var yaxis_columns = props.data.column_data.slice(1,);
  const xaxis_label = props.data.xaxis_label;
  const yaxis_label = props.data.yaxis_label;

  const name = props.data.name;
  const comment = props.data.comment;

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
    <div style={{height:'100%', textAlign:'center'}}>
      {name && <h2 style={{cursor:'pointer'}} onClick={handleNameClick}>{name}</h2>}
      {comment && <h3>{comment}</h3>}
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        // width={600}
        // height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 20,
        }}
        >
        <CartesianGrid strokeDasharray="3 10" />
        <XAxis dataKey={xaxis_column.name}>
          <Label value={xaxis_label} offset={5} position="bottom" />
        </XAxis>
        <YAxis>
          <Label value={yaxis_label} angle={-90} position="left" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" align="right"/>
        {yaxis_columns.map(i => (
          <Line name={i.legend} type="monotone" dataKey={i.name} stroke={i.color} activeDot={{ r: 5 }}/>
          ))}
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
