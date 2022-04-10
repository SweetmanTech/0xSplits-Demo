import Splits from "../../utils/Splits";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import { ethers } from "ethers";

const CreateSplitButton = ({ onSplitResponse, splitData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { account } = useWeb3React();

  const notifyRequirements = (message) => {
    setError(message);
    setLoading(false);
  };

  const createSplit = async () => {
    setError();
    setLoading(true);
    console.log("SUMMING SPLITS");
    const sum = Splits.sumSplits(splitData);
    console.log("SUM", sum);
    if (sum !== 100) {
      notifyRequirements(`Sum is ${sum} but splits must be equal to 100`);
      return;
    }

    const sortedSplitData = [...splitData];

    function compare(a, b) {
      if (a.account >= b.account) return 1;
      if (a.account < b.account) return -1;
      return 0;
    }

    sortedSplitData.sort(compare);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = Splits.getContract(
      "0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE",
      signer
    );
    console.log("CONTRACT", contract);
    const accounts = Splits.getSplitAccounts(sortedSplitData);
    if (accounts.includes(undefined)) {
      notifyRequirements("Please fill in all accounts");
      return;
    }

    if (accounts.length < 2) {
      notifyRequirements("Must have at least 2 accounts to create 0xSplit");
      return;
    }

    const scale = 1000000;

    const percentAllocations = Splits.getScaledSplitPercentAllocations(
      sortedSplitData,
      scale
    );
    if (percentAllocations.includes(NaN)) {
      notifyRequirements("Please fill out all percentage share fields");
      return;
    }
    const distributorFee = 30000;

    try {
      const response = await Splits.createSplit(
        contract,
        accounts,
        percentAllocations,
        distributorFee,
        account,
        account
      );

      onSplitResponse?.(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography color="secondary">Error: {error}</Typography>}
          <Button variant="contained" onClick={createSplit}>
            Create Split
          </Button>
        </>
      )}
    </>
  );
};

export default CreateSplitButton;
