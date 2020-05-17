import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import usePersistentState from '../usePersistentState'




const Container = styled.div`
display: flex;
flex-direction: row;
justify-content:left;
`;
export function NavBar () {

    const [login,setLogin] = usePersistentState('login')    
    
    const handleLogOut = (event) => {
        setLogin(0);
    }

    return(
    <Container>
        <Link to="/panel"><h4>Panel</h4></Link>
        <Link to="/connections"><h4>Connections</h4></Link>
        <Link to="/sentences"><h4>Sentences</h4></Link>
        <Link to="/visualizations"><h4>Visualizations</h4></Link>
        <Link to="/dashboards"><h4>Dashboards</h4></Link>
        <Link to="/runquery/2"><h4>Sample Query Results</h4></Link>
        <Link to="/docs"><h4>Docs</h4></Link>
        <div onClick={handleLogOut}><Link to="/"><h4>Log out</h4></Link></div>
    </Container>
    )}