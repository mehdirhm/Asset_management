import {useEffect} from 'react'
// import { Link } from "react-router-dom";
// import { useRouter } from 'next/router'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Logo } from './logo';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import theme from '../theme/index'



// import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators';

// export const decorators = [WithNextRouter];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    // const router = useRouter();
    // console.log(router);
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg') , { 
    //     defaultMatches : true,
    //     noSsr: false
    // });

    useEffect(
        () => {
           

            if(open) {
                onClose?.();
            }
        },

        [useParams()]
    );

    const content = (
        <>
                <Box  sx={{ 
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                 }}>
                     <div>
                         <Box sx={{ p: 3}}>
                             <Link
                                to="/"
                                
                             >
                                 
                                     <Logo
                                       
                                        sx={{ 
                                            height: 42,
                                            width: 42
                                        }}
                                    />


                                     
                                 

                             </Link>
                             
                         </Box>

                         <Box
                            sx={{ 
                                px: 2
                            }}
                         >
                             <Box
                                sx={{
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    px:3,
                                    py:11,
                                    borderRadius: 1




                                    
                                }}
                             >


                             </Box>
                             
                         </Box>

                     </div>



                </Box>


            
        
        </>
    )

    
        // return (
        //   <Drawer
        //     anchor="right"
        //     open
        //     PaperProps={{
        //       sx: {
        //         backgroundColor: 'neutral.900',
        //         color: '#FFFFFF',
        //         width: 280
        //       }
        //     }}
        //     variant="permanent"
        //   >
        //     {content}
        //   </Drawer>
        // );


        

      

      return (
        <Drawer
          anchor="right"
          onClose={onClose}
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: 'neutral.900',
              color: '#FFFFFF',
              width: 280
            }
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          {content}
        </Drawer>
      );    





}

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
  };
