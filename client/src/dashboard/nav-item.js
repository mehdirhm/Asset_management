import PropTypes from 'prop-types';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {

const { href, icon, title, ...other } = props;

return (
    <ListItem
        
        disableGutters
        sx={{
            
            display : 'flex',
            mb: 0.5,
            py: 0,
            px:2

        }}

        {...other}
    
    >
    <Link
     style={{ textDecoration: 'none' }}   
     to={href}
     
      >
           
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            
            backgroundColor: 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color:  '#ffff',
            fontWeight:  'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'right',
            textTransform: 'none',
            minWidth:'250px',
            
            width: '100%',
            '& .MuiButton-startIcon': {
              color:  'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box
            dir="rtl"


           sx={{ 
            px: 1.5,  
            my : 0,
            mt:0.6,
            fontSize:14,
            
            fontFamily: 'Vazir',
               
            flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
        </Link> 



        
    </ListItem>
);
    

};
NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string
  };