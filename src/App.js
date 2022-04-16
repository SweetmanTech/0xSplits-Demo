import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import "./App.css";
import getLibrary from "./hooks/getLibrary";
import CreateSplitContainer from "./components/CreateSplitContainer";
import DistributeSplitContainer from "./components/DistributeSplitContainer";
import { Box } from "@mui/material";

function App() {
  const [accounts, setAccounts] = useState();
  const [percentageAllocations, setPercentAllocations] = useState();
  const distributorFee = 30000;
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <CreateSplitContainer
          setAccounts={setAccounts}
          setPercentAllocations={setPercentAllocations}
          distributorFee={distributorFee}
        />
        <Box pt={3}>
          <DistributeSplitContainer
            accounts={accounts}
            percentAllocations={percentageAllocations}
            distributorFee={distributorFee}
          />
        </Box>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
