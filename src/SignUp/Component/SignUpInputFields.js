import * as React from "react";
import { Box, TextField } from "@mui/material";

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
        type='email'
        label='Email'
        variant='outlined'
        fullWidth={true}
        defaultValue={email}
        onBlur={function (event) {
          setEmail(event.target.value);
        }}
        required={true}
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
        onBlur={function (event) {
          setPassword(event.target.value);
        }}
        required={true}
        error={props.passwordErrorMessage.length !== 0}
        helperText={props.passwordErrorMessage}
      />
    </Box>
  );
}

function NameFields(props) {
  let { setFirstName } = props;
  return (
    <Box
      style={{
        width: "90%",
        margin: "auto",

        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <TextField
        label='Enter Username Name'
        variant='outlined'
        onBlur={function (event) {
          setFirstName(event.target.value);
        }}
        required={true}
        error={props.firstNameErrorMessage.length !== 0}
        helperText={props.firstNameErrorMessage}
      />
    </Box>
  );
}
export { EmailField, PasswordField, NameFields };
