import logo from '../logo.svg';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// handleSubmit = e => {
//   e.preventDefault();

//   const { userName, password } = this.state;

//   const user = {
//     userName,
//     password
//   };
// }

// function Login() {
//   return (
//     <div className="wrapper">
//       <form onSubmit={this.handleSubmit} action="" className="form-signin">
//         <h2 className="form-signin-heading">Please login</h2>
//         <input type="text" className="form-control" name="username" placeHolder="Email Address" required="" autoFocus=""/>
//         <input type="password" className="form-control" name="password" placeHolder="Password" required="" />
//         <label className="form-control" id="remember" >
//           <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
//         </label>
//         <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
//       </form>
//     </div>
//   );
// }


// export default Login;



import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
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

    const { userName , password } = this.state;

    const user = {
      userName,
      password
    };

    axios
      .post('http://localhost:3030/api/login', user)
      .then(() => console.log('user sent!'))
      .catch(err => {
        console.error(err);
      });

      
  };

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}  className="form-signin">
          <h2 className="form-signin-heading">Please login</h2>
          <input type="text" className="form-control" name="username" placeholder="Email Address" onChange={this.handleInputChange} required="" autoFocus=""/>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} required="" />
          <label className="form-control" id="remember" >
            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
          </label>
          <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
