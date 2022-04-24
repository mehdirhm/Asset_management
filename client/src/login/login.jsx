import logo from '../logo.svg';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import axios from 'axios';
import userIsLogin from '../auth/userIsLogin.js';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      
    };
  }



  


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username , password } = this.state;

    const user = {
      username,
      password
    };
    let axiosConfig = {
      headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "*",
      },
      };
    axios({
      method:"post",
      url:"http://localhost:3030/login",
      data:user,
      
      
      

  })
  
      .then((res) => {
        // var myHeaders = new Headers();
        // console.log(myHeaders.get('x-auth-token'));
        console.log(res.status);
        if(userIsLogin(res)) {
          localStorage.setItem('token',res.headers['x-auth-token'])
          window.location.href = "http://localhost:3000/dashboard";

        };
 
        
      })
      .catch(err => {
       alert(err.response.data)
       
      });

      
  };

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit} method="POST" action="http://localhost:3030/"  className="form-signin">
          <h2 className="form-signin-heading">Please login</h2>
          <input type="text" className="form-control" name="username" placeholder="Email Address" onChange={this.handleInputChange} required="" autoFocus=""/>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} required="" />
          <label className="form-control" id="remember" >
            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
          </label>
          <input type="submit" className="btn btn-lg btn-primary btn-block" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
