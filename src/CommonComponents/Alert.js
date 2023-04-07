import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Alerts(props) {
  let { open, onClose, customText } = props;

  return (
    <Stack>
      <Snackbar open={open} autoHideDuration={1000} onClose={onClose}>
        <Alert onClose={onClose} sx={{ width: "100%" }}>
          {customText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
