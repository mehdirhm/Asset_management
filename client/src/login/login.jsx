import logo from '../logo.svg';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import axios from 'axios';
import userIsLogin from '../auth/userIsLogin.js';

import auth from '../auth/auth.js'
import { useHistory } from "react-router-dom";

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
        // a =  res.data.name
        // b = res.data.isAdmin
        // alert(res.data['name'])
        if(userIsLogin(res)) {
          localStorage.setItem('token',res.headers['x-auth-token'])
          localStorage.setItem('name',res.data['name'])
          localStorage.setItem('isAdmin',res.data['isAdmin'])
          window.location.href = "http://localhost:3000/";
          auth.login( () => {
           
            // console.log(window.location)
            // this.props.history.push("/dashboard" , { state: auth.isAuthenticated()})
          //  this.props.history.push("/dashboard", { state: auth.isAuthenticated()})
            
            
            //  window.location.reload(false);
            console.log(auth.isAuthenticated())
           
         

       })

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
          <input type="text" className="form-control" name="username" placeholder="User Name" onChange={this.handleInputChange} required="" autoFocus=""/>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} required="" />
          {/* <label className="form-control" id="remember" >
            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
          </label> */}
          <input type="submit" className="btn btn-lg btn-primary btn-block" value="Login" />
        </form>
      </div>
    );
  }
}
// module.exports = a ;
// module.exports = b;
export default Login;
