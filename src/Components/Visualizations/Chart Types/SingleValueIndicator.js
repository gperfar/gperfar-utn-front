import React from 'react';
import {ResponsiveContainer} from 'recharts';

export function SDASingleValueIndicator (props){

  const data= props.data.results[0];
  var column_name = props.data.column_data.slice(1,)[0].name
  const value= data[column_name]
  const title=props.data.name
  const comment = props.data.comment
  return (
    <ResponsiveContainer width="100%" height={400}>
      <div style={{height:'100%', textAlign:'center'}}>
        <h1 style={{padding: 25, margin:0}}>{title}</h1>
        <h1 style={{
          textAlign:'center',
          fontSize:'200px', 
          margin:0,
          marginTop:-50,
          marginBottom:-30,
          // transform: 'translate(0%, 10%)'
          }}>{value}</h1>
        <h2 style={{margin: 0}}>{comment}</h2>
      </div>
    </ResponsiveContainer>
  );
}
