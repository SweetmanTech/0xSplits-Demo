import { Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import DistributeSplitButton from "./DistributeSplitButton";
import Textfield from "./Textfield";

const DistributeSplitContainer = ({
  accounts,
  percentAllocations,
  distributorFee,
}) => {
  const [splitsAddress, setSplitsAddress] = useState();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2">
          Distribute{" "}
          <Link
            target="_blank"
            href="https://docs.0xsplits.xyz/smartcontracts/SplitMain#distributeeth"
          >
            0xSplits
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Textfield
          splitsAddress={splitsAddress}
          setSplitsAddress={setSplitsAddress}
        />
      </Grid>
      <Grid item xs={2}>
        <DistributeSplitButton
          split={splitsAddress}
          accounts={accounts}
          percentAllocations={percentAllocations}
          distributorFee={distributorFee}
        />
      </Grid>
    </Grid>
  );
};

export default DistributeSplitContainer;
