import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./routes/home";
import Login from "./login/login"


export default function Main() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      </BrowserRouter>
    );
  }