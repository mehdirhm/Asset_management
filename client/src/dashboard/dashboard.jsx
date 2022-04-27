// import logo from './logo.svg';
// import './App.css';

// function Dashboard() {
//   return (
//       <div>
//           <p>Dashboard</p>
//       </div>
   
//   );
// }

// export default Dashboard;
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import theme from '../theme/index'


const DashboardNavbarRoot = styled(AppBar)(({theme}) => ({

  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]

}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen , ...other } = props;

  return (
    <>
        <DashboardNavbarRoot
        theme={theme}
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
         sssss

        </DashboardNavbarRoot>
        {/* <p>dashboard</p> */}
    
    </>
  )

}

// DashboardNavbar.propTypes = {
//   onSidebarOpen: PropTypes.func
// };

export default DashboardNavbar

