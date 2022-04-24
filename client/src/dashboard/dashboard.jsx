

import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import axios from 'axios';
import userIsLogin from '../auth/userIsLogin.js';









class Dashboard extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
          
          
        };
      }

     

      render() {


        axios({
            method:"get",
            url:"http://localhost:3030/auth",
            // data:localStorage.getItem('token'),
            headers:{
                'token' : localStorage.getItem('token'),

            }
            
            
            
      
        }).then((res)=>{

        })
        .catch(err => {

        })

        

        
        return (


            <div>
                <p>Dashboard</p>
            </div>
          
        );
      }

}

export default Dashboard;