import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import SplitsService from "../../utils/Splits";

const CreateSplitButton = ({
  splitData,
  setAccounts,
  setPercentAllocations,
  distributorFee,
}) => {
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
    const sum = SplitsService.sumSplits(splitData);
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

    const contract = SplitsService.getContract();
    const accounts = SplitsService.getSplitAccounts(sortedSplitData);
    if (accounts.includes(undefined)) {
      notifyRequirements("Please fill in all accounts");
      return;
    }

    if (accounts.length < 2) {
      notifyRequirements("Must have at least 2 accounts to create 0xSplit");
      return;
    }

    const scale = await SplitsService.percentageScale(contract);

    const percentAllocations = SplitsService.getScaledSplitPercentAllocations(
      sortedSplitData,
      scale
    );
    if (percentAllocations.includes(NaN) || percentAllocations.includes(0)) {
      notifyRequirements("Please fill out all percentage share fields");
      return;
    }

    try {
      const response = await SplitsService.createSplit(
        contract,
        accounts,
        percentAllocations,
        distributorFee,
        account,
        account
      );

      const receipt = await response.wait();
      const event = receipt.events.find(
        (event) => event.event === "CreateSplit"
      );

      onSplitResponse(event.args.split, accounts, percentAllocations);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSplitResponse = (splitsAddress, accounts, percentAllocations) => {
    setAccounts(accounts);
    setPercentAllocations(percentAllocations);
    notifyRequirements(`0xSplit Created!!! Address: ${splitsAddress}`);
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
