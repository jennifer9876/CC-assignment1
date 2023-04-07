import * as React from "react";
import { Box, TextField } from "@mui/material";

function EmailField(props) {
  let { email, setEmail, emailErrorMessage } = props;

  return (
    <Box
      style={{
        width: "90%",
        margin: "auto",
        paddingBottom: 10,
        paddingTop: 10,
      }}>
      <TextField
        type='text'
        label='Email address'
        variant='outlined'
        fullWidth={true}
        defaultValue={email}
        onChange={function (event) {
          setEmail(event.target.value);
        }}
        error={emailErrorMessage.length !== 0}
        helperText={emailErrorMessage}
      />
    </Box>
  );
}

function PasswordField(props) {
  let { Password, setPassword, passwordErrorMessage } = props;
  return (
    <Box
      style={{
        width: "90%",
        margin: "auto",
        paddingBottom: 10,
      }}>
      <TextField
        label='Password'
        variant='outlined'
        type='password'
        fullWidth={true}
        defaultValue={Password}
        onChange={function (event) {
          setPassword(event.target.value);
        }}
        error={passwordErrorMessage.length !== 0}
        helperText={passwordErrorMessage}
      />
    </Box>
  );
}
export { EmailField, PasswordField };
