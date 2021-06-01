import React from "react";
import './login.css';

import loginPage from "./loginPage";
import { Link } from "react-router-dom";
export default class login extends React.Component{
   model={
       form:''
   }
   constructor(props){
       super(props)
       this.state = this.model;
      
   }
   eventCall = event =>{
       this.setState({
           [event.target.name] : event.target.value
       })
   }
   submit=(event)=>{
       event.preventDefault();
       const UserNameAndPassword = {
           username:this.state.uname ,
           password:this.state.psw
       }
       if(UserNameAndPassword.username === "nisha" && UserNameAndPassword.password === "n123@123"){
        alert("UserName: "+this.state.uname + " Password: " + this.state.psw);
        this.props.history.push('/loginPage');
        // this.model.form = <loginPage />;
        // this.setState(this.model);
       }else{
           alert("wrong username or password");
       }

       
   }
   
    render(){

        return(
            <div style= {{
                position:'relative' ,
                 display: 'flex',
                 justifyContent: 'center',
            alignItems: 'center',
            alignContent:'center',
            marginTop:'50px'
            }}>
            {this.state.form}
            <div className="loginform">
              <form onSubmit={this.submit.bind(this)} method="post">
      <div class="imgcontainer">
        <img src="/Images/login.jpg" alt="Avatar" className="avatar" />
      </div>
    
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input 
            type="text" 
            placeholder="Enter Username" 
            name="uname" 
            value={this.state.uname}
            onChange={this.eventCall}
            required 
            
        />
    
        <label for="psw"><b>Password</b></label>
        <input 
            type="password" 
            placeholder="Enter Password" 
            name="psw"
            value = {this.state.psw}
            onChange = {this.eventCall} 
            required 
        />
            
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label>
      </div>
    
      <div class="container" style={{backgroundColor:"#f1f1f1"}}>
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="javascript:void(0);">password?</a></span>
      </div>
    </form>
    
            </div>
     
            </div>
               )
        
    }
}