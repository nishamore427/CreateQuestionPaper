
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import login from './components/login';
import loginPage from './components/loginPage';
import welcome from './components/welcome';
import React from 'react';
export default class App extends React.Component{
  constructor(props){
    super();
    
  }
  render(){
    return (
      <div>
      <Router>
     <Route path="/" exact component={login} />
     <Route path="/loginPage" exact component = {loginPage} />
     <Route path="/welcome" exact component={welcome} />
     
      </Router>
      </div>
     );
  }
  
}

