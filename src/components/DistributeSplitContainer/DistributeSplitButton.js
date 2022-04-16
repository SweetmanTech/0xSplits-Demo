import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import SplitsService from "../../utils/Splits";

const DistributeSplitButton = ({
  split,
  accounts,
  percentAllocations,
  distributorFee,
}) => {
  const { account } = useWeb3React();

  const handleButtonClick = async () => {
    const contract = SplitsService.getContract();

    const response = await SplitsService.distributeETH(
      contract,
      split,
      accounts,
      percentAllocations,
      distributorFee,
      account
    );
    const receipt = await response.wait();
    return receipt;
  };

  return (
    <Button variant="outlined" onClick={handleButtonClick}>
      Distribute Funds
    </Button>
  );
};

export default DistributeSplitButton;
