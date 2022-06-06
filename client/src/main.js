import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Switch
} from "react-router-dom";
import Home from "./routes/home";
import Login from "./login/login";
import Reg from "./register/reg";

import Dashboard from "./dashboard/dashboard"
import RequireAuth from "./auth/RequireAuth"
import {DashboardLayout} from './dashboard/dashboard-layout'
import Assets from "./routes/assets";
import AddAssets from "./routes/add-assets";
import Hardware from "./routes/hardware";
import Software from "./routes/software";





export default function Main() {
    return (
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/reguser" element={<Reg/>} />
          <Route exact path="/assets" element={<Assets/>} />
          <Route exact path="/add-asset" element={<AddAssets/>} />
          <Route exact path="/hardware" element={<Hardware/>} />
          <Route exact path="/software" element={<Software/>} />
          <Route exact path="/dashboard" element={
          <RequireAuth >
          <DashboardLayout />
        </RequireAuth>} />


          
        </Routes>
      </BrowserRouter>

      // <Router>
      //   <div>
      //     <Route path="/" component={<Home />} />
      //     <Route path="/login" component={<Login />} />
      //     <Route path="/reguser" component={<Reg />} />
      //     <Route path="/dashboard" component={<RenderDash/>} />


      //   </div>
      // </Router>


    );
  }