import React, { useState, useEffect }  from 'react';
import '../App.css';
import {CoolButton2} from '../Components/CoolButton';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import {EditSentenceInput} from '../Components/EditSentenceInput';
import { Redirect, Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleSelect } from '../Components/SimpleSelect';
import { CoolTextField } from '../Components/CoolTextField';
import { ShareModal } from '../Components/ShareModal';


export function Sentences (props){


    const { user } = useAuth0();

    async function getResults(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'user_id': user.sub})
        };
        const response = await fetch('https://gperfar-utn.herokuapp.com/sentences', requestOptions);
        const data = await response.json();
        console.log(data.results);
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
    const [redirect, setRedirect] = React.useState('');      
    const [selectedSentence, setSelectedSentence] = React.useState();
    
    useEffect(() => {
      getResults().then(data => setResults(data.result.sentences));
    }, []);
    
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
      setRedirect('createVisualization');
      
    }
    
    const [selectedSentenceObject, setSelectedSentenceObject] = React.useState({});      
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleShare= (event)=>{
      console.log("Sharing sentence " + event.target.getAttribute("data-index"));
      setSelectedSentence(event.target.getAttribute("data-index"));
      setSelectedSentenceObject(results[event.target.getAttribute("data-index") - 1])
      setModalOpen(true);
      
    }

    if (redirect === 'edit' && selectedSentence > 0) {
      return <Redirect to={'/sentences/edit/'+ selectedSentence.toString()} />
    }
    if (redirect === 'createVisualization' && selectedSentence > 0) {
      return <Redirect to={'/visualizations/new/'+ selectedSentence.toString()} />
    }
    return (
      true && (//isAuthenticated && (    TAL VEZ ITEM DEBERIA SER PARTE DE STATE PARA QUE SE ACTUALICE. PROBAR.
        <MainContainer>
          <ShareModal model='sentence' state={{ open: [modalOpen, setModalOpen], object: [selectedSentenceObject, setSelectedSentenceObject]}} /> 
          <NavBar />
          <SideContainer>
            <GlobalStyle />
              <SideBar />
              <Content>
                <h1>Sentences {selectedSentence}</h1>
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
                      <CoolButton2 data-index={result._id} onClick={handleShare}>
                        <span data-index={result._id}>
                          Share
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
                <EditSentenceInput />
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