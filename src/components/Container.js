import React, { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../connectors/injected";

const initialRows = [
  { id: 1, col1: "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38", col2: "5" },
  { id: 2, col1: "0xF8843981e7846945960f53243cA2Fd42a579f719", col2: "90" },
  { id: 3, col1: "0x73C1106Ac50eEFF8B69040c95C665e674b850BC3", col2: "5" },
];

const Container = () => {
  const [rows, setRows] = useState(initialRows);

  const { activate, account } = useWeb3React();

  const createSplit = () => {
    const sum = rows.reduce(
      (partialSum, row) => partialSum + parseInt(row.col2),
      0
    );

    if (sum !== 100) {
      alert(`Sum is ${sum} but splits must be equal to 100`);
    } else {
      alert("sign tx with 0xSplits to create contract SUM: " + sum);
    }
  };

  const handleShareCellChanged = (e) => {
    console.log("CELL CHANGED", e);
    const newRows = [...rows];
    const { id, col1 } = rows[e.id - 1];
    newRows[e.id - 1] = { id, col1, col2: e.value };
    setRows(newRows);
  };

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, col1: "0x", col2: "1" },
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
          onCellEditCommit={handleShareCellChanged}
        />
      </div>
      {account ? (
        <Button variant="contained" onClick={createSplit}>
          Create Split
        </Button>
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
