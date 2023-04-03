import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";

function LoginOTPDialog(props) {
  let { onClose, open, handleOTP } = props;
  const [otp, setOTP] = React.useState();

  function onAgree() {
    handleOTP(otp);
    onClose();
  }

  function onDisagree() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle> Insert OTP </DialogTitle>
      <Divider style={{ borderColor: "black" }} />
      <TextField
        autoFocus
        style={{ padding: 20 }}
        margin='dense'
        variant='standard'
        onChange={function (event) {
          setOTP(event.target.value);
        }}
      />
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          OK
        </Button>
        <Button onClick={onDisagree}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
}

export { LoginOTPDialog };
