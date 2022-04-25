



                   
    

        
        


import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import auth from '../auth/auth.js';


import { useState } from 'react';


// let isLogin = reqForAuth();


// class Dashboard extends Component {


//     constructor(props) {
//         super(props);
    
//         this.state = {
          
          
//         };
//       }

     

//       render() {

//         return (
//             <div>
//                 {/* <RenderDash/> */}
                
//             </div>
//         )
            
// window.location.reload(false);
function DashboardRender(props) {
  return <h1>Welcome back!</h1>;
}

function AccessDenied(props) {
  return <h1>Please sign up.</h1>;
}

  const RenderDash = () => {

    // const [au, setAuth] = useState(0);


    console.log(auth.isAuthenticated())
    // window.location.reload(false);
    
  if (auth.isAuthenticated()) {

    
    return <DashboardRender  />;
  }
  return <AccessDenied />;
}
                   
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <RenderDash  />,
  document.getElementById('root')
);

        

        
        
   


export default RenderDash;