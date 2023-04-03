import * as React from "react";
import { Box, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  EmailField,
  PasswordField,
  NameFields,
} from "../Component/SignUpInputFields";
import { SignUpButton } from "../Component/SignUpButtons";
import Alert from "../../CommonComponents/Alert";
import { getAllUsers, putUser } from "../../AWS/route";

function SignUpPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const formRef = React.useRef();
  const navigate = new useNavigate();
  const [openAlert, setOpenAlert] = React.useState(false);

  async function handleSignUp() {
    if (email !== "" && password !== "" && firstName !== "") {
      const rslt = await getAllUsers();

      const allUsers = rslt.data.Items;

      let userExist = false;

      allUsers.forEach((userInfo) => {
        if (userInfo.email === email) {
          userExist = true;
        }
      });

      if (!userExist) {
        await putUser(email, firstName, password);
        setOpenAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setEmailErrorMessage("User exist");
      }
    }
  }
  const handleCancel = () => {
    navigate("/");
  };

  //all four validations are here, check for correct email forman and strong password. Name fields only take in characters, no special characters
  const handleEmail = (email) => {
    setEmail(email);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const handleFirstName = (firstName) => {
    setFirstName(firstName);
  };

  return (
    <div
      style={{
        display: "flex",
        flewDirection: "row",
        justifyContent: "space-evenly",
      }}>
      <div />
      <div style={{ paddingTop: "5%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 400,
              height: 540,
            },
          }}>
          <Paper elevation={3}>
            <h1 style={{ paddingLeft: 10 }}> Sign Up </h1> <Divider />
            <form ref={formRef}>
              <NameFields
                setFirstName={handleFirstName}
                firstNameErrorMessage={firstNameErrorMessage}
              />
              <EmailField
                setEmail={handleEmail}
                emailErrorMessage={emailErrorMessage}
              />
              <PasswordField
                setPassword={handlePassword}
                passwordErrorMessage={passwordErrorMessage}
              />
              <SignUpButton
                onSignUp={handleSignUp}
                handleCancel={handleCancel}
                formRef={formRef}
              />
            </form>
          </Paper>
        </Box>
      </div>
      <Alert
        open={openAlert}
        severity='success'
        customText={
          "You have successfully signed up, redirecting to login page..."
        }
      />
    </div>
  );
}

export default SignUpPage;
