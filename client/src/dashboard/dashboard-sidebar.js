import {useEffect} from 'react'
// import { useRouter } from 'next/router'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
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

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    // const router = useRouter();
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg') , { 
    //     defaultMatches : true,
    //     noSsr: false
    // });

    useEffect(
        () => {
            // if(!router.isReady) {
            //     return;
            // }

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
                             <NextLink
                                href="/"
                                passHref
                             >
                                 <a>
                                     <Logo
                                       
                                        sx={{ 
                                            height: 42,
                                            width: 42
                                        }}
                                    />


                                     
                                 </a>

                             </NextLink>
                             
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
