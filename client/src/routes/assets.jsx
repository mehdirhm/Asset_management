import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
// import { useAxios } from "use-axios-client";
// import * as React from 'react';
import React, { useState, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import { useAxios } from "use-axios-client";
import { v4 as uuid } from 'uuid';
// const handleReq = (SD) => {
//   axios({
//     method: "get",
//     url: "http://localhost:3030/assets",
//     headers: {
//       "x-auth-token": localStorage.getItem("token"),
//     },
//     // data:user,
//   })
//     .then((res) => {
//       // console.log(res.data)
//       return res.data;

//       // console.log(result)
//     })
//     .then((myJson) => {
//       // console.log("22");
//       SD(myJson);
//     })
//     .catch((err) => {
//       //  alert(err.response.data)
//     });
// };

export default function Assets() {
  let hw = [];
  let sw = [];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:3030/assets"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // const { data, error, loading } = useAxios({
  //   url: "http://localhost:3030/assets",
  // });
  if (!loading && data ) {
    data.hw.map((item) => {
      hw.push({id: uuid(), col1: item.name, col2: item.serialNumber , col3: item.location , col4:item.manufacturer , col5 : item.ip});
    })
    data.sw.map((item) => {
      sw.push({id: uuid(), col1: item.name, col2: item.serialNumber , col3: item.location , col4:item.manufacturer , col5 : item.currentUser.fullName});
    })



    
  }



  // [
  //   { id: 1, col1: data.hw[0].name, col2: "World" },
  //   { id: 2, col1: "Hello", col2: "World" },
  //   { id: 3, col1: "Hello", col2: "World" },
  //   { id: 4, col1: "Hello", col2: "World" },
  // ]
  // if (loading || !data) return "Loading...";
  // if (error) return "Error!";
  // console.log(result)

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <DashboardLayout></DashboardLayout>
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
              rows={hw}
              columns={[
                { field: "col1", headerName: "Name", width: 150 },
                { field: "col2", headerName: "Serial No", width: 150 },
                { field: "col3", headerName: "Location", width: 150 },
                { field: "col4", headerName: "Manufacturer", width: 150 },
                { field: "col5", headerName: "IP", width: 150 },
              ]}
            />
            <h1>Software</h1>
            <DataGrid
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
      )}

      {/* <DataGrid rows={ [{ id: 1, col1: 'Hello', col2: 'World' }]} columns={ [{ field: 'col1', headerName: 'Column 1', width: 150 }]} /> */}
    </>
    // <p></p>
  );
}

//   <main style={{ padding: "1rem 0" }}>
//         <h2>Assets</h2>
//       </main>
