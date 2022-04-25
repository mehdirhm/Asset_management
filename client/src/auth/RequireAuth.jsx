import {Navigate , Outlet} from 'react-router';
import Dashboard from '../dashboard/dashboard'
const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn
};

const RequireAuth = () => {
    const isAuth = useAuth();
    return !isAuth ? <Outlet/> : <Dashboard/>;
}

export default RequireAuth;