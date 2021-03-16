import React from 'react';
import { ResponsiveContainer } from 'recharts';

export function SDAText (props){

  // const data= props.data.results;
  const title = props.data.name;
  const subtitle = props.data.comment;
  var body = props.data.column_data.slice(1,)[0].legend;

  return (
    <ResponsiveContainer width="100%" height={400} style={{}} >
      <div style={{textAlign: 'left', margin:15, paddingRight:15, height:'100%', overflowY:'scroll'}}>
        <h2>{title}</h2>
        {subtitle && <h3>{subtitle}</h3>}
        <p>{body}</p>
      </div>
    </ResponsiveContainer>
  )
}
