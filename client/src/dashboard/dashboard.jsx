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
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Users as UsersIcon } from '../icons/users';
import { Bell as BellIcon } from '../icons/bell';



const DashboardNavbarRoot = styled(AppBar)(({theme}) => ({

  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]

}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen , ...other } = props;

  return (
    <>
        <DashboardNavbarRoot
        dir="rtl"
        theme={theme}
        sx={{
              right: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          sx={{
            minHeight : 64,
            right : 0,
            px: 2
          }}
          >
            <IconButton
              
              onClick={onSidebarOpen}
              sx={{

                color:"primary",
                
                display : {
                  xs: 'inline-block',
                  lg: 'none'
                }
              }}
            >
               <MenuIcon fontSize="small" />

            </IconButton>

            <Tooltip title="Search">
            <IconButton sx={{ mr: 1 , mt:1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box  sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ mr: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          </Toolbar>


        </DashboardNavbarRoot>
        {/* <p>dashboard</p> */}
    
    </>
  )

}

// DashboardNavbar.propTypes = {
//   onSidebarOpen: PropTypes.func
// };

export default DashboardNavbar

