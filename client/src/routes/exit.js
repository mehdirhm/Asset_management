// import {DashboardLayout} from '../dashboard/dashboard-layout'

// import { DashboardChart } from '../dashboard/dashboard-chart';
import Login from '../login/login';


export default function Exit() {
    localStorage.removeItem('token');

    return (
      <>    
        <Login />
       
      </>
      

      
    );
  }