import React, {useState} from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

export function SDAPieChart(props) {
  
  const [activeIndex, setActiveIndex] = useState();
  const [activeValue, setActiveValue] = useState();
  
  const queryData= props.data.results;
  var xaxis_column = props.data.column_data[0];
  var yaxis_columns = props.data.column_data.slice(1,);
  // const xaxis_label = props.data.xaxis_label;
  // const yaxis_label = props.data.yaxis_label;
  
  const onPieEnter = (data, index) => {
    setActiveIndex(index);
    setActiveValue(queryData[index][xaxis_column.name]);
    // console.log(queryData[index][xaxis_column.name]);
  }
  
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${activeValue}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'Teal'];
  
  return (
    <ResponsiveContainer width="100%" height={400} style={{alignItems: 'center', justifyContent: 'center'}}>
      <PieChart 
      // width={400} height={400}
      >
        {yaxis_columns.map((i,index) => (
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            activeValue={activeValue}
            data={queryData}
            // cx={200}   // We hide these two because they mess with centering 
            // cy={200}
            innerRadius={60 * (index+1)}
            outerRadius={80 * (index + 1)}
            fill={i.color}
            dataKey={i.name}
            onMouseEnter={onPieEnter}
            // label
          >
            {
              queryData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        
        ))}
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}


// export function SDARadarChart (props){

//   const data= props.data.results;
//   var xaxis_column = props.data.column_data[0];
//   var yaxis_columns = props.data.column_data.slice(1,);
//   const xaxis_label = props.data.xaxis_label;
//   const yaxis_label = props.data.yaxis_label;
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <RadarChart 
//         // outerRadius={90} 
//         // width={730} 
//         // height={250} 
//         data={data}
//         >
//           <PolarGrid />
//           <PolarAngleAxis dataKey={xaxis_column.name} />
//           <PolarRadiusAxis 
//             angle={45} 
//             // domain={[0, max_ycolumn_value]} 
//           />
//           {yaxis_columns.map(i => (
//           <Radar name={i.legend} dataKey={i.name} stroke={i.color} fill={i.color} fillOpacity={0.6} />
//           ))}
//           <Legend />
//           <Tooltip />
//       </RadarChart>

//     </ResponsiveContainer>
//   );
// }
