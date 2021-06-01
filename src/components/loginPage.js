
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
export default class loginPage extends React.Component{
    
    whoAreYou(){
        return (<div className="full-height-width  ">
          <Dialog 
            open={true} 
            aria-labelledby="form-dialog-title"
            fullWidth = "true"
          >
            <DialogTitle 
              id="form-dialog-title"
              className="center " 
              style={{
                // backgroundColor:" #96d81f"
                }}
            >
              <h3  style={{
                backgroundColor:" purple",
                color:  "white",
                padding:"20px",
                margin:"20px"
                }}>Welcome</h3>
            </DialogTitle>
                  <h4 
                    style = {{marginTop:"10px",color: 'seagreen',display:'flex',flexDirection:'initial',alignItems:'flex-start'}}
                   >Who are you?
                  </h4>
                  <DialogContent 
                    className="DialogContent center "
                  > 
                    {/* <RadioBtn
                      parentHandler = {this.parentClick} 
                    /> */}
                    <label>
                       Parent 
                    </label>
                    <img 
                          src="/Images/parent.jpg" 
                              alt="I'm happy" 
                              style={{cursor:"pointer"}}
                              className="avatar zoom"
                              onClick = {(ev)=>{
                                this.props.history.push('/welcome');
                                  }}
                      />
                      <label>
                       Child 
                    </label>
                    <img 
                          src="/Images/child3.jpg" 
                           className="avatar zoom"
                              alt="I'm happy" 
                              style={{cursor:"pointer" , backgroundColor:"pink"}}
                              onClick = {(ev)=>{
                                this.props.history.push('/welcome');  
                                  }}
                      />
                  </DialogContent>
                  <DialogActions
                    className="ForgotPasswordPageBtn"
                    style={{backgroundColor:" #96d81f"}}
                  >
                  <Link to='/' className="center padding">
                    <Button
                      color="primary" 
                    >
                      Cancel
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
            </div>);
      }
    
    render(){
        return(
            <>
{this.whoAreYou()}
</>
        )
           }
}