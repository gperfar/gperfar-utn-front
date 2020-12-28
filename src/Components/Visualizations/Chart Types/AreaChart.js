import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label, ResponsiveContainer
} from 'recharts';

// const data = [
//   {name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
//   {name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
//   {name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
//   {name: 'Page D', uv: 2780, pv: 3908, amt: 2000,},
//   {name: 'Page E', uv: 1890, pv: 4800, amt: 2181,},
//   {name: 'Page F', uv: 2390, pv: 3800, amt: 2500,},
//   {name: 'Page G', uv: 3490, pv: 4300, amt: 2100,},
// ];

export function SDAAreaChart (props){

  const data= props.data.results;
  var xaxis_column = props.data.column_data[0];
  var yaxis_columns = props.data.column_data.slice(1,);
  const xaxis_label = props.data.xaxis_label;
  const yaxis_label = props.data.yaxis_label;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        // width={600}
        // height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 20,
        }}
        >
        <CartesianGrid strokeDasharray="3 10" />
        <defs>
          {yaxis_columns.map(i => (
            <linearGradient id={"color"+ i.name} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={i.color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={i.color} stopOpacity={0.1}/>
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey={xaxis_column.name}>
          <Label value={xaxis_label} offset={5} position="bottom" />
        </XAxis>
        <YAxis>
          <Label value={yaxis_label} angle={-90} position="left" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" align="right"/>
        {yaxis_columns.map(i => (
          <Area name={i.legend} type="monotone" dataKey={i.name} stroke={i.color} fillOpacity={1} fill={"url(#color" + i.name + ")"} />
          ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
