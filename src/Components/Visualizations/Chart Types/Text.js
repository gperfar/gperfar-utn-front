import React from 'react';
import {ResponsiveContainer} from 'recharts';

export function SDAText (props){

  const data= props.data.results;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h3>{data}</h3>
    </ResponsiveContainer>
  );
}
