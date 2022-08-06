import {Navigate , Outlet} from 'react-router';
import {DashboardLayout} from '../dashboard/dashboard-layout'
import Login from '../login/login'


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
        console.log(res.data);

        if(res.status === 200) {
            user.loggedIn = true;
            return user.loggedIn
        }

    }).catch((err) => {
        alert(err.response.data)

        user.loggedIn = false;
        return user.loggedIn
        
    })

    if(localStorage.getItem('token')){
        return true;
    }


    
    return user && user.loggedIn
};

const RequireAuth = (props) => {
    const isAuth = useAuth();
    console.log(props)
    return !isAuth ? <Login/> : props.p;
    // return !isAuth ? <Home/> : <Navigate to="/dashboard"  />;;
}

export default RequireAuth;