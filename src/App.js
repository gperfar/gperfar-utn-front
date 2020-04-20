import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {About} from './Pages/About'
import {Landing} from './Pages/Landing'

export default function App()  {
    return (
      <Router>
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/"><Landing /></Route>
        </Switch>
      </Router>
    );
  }
