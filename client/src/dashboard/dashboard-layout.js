import { DashboardSidebar } from './dashboard-sidebar'
import {DashboardNavbar} from './dashboard'

import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../theme/index'
import { ThemeProvider } from "@mui/material";


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
    }
  }));


export const DashboardLayout = (props) => {
    const { children } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <DashboardLayoutRoot
                
            >
                <Box
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    width: '100%'
                }}
                >
                {children}
                </Box>
            </DashboardLayoutRoot>
                
            <DashboardNavbar
                onSidebarOpen={() => setSidebarOpen(true)}
            />

                    <ThemeProvider theme={theme}>

                    <DashboardSidebar
                            onClose={() => setSidebarOpen(false)}
                            open={isSidebarOpen}
                            
                            
                        />    

                    </ThemeProvider>
                               
        </>
    )
}