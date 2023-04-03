import * as React from "react";
import { Box, Stack, Button } from "@mui/material";

function SignUpButton(props) {
  let { onSignUp, handleCancel } = props;

  function onSignUpClick() {
    onSignUp(true);
  }

  function onCancelClick() {
    handleCancel(handleCancel);
  }

  return (
    <Box style={{ width: "90%", margin: "auto", paddingTop: 20 }}>
      <Stack spacing={2}>
        <Button
          variant='contained'
          style={{
            height: 50,
          }}
          color='success'
          onClick={function () {
            props.formRef.current.reportValidity();
            onSignUpClick();
          }}>
          Sign Up
        </Button>
        <Button
          variant='contained'
          style={{
            height: 50,
          }}
          onClick={onCancelClick}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}
export { SignUpButton };
