import {Navigate , Outlet} from 'react-router';
import {DashboardLayout} from '../dashboard/dashboard-layout'
import Home from '../routes/home'


import axios from 'axios';







const useAuth =  (props) => {

    const user = { loggedIn: false };
    // localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))

      axios({
        method:"get",
        url:"http://localhost:3030/auth",
        headers:{

            'x-auth-token' : localStorage.getItem('token')

        },
        
        
        
  
    }).then((res) => {
        console.log("sss")

        if(res.status === 200) {
            user.loggedIn = true;
            return user.loggedIn
        }

    }).catch((err) => {

        user.loggedIn = false;
        return user.loggedIn
        
    })

    if(localStorage.getItem('token')){
        return true;
    }


    
    return user && user.loggedIn
};

const RequireAuth = () => {
    const isAuth = useAuth();
    return !isAuth ? <Home/> : <DashboardLayout/>;
    // return !isAuth ? <Home/> : <Navigate to="/dashboard"  />;;
}

export default RequireAuth;