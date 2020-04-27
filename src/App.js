import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Docs} from './Pages/Docs'
import {Landing} from './Pages/Landing'
import {Connections} from './Pages/Connections'
import {QueryResults} from './Pages/QueryResults'
import {Panel} from './Pages/Panel'
import styled, { createGlobalStyle } from "styled-components";
import ScrollToTop from './Components/ScrollToTop';
export default function App()  {
    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/docs"><Docs /></Route>
          <Route path="/connections"><Connections /></Route>
          <Route path="/queryresults"><QueryResults /></Route>
          <Route path="/panel"><Panel /></Route>
          <Route path="/"><Landing /></Route>
        </Switch>
      </Router>
    );
  }
