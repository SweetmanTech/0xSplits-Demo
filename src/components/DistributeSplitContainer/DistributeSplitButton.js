import { Button, CircularProgress } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import SplitsService from "../../utils/Splits";

const DistributeSplitButton = ({
  split,
  accounts,
  percentAllocations,
  distributorFee,
}) => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    const contract = SplitsService.getContract();
    try {
      const response = await SplitsService.distributeETH(
        contract,
        split,
        accounts,
        percentAllocations,
        distributorFee,
        account
      );
      const receipt = await response.wait();
      setLoading(false);
      return receipt;
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="outlined"
          onClick={handleButtonClick}
          disabled={!account}
        >
          Distribute Funds
        </Button>
      )}
    </>
  );
};

export default DistributeSplitButton;
