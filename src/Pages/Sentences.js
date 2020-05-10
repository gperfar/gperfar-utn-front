import React, { useState, useEffect }  from 'react';
import '../App.css';
import {CoolButton} from '../Components/CoolButton';
import {ModelCard} from '../Components/ModelCard';
import {NavBar} from '../Components/NavBar';
import {GlobalStyle, MainContainer, SideContainer, SideBar, Content, ContainerHorizontal} from '../GlobalStyles';
import {NewSentenceInput} from '../Components/NewSentenceInput';
import {  Link } from "react-router-dom";

export function Sentences (props){

    const url = "https://gperfar-utn.herokuapp.com/sentences";

    async function getResults() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    const [results, setResults] = useState([]);
      console.log(results);
      useEffect(() => {
        getResults().then(data => setResults(data.result.sentences));
      }, []);

      
      const handleSentenceEdit= (event)=>{
        console.log("Editing sentence " + event.target.getAttribute("data-index"));
      }
      
      const handleSentenceDelete= function(event){
        if (confirm('Are you sure you want to save this thing into the database?')) {
          // Save it!
          console.log("Deleting sentence " + event.target.getAttribute("data-index"));
        } else {
          // Do nothing!
          console.log('You saved sentence ' + event.target.getAttribute("data-index") + '\'s ass');
        }
      }

    return (
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
                      <CoolButton data-index={result._id} onClick={handleSentenceEdit}>
                        <span data-index={result._id}>
                          Edit
                        </span>
                      </CoolButton>
                      <CoolButton data-index={result._id} onClick={handleSentenceDelete}>
                        <span data-index={result._id}>
                          Delete
                        </span>
                      </CoolButton>
                    </ContainerHorizontal>
                    <ModelCard object={result}/>
                  </div>
                  ))}
              </Content>
              <SideBar />
          </SideContainer>
        </MainContainer>
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