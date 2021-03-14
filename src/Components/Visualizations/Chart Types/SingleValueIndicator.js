import React from 'react';
import {ResponsiveContainer} from 'recharts';

export function SDASingleValueIndicator (props){

  const data= props.data.results;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h1>{data}</h1>
    </ResponsiveContainer>
  );
}
