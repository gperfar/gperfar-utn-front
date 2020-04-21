import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Docs} from './Pages/Docs'
import {Landing} from './Pages/Landing'
import styled, { createGlobalStyle } from "styled-components";

export default function App()  {
    return (
      <Router>
        <Switch>
          <Route path="/docs"><Docs /></Route>
          <Route path="/"><Landing /></Route>
        </Switch>
      </Router>
    );
  }
