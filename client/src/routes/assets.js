import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";

import { useAxios } from "use-axios-client";
import { v4 as uuid } from "uuid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Assets() {
  let hw = [];
  let sw = [];
  let rows_id = [];
  // console.log(GridSelectionModel)
  const [rows, setRows] = useState([]);
  const [rows_sw, setRows_sw] = useState([]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionModelSw, setSelectionModelSw] = useState([]);
  const onDelete_1 = () => {
    // console.log(selectionModel.includes('626d78f9110b8bcc06b21148'))
    // console.log(selectionModel)
    setRows((rows) => rows.filter((r) => !selectionModel.includes(r._id)));
    axios.delete('http://localhost:3030/assets', {
      data: {
        type: "hw",
        id : selectionModel,
      }
      
    });
    // console.log(rows);
    
  };

  const onDelete_2 = () => {
    // console.log(selectionModel.includes('626d78f9110b8bcc06b21148'))
    // console.log(selectionModel)
    setRows_sw((rows_sw) =>
      rows_sw.filter((r) => !selectionModelSw.includes(r._id))
    );
    axios.delete('http://localhost:3030/assets', {
      data: {
        type: "sw",
        id : selectionModelSw,
      }
      
    });
    // console.log(rows)
    // setSelectionModel([]);
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:3030/assets"
        );
        setData(response);

        setRows(response.hw);
        setRows_sw(response.sw);

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

  useEffect(() => {
    setRows_sw(data.sw);
    // console.log(rows);
  }, [data.sw]);

  useEffect(() => {
    setRows(data.hw);
    // console.log(rows);
  }, [data.hw]);
  // const { data, error, loading } = useAxios({
  //   url: "http://localhost:3030/assets",
  // });

  if (!loading) {
    //   //   // console.log(2)

    rows.map((item) => {
      hw.push({
        id: item._id,
        name: item.name,
        serialNumber: item.serialNumber,
        location: item.location,
        manufacturer: item.manufacturer,
        ip: item.ip,
        currentUser: item.currentUser.fullName,
        position: item.currentUser.position,
        installationDate: item.installationDate,
        type: item.type,
        description: item.description,
        propertyNumber: item.propertyNumber,



        
      });
    });
    //     // console.log(hw)
    rows_sw.map((item) => {
      sw.push({
        id: item._id,
        name: item.name,
        serialNumber: item.serialNumber,
        location: item.location,
        manufacturer: item.manufacturer,
        currentUser: item.currentUser.fullName,
        description: item.description,
        isLicense: item.isLicense,
        lastUpdate: item.lastUpdate,
        position: item.currentUser.position,
        type: item.type,
        

      });
    });
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
              // const selectedIDs = new Set(newSelectionModel);
              // const selectedRows = data.hw.filter(
              //   (h) => selectedIDs.has(h._id)
              //   // console.log(selectedIDs)
              // );
              setSelectionModel(newSelectionModel);
              // console.log(selectedRows);
              // {console.log(selectionModel)}
            }}
            loading={loading}
            rows={hw}
            columns={[
              { field: "name", headerName: "Name", width: 150 },
              { field: "serialNumber", headerName: "Serial No", width: 150 },
              { field: "location", headerName: "Location", width: 150 },
              { field: "manufacturer", headerName: "Manufacturer", width: 150 },
              { field: "propertyNumber", headerName: "property Number", width: 150 },
              { field: "description", headerName: "Description", width: 150 },
              { field: "installationDate", headerName: "installation Date", width: 150 },
              { field: "position", headerName: "Position", width: 150 },

              { field: "type", headerName: "type", width: 150 },
              { field: "currentUser", headerName: "current User", width: 150 },


              { field: "ip", headerName: "IP", width: 150 },

            ]}
            // keepNonExistentRowsSelected
          />
          <Stack style={{ marginBottom: 100 }} direction="row" spacing={2}>
            {/* <Button onClick={onDelete_1} variant="outlined" color="error">
              Delete
            </Button> */}
            
          </Stack>

          <h1>Software</h1>
          <DataGrid
            checkboxSelection
            // checkboxSelection
            // selectionModel={selectionModel}
            // onSelectionModelChange={(newSelectionModel) => {
            //   setSelectionModel(newSelectionModel)
            // }}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModelSw(newSelectionModel);
              // console.log(newSelectionModel  )
              // {console.log(selectionModel)}
            }}
            // selectionModelSw={selectionModel}
            loading={loading}
            rows={sw}
            columns={[
              { field: "name", headerName: "Name", width: 150 },
              { field: "serialNumber", headerName: "Serial No", width: 150 },
              { field: "location", headerName: "Location", width: 150 },
              { field: "manufacturer", headerName: "Manufacturer", width: 150 },
              { field: "currentUser", headerName: "Current User", width: 150 },
              { field: "description", headerName: "Description", width: 150 },
              { field: "isLicense", headerName: "isLicense", width: 150 },
              { field: "lastUpdate", headerName: "last Update", width: 150 },
              { field: "position", headerName: "Position", width: 150 },
              { field: "type", headerName: "type", width: 150 },

            ]}
          />

          <Stack style={{ marginBottom: 100 }} direction="row" spacing={2}>
            {/* <Button onClick={onDelete_2} variant="outlined" color="error">
              Delete
            </Button> */}
           
          </Stack>
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
