import React  from 'react';
import {SDALineChart} from './Chart Types/LineChart';
import {SDABarChart} from './Chart Types/BarChart';
import {SDAAreaChart} from './Chart Types/AreaChart';
import {SDARadarChart} from './Chart Types/RadarChart';
import {SDAPieChart} from './Chart Types/PieChart';
import {SDAScatterChart} from './Chart Types/ScatterChart';
import {SDAText} from './Chart Types/Text';
import {SDASingleValueIndicator} from './Chart Types/SingleValueIndicator';

import { makeStyles } from '@material-ui/core/styles';
import SDATable from '../Table';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15px',
    marginBottom: '15px',
    paddingBottom: '15px',
    backgroundColor: theme.palette.background.paper
  }
}));

export function VisualizationController (props){
  const classes = useStyles();

    if (props.data.type ==='Line chart') {
      return ( <div className={classes.root}> <SDALineChart data={props.data}/> </div> );
    }
    if (props.data.type ==='Bar chart') {
      return ( <div className={classes.root}> <SDABarChart data={props.data}/> </div> );
      }
    if (props.data.type ==='Area chart') {
      return ( <div className={classes.root}> <SDAAreaChart data={props.data}/> </div> );
    }
    if (props.data.type ==='Radar chart') {
      return ( <div className={classes.root}> <SDARadarChart data={props.data}/> </div> );
    }
    if (props.data.type ==='Pie chart') {
      return ( <div className={classes.root}> <SDAPieChart data={props.data}/> </div> );
    }
    if (props.data.type ==='Scatter chart') {
      return ( <div className={classes.root}> <SDAScatterChart data={props.data}/> </div> );
    }
    if (props.data.type ==='Text') {
      return ( <div className={classes.root}> <SDAText data={props.data}/> </div>  );
    }
    if (props.data.type ==='Table') {
      return ( <div className={classes.root}> <SDATable info={props.data} visualrender='true'/> </div> );
    }
    if (props.data.type ==='Single value indicator') {
      return ( <div className={classes.root}> <SDASingleValueIndicator data={props.data}/> </div> );
    }
    return( <p>{props.data.type} You shouldn't be seeing this... maybe there's an error!</p> )
  }