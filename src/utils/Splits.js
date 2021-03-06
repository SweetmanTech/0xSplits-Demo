import { ethers } from "ethers";
import abi0xSplits from "./abi0xSplits.json";

const SplitsService = {
  getContract: (contractAddress, signer) =>
    new ethers.Contract(contractAddress, abi0xSplits, signer),

  createSplit: (
    contract,
    accounts,
    percentAllocations,
    distributorFee,
    controller
  ) =>
    contract.createSplit(
      accounts,
      percentAllocations,
      distributorFee,
      controller
    ),

  percentageScale: (contract, account) =>
    contract.methods.PERCENTAGE_SCALE().call({ from: account }),

  getSplitAccounts: (collaborators) => {
    const accounts = collaborators.reduce(
      (accountArray, currentCollaborator) => {
        accountArray.push(currentCollaborator.col1);
        return accountArray;
      },
      []
    );
    return accounts;
  },

  getSplitPercentAllocations: (collaborators) => {
    const percentageAllocations = collaborators.reduce(
      (percentsArray, currentCollaborator) => {
        percentsArray.push(currentCollaborator.col2);
        return percentsArray;
      },
      []
    );
    return percentageAllocations;
  },

  getScaledSplitPercentAllocations: (collaborators, scale) => {
    const percentageAllocations = collaborators.reduce(
      (percentsArray, currentCollaborator) => {
        percentsArray.push(
          (parseFloat(currentCollaborator.col2) * scale) / 100
        );
        return percentsArray;
      },
      []
    );
    return percentageAllocations;
  },

  sumSplits: (collaborators) =>
    collaborators.reduce(
      (partialSum, collaborator) =>
        partialSum + (parseFloat(collaborator.col2) || 0),
      0
    ),
};
export default SplitsService;
