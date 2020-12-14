import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Docs} from './Pages/Docs'
import {Landing} from './Pages/Landing'
import {Connections, NewConnection, EditConnection} from './Pages/Connections'
import {Sentences, NewSentence, EditSentence} from './Pages/Sentences'
import {Visualizations} from './Pages/Visualizations'
import {Dashboards} from './Pages/Dashboards'
import {RunQuery} from './Pages/RunQuery'
import {Panel} from './Pages/Panel'
import ScrollToTop from './Components/ScrollToTop';


export default function App()  {    

    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/docs"><Docs /></Route>
          <Route path="/connections/edit/:id"><EditConnection /></Route>
          <Route path="/connections/new"><NewConnection /></Route>
          <Route path="/connections"><Connections /></Route>
          <Route path="/sentences/edit/:id"><EditSentence /></Route>
          <Route path="/sentences/new"><NewSentence /></Route>
          <Route path="/sentences"><Sentences /></Route>
          <Route path="/visualizations"><Visualizations /></Route>
          <Route path="/dashboards"><Dashboards /></Route>
          <Route path="/runquery/:id"><RunQuery /></Route>
          <Route path="/runquery"><RunQuery /></Route>
          <Route path="/panel"><Panel /></Route>
          <Route path="/"><Landing /></Route>
        </Switch>
      </Router>
    );
  }
