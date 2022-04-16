import { Button, CircularProgress, Link, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import SplitsService from "../../utils/Splits";

const WithdrawSplitContainer = () => {
  const [loading, setLoading] = useState(false);
  const { account } = useWeb3React();

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const contract = SplitsService.getContract();
      const response = await SplitsService.withdraw(contract, account, 1, []);
      const receipt = await response.wait();
      setLoading(false);
      return receipt;
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h2">
        <Link
          href="https://docs.0xsplits.xyz/smartcontracts/SplitMain#withdraw"
          target="_blank"
        >
          Withdraw
        </Link>{" "}
        Funds
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          disabled={!account}
          onClick={handleButtonClick}
        >
          Withdraw
        </Button>
      )}
    </>
  );
};

export default WithdrawSplitContainer;
