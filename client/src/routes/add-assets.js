import { DashboardLayout } from "../dashboard/dashboard-layout";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

const types = [
  {
    value: 'sw',
    label: 'Software',
  },
  {
    value: 'hw',
    label: 'Hardware',
  },
 
];

const licenses = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
 
];

export default function AddAssets() {


    const [name, setName] = React.useState('');
    const [serialNumber, setSerialNumber] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [assetType, setAssetType] = React.useState('');
    const [lastUpdate, setLastUpdate] = React.useState('');
    const [installationDate, setInstallationDate] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [fullName, setFullName] = React.useState(''); 
    const [isLicence, setIsLicence] = React.useState(false);
    const [manufacturer, setManufacturer] = React.useState('');
    const [type, setType] = React.useState('sw');
    
    



    






    const handleChangeName = (event) => {
      setName(event.target.value);
      // console.log(name);

    };

    const handleChangeSerialNumber = (event) => {
      setSerialNumber(event.target.value);
      // console.log(serialNumber);

    };
    const handleChangeLastUpdate = (event) => {
      setLastUpdate(event.target.value);
      // console.log(lastUpdate);

    };
    const handleChangeAssetType = (event) => {
      setAssetType(event.target.value);
      // console.log(name);

    };
    const handleChangeInstallationDate = (event) => {
      setInstallationDate(event.target.value);
      // console.log(name);

    };
    const handleChangeLocation = (event) => {
      setLocation(event.target.value);
      // console.log(name);

    };
    const handleChangeManufacturer = (event) => {
      setManufacturer(event.target.value);
      // console.log(name);

    };
    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
      // console.log(name);

    };
    const handleChangeFullName = (event) => {
      setFullName(event.target.value);
      // console.log(name);

    };

    const handleChangePosition = (event) => {
      setPosition(event.target.value);
      // console.log(name);

    };

    const handleChangeIsLicence = (event) => {
      setIsLicence(event.target.value);
      // console.log(name);

    };

    const handleChangeType = (event) => {
      setType(event.target.value);
      // console.log(name);

    };
    const handleSubmit = (event) => {
      // setIsLicence(event.target.value);
      // console.log("name");

      const newAsset = () => {




        return {
          type,
          name,
          serialNumber,
          description,
          assetType,
          lastUpdate,
          installationDate,
          location,
          position,
          fullName,
          isLicence,
          manufacturer
        }

      }
      console.log(newAsset());

      axios.post('http://localhost:3030/assets', {
      data: newAsset()
      
    }).then((res) => {

      if(res.status !== 200){
        console.log(res.data)
        // localStorage.setItem('token',res.headers['x-auth-token'])
        // window.location.href = "http://localhost:3000/dashboard";

      }
      // alert(res.data);
      

    })
    .catch(err => {
     alert(err.response.data);
    });
    
    
    ;
      console.log(newAsset());

    };

  return (
    <>
      <DashboardLayout></DashboardLayout>

     
  


      <Box
      component="form"
      sx={{
        marginTop: 10,
        marginLeft: 5,
        width:1000,
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
          onChange={handleChangeName}
          defaultValue="Hello World"
        />
        
        <TextField
          required
          id="outlined-password-input"
          label="Serial Number"
          onChange={handleChangeSerialNumber}
          autoComplete="current-password"
        />
        <TextField
        required
          id="outlined-required"
          label="Asset Type"
          onChange={handleChangeAssetType}
         
          
        />
        <TextField
        required
          id="outlined-select-currency"
          select
          label="Select"
          value={type}
          onChange={handleChangeType}
          helperText="Please select your Type"
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

<TextField
          
          id="outlined-required"
          label="Last Update"
          onChange={handleChangeLastUpdate}
          type="date"
          focused        />

<TextField
            focused
          
          label="Installation Date"
          onChange={handleChangeInstallationDate}
          type="date"
          
        />
        

<TextField
          required
          id="outlined-required"
          onChange={handleChangeLocation}
          label="Location"
          
        />  
        <TextField
          
          id="outlined-required"
          label="Manufacturer"
          onChange={handleChangeManufacturer}
          defaultValue=""
        />  

<TextField
          
          id="outlined-required"
          label="Description"
          onChange={handleChangeDescription}
          defaultValue=""
        />  

<TextField
          
          id="outlined-required"
          label="Current User Full Name"
          onChange={handleChangeFullName}
          defaultValue="Hello World"
        />

<TextField
          
          id="outlined-required"
          label="Current User Position"
          onChange={handleChangePosition}
          defaultValue="Hello World"
        />




<TextField
          id="outlined-select-currency"
          select
          label="Is License"
          value={isLicence}
          onChange={handleChangeIsLicence}
          helperText="Please select"
        >
          {licenses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        
      </div>
      <Stack  width="200px"  >
      <Button
      onClick = {handleSubmit}
        
        
       variant="contained" color="success">
        Save
      </Button>
      </Stack>
    </Box>
    </>
  );
}
