import * as React from "react";
import { Box, TextField } from "@mui/material";
import { useSlotProps } from "@mui/base";

function EmailField(props) {
  let { email, setEmail } = props;

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
        error={props.emailErrorMessage.length !== 0}
        helperText={props.emailErrorMessage}
      />
    </Box>
  );
}

function PasswordField(props) {
  let { Password, setPassword } = props;
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
        error={props.passwordErrorMessage.length !== 0}
        helperText={props.passwordErrorMessage}
      />
    </Box>
  );
}
export { EmailField, PasswordField };
