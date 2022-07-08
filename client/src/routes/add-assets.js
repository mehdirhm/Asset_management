import { DashboardLayout } from "../dashboard/dashboard-layout";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import FilledInput from '@mui/material/FilledInput';

export default function AddAssets() {


    const [name, setName] = React.useState('');
    const handleChange = (event) => {
      setName(event.target.value);
      console.log(name);

    };

  return (
    <>
      <DashboardLayout></DashboardLayout>

     
  


      <Box
      component="form"
      sx={{
        marginTop: 10,
        marginLeft: 5,
        width: 1300,
        height: 300,
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={handleChange}
          defaultValue="Hello World"
        />
        
        <TextField
          id="outlined-password-input"
          label="Serial Number"
          type="number"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Software"
          defaultValue="sw"
          InputProps={{
            readOnly: true,
          }}
        />

<TextField
          required
          id="outlined-required"
          label="Last Update"
          type="date"
          focused        />

<TextField
            focused
          required
          label="Installation Date"
          type="date"
          
        />
        

<TextField
          required
          id="outlined-required"
          label="Location"
          
        />  
        <TextField
          required
          id="outlined-required"
          label="Manufacturer"
          defaultValue=""
        />  

<TextField
          required
          id="outlined-required"
          label="Description"
          defaultValue=""
        />  

<TextField
          required
          id="outlined-required"
          label="Full Name"
          defaultValue="Hello World"
        />

<TextField
          required
          id="outlined-required"
          label="Position"
          defaultValue="Hello World"
        />

<TextField
          required
          id="outlined-required"
          label="Is License"
          defaultValue="Hello World"
        />
        
        
      </div>
    </Box>
    </>
  );
}
