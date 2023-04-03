import * as React from "react";
import { Box, Stack, Button, Divider } from "@mui/material";

function LoginButtons(props) {
  let { handleLogin, handleSignUp, formRef} = props;

  return (
    <Box style={{ width: "90%", margin: "auto" }}>
      <Stack spacing={2}>
        <Button
          variant='contained'
          style={{
            height: 50,
          }}
          onClick={function () {
            props.formRef.current.reportValidity();
            handleLogin();
          }}>
          Log In
        </Button>
        <Divider textAlign='centre'> Not Signed In Yet ? </Divider>
        <Button
          variant='contained'
          color='success'
          style={{
            height: 50,
            top: 30,
          }}
          onClick={function () {
            handleSignUp();
          }}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}

export { LoginButtons };
