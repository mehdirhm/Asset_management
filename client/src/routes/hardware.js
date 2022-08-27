import { DashboardLayout } from "../dashboard/dashboard-layout";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";



import { useState, useEffect } from "react";
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
          
          }, { headers : {
            'x-auth-token' : localStorage.getItem('token')
          } }).then((res) => {
            alert(res.data);
          }).catch((err) => alert(err.response.data));

      }),
    []
  )

  let hw = [];
  let sw = [];
  let rows_id = [];
  const [rows, setRows] = useState([]);
  const [rows_sw, setRows_sw] = useState([]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionModelSw, setSelectionModelSw] = useState([]);

  const onDelete_1 = () => {

    setRows((rows) => rows.filter((r) => !selectionModel.includes(r._id)));

    axios.delete("http://localhost:3030/assets", {
      headers: {
        'x-auth-token' : localStorage.getItem('token')
      },
      data: {
        type: "hw",
        id : selectionModel
      }
    }).then((res) => {
      alert(res.data);
    }).catch((err) => alert(err.response.data));    
  };

  const onDelete_2 = () => {
    setRows_sw((rows_sw) =>
      rows_sw.filter((r) => !selectionModelSw.includes(r._id))
    );
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:3030/assets",{ 
            headers:{

              'x-auth-token' : localStorage.getItem('token')
  
          }

          }
        );
        setData(response);

        setRows(response.hw);
        setRows_sw(response.sw);

        if (!active) {
          return;
        }
      } catch (error) {
        console.error(error.response);
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
        installationDate: item.installationDate,
        description: item.description,
        propertyNumber: item.propertyNumber,
      });
    });
  }

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



            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
             
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
