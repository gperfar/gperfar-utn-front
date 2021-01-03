import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend,Label, ResponsiveContainer
} from 'recharts';

// const data = [
//   {
//     "subject": "Math",
//     "A": 120,
//     "B": 110,
//     "fullMark": 150
//   },
//   {
//     "subject": "Chinese",
//     "A": 98,
//     "B": 130,
//     "fullMark": 150
//   },
//   {
//     "subject": "English",
//     "A": 86,
//     "B": 130,
//     "fullMark": 150
//   },
//   {
//     "subject": "Geography",
//     "A": 99,
//     "B": 100,
//     "fullMark": 150
//   },
//   {
//     "subject": "Physics",
//     "A": 85,
//     "B": 90,
//     "fullMark": 150
//   },
//   {
//     "subject": "History",
//     "A": 65,
//     "B": 85,
//     "fullMark": 150
//   }
// ]

export function SDARadarChart (props){

  const data= props.data.results;
  var xaxis_column = props.data.column_data[0];
  var yaxis_columns = props.data.column_data.slice(1,);
  const xaxis_label = props.data.xaxis_label;
  const yaxis_label = props.data.yaxis_label;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart 
        // outerRadius={90} 
        // width={730} 
        // height={250} 
        data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey={xaxis_column.name} />
          <PolarRadiusAxis 
            angle={45} 
            // domain={[0, max_ycolumn_value]} 
          />
          {yaxis_columns.map(i => (
          <Radar name={i.legend} dataKey={i.name} stroke={i.color} fill={i.color} fillOpacity={0.6} />
          ))}
          <Legend />
          <Tooltip />
      </RadarChart>

    </ResponsiveContainer>
  );
}
