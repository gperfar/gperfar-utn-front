import styled, { createGlobalStyle } from "styled-components";




export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
    margin: 0;
    background: rgb(2,0,36);
    background: linear-gradient(132deg, rgba(2,0,36,1) 0%, rgba(29,41,113,1) 60%);
  }

h1, h2, h3 {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 {
  font-size: 48pt;  
}
h2,h3 {
  padding: 12px;
}
h4{
  padding-right: 1em;
  margin-bottom:10px;
  margin-left:10px;
  color: #FFDEB3;
}
ul{
  margin:0;
}

p{
    text-indent: 40px;
  }

.nomargin{
    margin:0;
    font-size:18px;
    color: #FFDEB3;
    text-indent: 0px;
}  

`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
background-color: rgb(75, 98, 160);
height:100vh;
@media (max-width: 600px) {
  flex-direction: column;
  height: auto;
}
`;

export const SideContainer = styled.div`
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content:center;
background-color: rgb(75, 98, 160);
height:100vh;
@media (max-width: 600px) {
  flex-direction: column;
  height: auto;
}
`;

export const SideBar = styled.div`
flex:1;
display: flex;
flex-direction: column;
justify-content:left;
padding: 1em;

`;

export const Content = styled.div`
flex:3;
justify-content:center;
padding: 1em;
background: whitesmoke;
overflow-y: auto;
`;