import React, { useEffect } from 'react';
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import { Redirect } from "react-router-dom";

// const data01 = [
//   { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
//   { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
//   { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
// ];
// const data02 = [
//   { x: 200, y: 260, z: 240 }, { x: 240, y: 290, z: 220 },
//   { x: 190, y: 290, z: 250 }, { x: 198, y: 250, z: 210 },
//   { x: 180, y: 280, z: 260 }, { x: 210, y: 220, z: 230 },
// ];

export function SDAScatterChart (props){

  const data= props.data.results;
  var xaxis_column = props.data.column_data[0];
  var yaxis_columns = props.data.column_data.slice(1,);
  const xaxis_label = props.data.xaxis_label;
  const yaxis_label = props.data.yaxis_label;
  const shape = props.data.scatter_shape;
  const name = props.data.name;
  const comment = props.data.comment;
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'Teal'];
  // const SHAPES = ['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye' ]
  useEffect(() => {
    console.log(yaxis_columns);
    console.log(yaxis_columns.length);
  }, []);

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
        <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <XAxis type="number" dataKey={xaxis_column.name} name={xaxis_label} /*unit="cm"*/ >
            <Label value={xaxis_label} offset={-10} position="bottom" />
          </XAxis>
          <YAxis type="number" dataKey={yaxis_columns[0].name} name={yaxis_columns[0].legend} /*unit="kg"*/>
            <Label value={yaxis_label} offset={-10} angle={-90} position="left" />
          </YAxis>
          {yaxis_columns.length > 1 ?
            <ZAxis type="number" dataKey={yaxis_columns[1].name} name={yaxis_columns[1].legend} range={[50, 500]} />
            :
            <p></p>
          }
            <Scatter
              data={data}
              fill={yaxis_columns[0].color}
              shape={shape}
            />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}