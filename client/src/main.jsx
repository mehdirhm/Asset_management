import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./routes/home";
import Login from "./login/login";
import Reg from "./register/reg";


export default function Main() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reguser" element={<Reg/>} />
          
        </Routes>
      </BrowserRouter>
    );
  }