import React  from 'react';
import {SDALineChart} from './Chart Types/LineChart';
import {SDABarChart} from './Chart Types/BarChart';
import {SDAAreaChart} from './Chart Types/AreaChart';
import { render } from 'react-dom';

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
    return(
        <p>You shouldn't be seeing this... maybe there's an error!</p>
    )
  }