import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
import * as React from 'react';

// import { useAxios } from "use-axios-client";
// import * as React from 'react';
import { useState, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

import { useAxios } from "use-axios-client";
import { v4 as uuid } from 'uuid';


export default function Assets() {
  let hw = [] ;
  let sw = [] ;
// console.log(GridSelectionModel)

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionModelSw, setSelectionModelSw] = useState([]);


  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      
      setLoading(true);
      try {
        
        const { data: response } = await axios.get(
          "http://localhost:3030/assets"
        );
        setData(response);

        if (!active) {
          return;
        }
      } catch (error) {
        console.error(error.message);
      }
      
      setLoading(false);
      
    };

    fetchData();
    
    return () => {
      active = false;
    };
    
    


  }, []);


 

  // const { data, error, loading } = useAxios({
  //   url: "http://localhost:3030/assets",
  // });
  
  if ( !loading  ) {
//   //   // console.log(2)
    

    data.hw.map((item) => {
      hw.push({id: item._id, name: item.name, serialNumber: item.serialNumber , location: item.location , manufacturer:item.manufacturer , ip : item.ip});
    })
//     // console.log(hw)
    data.sw.map((item) => {
      sw.push({id: item._id, col1: item.name, col2: item.serialNumber , col3: item.location , col4:item.manufacturer , col5 : item.currentUser.fullName});
    })
    
    
}
      // console.log(1234)
      // hw.push({id: 1, name: "Ali", serialNumber: "1234" , location: "hamedan" , manufacturer:"microsoft" , ip : "12344"});

  // [
  //   { id: 1, col1: data.hw[0].name, col2: "World" },
  //   { id: 2, col1: "Hello", col2: "World" },
  //   { id: 3, col1: "Hello", col2: "World" },
  //   { id: 4, col1: "Hello", col2: "World" },
  // ]
  // if (loading || !data) return "Loading...";
  // if (error) return "Error!";
  // console.log(result)
  // if (loading) return "Loading...";
  
 

    return (
      <>
        {/* {console.log(data.hw)} */}
        
          <>
            <DashboardLayout></DashboardLayout>
            {/* {console.log(selectionModel)} */}
            <div
              style={{
                height: 300,
                width: "60%",
                marginLeft: 150,
                marginTop: 150,
                
              }}
            >
              <h1>Hardware</h1>
              <DataGrid
                // pagination
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel)
                  // console.log(newSelectionModel  )
                  // {console.log(selectionModel)}
                }}
                selectionModel={selectionModel}
                loading={loading}
                
                rows={hw}
                columns={[
                  { field: "name", headerName: "Name", width: 150 },
                  { field: "serialNumber", headerName: "Serial No", width: 150 },
                  { field: "location", headerName: "Location", width: 150 },
                  { field: "manufacturer", headerName: "Manufacturer", width: 150 },
                  { field: "ip", headerName: "IP", width: 150 },
                ]}
                keepNonExistentRowsSelected

  
              
              />
              <h1>Software</h1>
              <DataGrid
                checkboxSelection
                // checkboxSelection
                // selectionModel={selectionModel}
                // onSelectionModelChange={(newSelectionModel) => {
                //   setSelectionModel(newSelectionModel)
                // }}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModelSw(newSelectionModel)
                  // console.log(newSelectionModel  )
                  // {console.log(selectionModel)}
                }}
                selectionModelSw={selectionModel}
                loading={loading}
                rows={sw}
                columns={[
                  { field: "col1", headerName: "Name", width: 150 },
                  { field: "col2", headerName: "Serial No", width: 150 },
                  { field: "col3", headerName: "Location", width: 150 },
                  { field: "col4", headerName: "Manufacturer", width: 150 },
                  { field: "col5", headerName: "Current User", width: 150 },
                ]}
              />
            </div>
          </>
        
  
        {/* <DataGrid rows={ [{ id: 1, col1: 'Hello', col2: 'World' }]} columns={ [{ field: 'col1', headerName: 'Column 1', width: 150 }]} /> */}
      </>
      // <p></p>
    );

  
  
}

//   <main style={{ padding: "1rem 0" }}>
//         <h2>Assets</h2>
//       </main>


















