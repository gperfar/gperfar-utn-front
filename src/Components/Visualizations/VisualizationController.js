import React  from 'react';
import {SDALineChart} from './Chart Types/LineChart';
import {SDABarChart} from './Chart Types/BarChart';
import {SDAAreaChart} from './Chart Types/AreaChart';
import {SDARadarChart} from './Chart Types/RadarChart';
import {SDAPieChart} from './Chart Types/PieChart';
import {SDAScatterChart} from './Chart Types/ScatterChart';

export function VisualizationController (props){
    if (props.data.type ==='Line chart') {
      return (<SDALineChart data={props.data}/>);
    }
    if (props.data.type ==='Bar chart') {
        return (<SDABarChart data={props.data}/>);
      }
    if (props.data.type ==='Area chart') {
        return (<SDAAreaChart data={props.data}/>);
    }
    if (props.data.type ==='Radar chart') {
      return (<SDARadarChart data={props.data}/>);
    }
    if (props.data.type ==='Pie chart') {
      return (<SDAPieChart data={props.data}/>);
    }
    if (props.data.type ==='Scatter chart') {
      return (<SDAScatterChart data={props.data}/>);
    }
    return(
        <p>{props.data.type} You shouldn't be seeing this... maybe there's an error!</p>
    )
  }