import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
import * as React from "react";

// import { useAxios } from "use-axios-client";
// import * as React from 'react';
import { useState, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";

import { useAxios } from "use-axios-client";
import { v4 as uuid } from "uuid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Software() {
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
    console.log(rows);
    // setSelectionModel([]);
  };

  const onDelete_2 = () => {
    // console.log(selectionModel.includes('626d78f9110b8bcc06b21148'))
    // console.log(selectionModel)
    setRows_sw((rows_sw) =>
      rows_sw.filter((r) => !selectionModelSw.includes(r._id))
    );
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

    
    //     // console.log(hw)
    rows_sw.map((item) => {
      sw.push({
        id: item._id,
        col1: item.name,
        col2: item.serialNumber,
        col3: item.location,
        col4: item.manufacturer,
        col5: item.currentUser.fullName,
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
              { field: "col1", headerName: "Name", width: 150 },
              { field: "col2", headerName: "Serial No", width: 150 },
              { field: "col3", headerName: "Location", width: 150 },
              { field: "col4", headerName: "Manufacturer", width: 150 },
              { field: "col5", headerName: "Current User", width: 150 },
            ]}
          />

          <Stack style={{ marginBottom: 100 }} direction="row" spacing={2}>
            <Button onClick={onDelete_2} variant="outlined" color="error">
              Delete
            </Button>
            <Button variant="contained" color="success">
              Add
            </Button>
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