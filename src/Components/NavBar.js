import React, { Component, useState, useEffect }  from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content:left;
color:red;
`;
export function NavBar () {
    return(
    <Container>
        <Link to="/panel"><h4>Panel</h4></Link>
        <Link to="/connections"><h4>Connections</h4></Link>
        <Link to="/sentences"><h4>Sentences</h4></Link>
        <Link to="/runquery/2"><h4>Sample Query Results</h4></Link>
        <Link to="/docs"><h4>Docs</h4></Link>
        <Link to="/"><h4>Log out</h4></Link>
    </Container>
    )}