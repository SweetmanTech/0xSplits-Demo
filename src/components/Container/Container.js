import React, { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors/injected";
import CreateSplitButton from "../CreateSplitButton";

const initialRows = [
  { id: 1, col1: "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38", col2: "100" },
];

const Container = () => {
  const [rows, setRows] = useState(initialRows);

  const { activate, account } = useWeb3React();

  const handleCellChanged = (e) => {
    const newRows = [...rows];
    newRows[e.id - 1][e.field] = e.value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, col1: "", col2: "0" },
    ]);
  };

  const columns = [
    {
      field: "col1",
      headerName: "Address",
      width: 150,
      editable: true,
      sortable: false,
    },
    {
      field: "col2",
      headerName: "Share",
      width: 150,
      editable: true,
      sortable: false,
      type: "number",
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          setRows(rows.filter((r) => params.id !== r.id));
        };

        return <Button onClick={onClick}>Delete</Button>;
      },
    },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          hideFooter
          onCellEditCommit={handleCellChanged}
        />
      </div>
      {account ? (
        <CreateSplitButton splitData={rows} />
      ) : (
        <Button variant="contained" onClick={() => activate(injected)}>
          Connect Wallet
        </Button>
      )}
      <Button variant="contained" onClick={addRow}>
        Add Recipient
      </Button>
    </>
  );
};

export default Container;
