import logo from '../logo.svg';
import './login.css';

function Login() {
  return (
    <div className="wrapper">
      <form action="" className="form-signin">
        <h2 className="form-signin-heading">Please login</h2>
        <input type="text" className="form-control" name="username" placeHolder="Email Address" required="" autoFocus=""/>
        <input type="password" className="form-control" name="password" placeHolder="Password" required="" />
        <label className="checkBox">
          <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
        </label>
        <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
      </form>
    </div>
  );
}

export default Login;