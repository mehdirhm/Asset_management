import logo from '../logo.svg';
import './reg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import axios from 'axios';



class Reg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',  
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

    const { fullname ,username , password } = this.state;

    const userReg = {
      fullname,
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
      url:"http://localhost:3030/reguser",
      data:userReg,
      
      
      

  })
  
      .then((res) => console.log(res.data))
      .catch(err => {
        console.error(err);
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
          {/* <label className="form-control" id="remember" >
            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
          </label> */}
          <input type="submit" className="btn btn-lg btn-danger btn-block" value="Register" />
        </form>
      </div>
    );
  }
}

export default Reg;
