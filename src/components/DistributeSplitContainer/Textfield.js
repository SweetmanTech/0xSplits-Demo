import { TextField } from "@mui/material";

const Textfield = ({ splitsAddress, setSplitsAddress }) => {
  return (
    <TextField
      placeholder="Splits contract address"
      value={splitsAddress}
      onChange={(e) => setSplitsAddress(e.target.value)}
    />
  );
};

export default Textfield;
