import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";


// import { useAxios } from "use-axios-client";
// import * as React from 'react';
import { useState, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid ,GridCellModes } from "@mui/x-data-grid";
import PropTypes from "prop-types";

import { useAxios } from "use-axios-client";
import { v4 as uuid } from "uuid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
      console.log(cellModesModel);
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
        variant="outlined"
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        color="primary"
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(["edit", "view"]).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};

export default function Hardware() {
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        console.log(newRow)
        axios.put("http://localhost:3030/assets", {
          data: { ...newRow, type: "hw"  },
        });
      }),
    []
  )

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

  // const onDelete_1 = () => {
  //   // console.log(selectionModel.includes('626d78f9110b8bcc06b21148'))
  //   // console.log(selectionModel)
  //   setRows((rows) => rows.filter((r) => !selectionModel.includes(r._id)));
  //   console.log(rows);
  //   // setSelectionModel([]);
  // };

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
        assetType: item.type,
        fullName: item.currentUser.fullName,
        position: item.currentUser.position,
        // currentUser: item.currentUser.fullName,
        installationDate: item.installationDate,
        // type: item.type,
        description: item.description,
        propertyNumber: item.propertyNumber,
      });
    });
    //     // console.log(hw)
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

processRowUpdate={processRowUpdate}
            onCellKeyDown={handleCellKeyDown}
            cellModesModel={cellModesModel}
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: {
                cellMode,
                selectedCellParams,
                setSelectedCellParams,
                cellModesModel,
                setCellModesModel,
              },
              cell: {
                onFocus: handleCellFocus,
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}



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
              { field: "name", headerName: "Name", width: 150 , editable: true },
              { field: "serialNumber", headerName: "Serial No", width: 150 , editable: true },
              { field: "location", headerName: "Location", width: 150 , editable: true},
              { field: "manufacturer", headerName: "Manufacturer", width: 150 , editable: true },
              { field: "propertyNumber", headerName: "property Number", width: 150 , editable: true },
              { field: "description", headerName: "Description", width: 150 , editable: true },
              { field: "installationDate", headerName: "installation Date", width: 150 , editable: true },
              { field: "position", headerName: "Position", width: 150,editable: true },

              // { field: "type", headerName: "type", width: 150 , editable: true },
              { field: "fullName", headerName: "current User Full Name", width: 150 , editable: true },
              { field: "assetType", headerName: "Asset Type", width: 150 , editable: true },


              { field: "ip", headerName: "IP", width: 150 , editable: true },
            ]}
            // keepNonExistentRowsSelected
          />
          <Stack style={{ marginBottom: 100 }} direction="row" spacing={2}>
            <Button onClick={onDelete_1} variant="outlined" color="error">
              Delete
            </Button>
            {/* <Button variant="contained" color="success">
              Add
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
