import React, { useState, useEffect }  from 'react';
import '../App.css';
import {CoolButton, CoolButton2} from '../Components/CoolButton';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import {NewSentenceInput} from '../Components/NewSentenceInput';
import {EditSentenceInput} from '../Components/EditSentenceInput';
import { Redirect, Link, useParams } from "react-router-dom";
import usePersistentState from '../usePersistentState'
import { useAuth0 } from "@auth0/auth0-react";


export function Sentences (props){

  
  async function getResults() {
      const url = "https://gperfar-utn.herokuapp.com/sentences";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    async function DeleteSentence(sentence_id){
      const url = 'https://gperfar-utn.herokuapp.com/sentence/delete';
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              'sentence_id': sentence_id})
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data.results);
      return data;
  }

    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.sentences));
      }, []);

      const [redirect, setRedirect] = React.useState('');      
      const [selectedSentence, setSelectedSentence] = React.useState();      
      
      const handleSentenceEdit= (event)=>{
        console.log("Editing sentence " + event.target.getAttribute("data-index"));
        setSelectedSentence(event.target.getAttribute("data-index"));
        setRedirect('edit');
        
      }
      
      const handleSentenceDelete= function(event){
        if (confirm('Are you sure you want to delete this sentence?')) {
          // Delete it!
          console.log("Deleting sentence " + event.target.getAttribute("data-index"));
          DeleteSentence(event.target.getAttribute("data-index")).then(data=> console.log(data));
          return <Redirect to={'/panel/'} />
        } else {
          // Do nothing!
          console.log('You saved sentence ' + event.target.getAttribute("data-index") + '\'s ass');
        }
      }

      const handleCreateVisualization= (event)=>{
        console.log("Editing sentence " + event.target.getAttribute("data-index"));
        setSelectedSentence(event.target.getAttribute("data-index"));
        setRedirect('edit');
        
      }

      const {isAuthenticated} = useAuth0();

      if (!isAuthenticated) {
        return <Redirect to={'/'} />
      }
      if (redirect === 'edit') {
        return <Redirect to={'/sentences/edit/'+ selectedSentence.toString()} />
      }
    return (
      isAuthenticated && (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Sentences</h1>
                <h2><Link to='/sentences/new'> Create new Sentence... </Link></h2>
                 {results.map(result => (
                  <div>
                    <ContainerHorizontal classname="align-v-center">
                      <h2>{result.name}</h2>
                      <CoolButton2 data-index={result._id} onClick={handleSentenceEdit}>
                        <span data-index={result._id}>
                          Edit
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleSentenceDelete}>
                        <span data-index={result._id}>
                          Delete
                        </span>
                      </CoolButton2>
                      <CoolButton2 data-index={result._id} onClick={handleCreateVisualization}>
                        <span data-index={result._id}>
                          Create Visual
                        </span>
                      </CoolButton2>
                    </ContainerHorizontal>
                    <ModelCard object={result}/>
                  </div>
                  ))}
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
      )
      );
    }
  
  export function NewSentence (props){
    return (
        <MainContainer>
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Add new Sentence</h1>
                <NewSentenceInput />
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
      );
    }


    export function EditSentence (props){
      let { id } = useParams();
      return (
          <MainContainer>
            <NavBar />
            <SideContainer>
              <GlobalStyle />
                <SideBar />
                <Content>
                  <h1>Edit Sentence {id}</h1>
                  <EditSentenceInput sentenceID={id}/>
                </Content>
                <SideBar />
            </SideContainer>
          </MainContainer>
        );
      }