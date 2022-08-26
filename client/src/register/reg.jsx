import logo from '../logo.svg';
import './reg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as React from 'react';

import React, { Component } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import userIsLogin from '../auth/userIsLogin';
import { padding } from '@mui/system';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class Reg extends Component {


  
  constructor(props) {
    super(props);
   
    this.state = {
      fullname: '',  
      username: '',
      password: '',
      isAdmin : 'off',
      // checked : true
    
    };
  }

  
  //  handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  

  handleSubmit = e => {
    e.preventDefault();

    const { fullname ,username , password , isAdmin  } = this.state;

    const userReg = {
      fullname,
      username, 
      password,
      isAdmin : isAdmin === 'on' ? true : false,
      
    };
    let axiosConfig = {
      headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "*",
      },
      };

      
    axios({
      method:"post",
      url:"http://localhost:3030/reguser",
      data:userReg,
      headers : {
        'x-auth-token' : localStorage.getItem('token')
      }
      
      
      

  })
  
      .then((res) => {

        if(res.status === 200){
          // localStorage.setItem('token',res.headers['x-auth-token'])
          window.location.href = "http://localhost:3000/dashboard";

        }
        alert(res.data);
        

      })
      .catch(err => {
       alert(err.response.data);
      });

      
  };

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit} method="POST" action="http://localhost:3030/"  className="form-signin">
          <h2 className="form-signin-heading">Please Register</h2>
          <input type="text" className="form-control" name="fullname" placeholder="Full Name" onChange={this.handleInputChange} required="" autoFocus=""/>
          <input type="text" className="form-control" name="username" placeholder="User Name" onChange={this.handleInputChange} required="" autoFocus=""/>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} required="" />
          <label className="form-control" id="isAdmin" >
            <input type="checkbox"  id="isAdmin" name="isAdmin" onChange={this.handleInputChange} /> isAdmin
          </label>
          <input type="submit" className="btn btn-lg btn-danger btn-block" value="Register" />
          <a href="/">
          <input style={{ 
            marginLeft:10
          }}  type="button" className="btn btn-lg btn-danger btn-block" value="Home" />
          </a>
        </form>
      </div>
    );
  }
}

export default Reg;
