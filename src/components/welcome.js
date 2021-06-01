import React from "react";
import Footer from "./Footer";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './welcome.css';
import CreateQuestionPaper2 from "./CreateQuestionPaper2";


export default class welcome extends React.Component{

    render(){
        return(
<body>
    <div >
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <img src="/Images/child3.jpg" style={{height:"60px",borderRadius:"50%", margin:'5px',marginRight:'50px'}} />
    <ul class="navbar-nav">
        <li class="nav-item active">
          
        </li>
        <li class="nav-item active">
        <a class="nav-link" href="/" style={{fontSize:'20px',padding:'10px'}}>Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="javascript:void(0);" style={{fontSize:'20px',padding:'10px'}}>About</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="javascript:void(0);" style={{fontSize:'20px',padding:'10px'}}>Contact</a>
        </li>
    </ul>
    <span style={{color:'#1976D2',backgroundColor:'white',borderRadius:'50%',marginLeft:'800px'}}>
        {/* <AccountBoxIcon style={{height:'60px',width:"60px",borderRadius:'50%'}}/> */}
        <AccountCircleIcon style={{height:'60px',width:"60px"}} />
    </span>

    
    </nav>
    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

        
        <div>
        <img src='/Images/child.jpg' />
        </div>
        <div style={{fontFamily: 'Bad Script', fontSize:'20px',color:"red" }}>
            School Chale Hm.............
        </div>
        <div>
        <img src='/Images/cracker.jpg' />
        </div>
    </div>
    <div >
    <div>
        {/* <CreateQuestionPaper /> */}
        <CreateQuestionPaper2 />
    </div>
    <Footer>
    <BottomNavigation
        style={{backgroundColor:"black"}}
        showLabels
    >
      <BottomNavigationAction label="Recents" style={{color:"white"}}  icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" style={{color:"white"}} icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" style={{color:"white"}} icon={<LocationOnIcon />} />
    </BottomNavigation>
    <p>nishamore427@gmail.com</p>
    </Footer>
</div>
</body>)
    }
}

