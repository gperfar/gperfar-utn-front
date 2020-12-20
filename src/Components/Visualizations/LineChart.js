import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label
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

export function SDALineChart (props){

  const data= props.results;
  useEffect(() => {
    // getConnectionTypes().then((data) =>{
    //     setConnTypes(data["connection types"]);
    //   } );
    console.log(data);
  }, []);

    return (
      <div>
        {/* <p>{data}</p> */}
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 20,
          }}
          >
          <CartesianGrid strokeDasharray="3 10" />
          <XAxis dataKey="city">
            <Label value="X Axis test" offset={5} position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Y Axis test" angle={-90} position="left" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" align="right"/>
          <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 5 }}/>
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 5}}/> */}
        </LineChart>
      </div>
    );
  }
