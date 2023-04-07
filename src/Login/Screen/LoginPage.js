import * as React from "react";
import { Box, Paper, Divider } from "@mui/material";
import { EmailField, PasswordField } from "../Component/LoginInputFields";
import { useNavigate } from "react-router-dom";
import { LoginButtons } from "../Component/LoginButtons";
import Alert from "../../CommonComponents/Alert";
import { getUser, setLocalUser } from "../../AWS/userService";

function LoginPage() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const formRef = React.useRef();
  const navigate = useNavigate();

  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }

  async function handleLogin() {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    console.log("handlelogin");

    if (email == null) {
      setEmailErrorMessage("E-mail is not entered");
    } else if (password == null) {
      setPasswordErrorMessage("Password is not entered");
    } else {
      const rslt = await getUser(email, password);
      console.log("data", rslt);

      if (rslt.rc === 0) {
        if (rslt.data.Items.length === 0) {
          setEmailErrorMessage("User is not a registered user");
        } else {
          if (rslt.data.Items[0].password != password) {
            setPasswordErrorMessage("Password is incorrect");
          } else {
            let loggedInUser = {
              email: rslt.data.Items[0].email,
              user_name: rslt.data.Items[0].user_name,
              password: rslt.data.Items[0].password,
            };

            setLocalUser(loggedInUser);
            handleOpenAlert();
            setTimeout(() => {
              navigate("/subscriptionpage");
            }, 3000);
          }
        }
      }
    }
  }

  function handleSignUp() {
    navigate("/signuppage");
  }

  //successfull login triggers alert
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flewDirection: "row",
        justifyContent: "space-evenly",
      }}>
      <div />
      <form ref={formRef}>
        <div style={{ paddingTop: "5%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingTop: 10,
              "& > :not(style)": {
                m: 1,
                width: 400,
                height: 480,
              },
            }}>
            <Paper elevation={3}>
              <h1 style={{ paddingLeft: 10 }}> Login </h1> <Divider />
              <EmailField
                setEmail={handleEmail}
                emailErrorMessage={emailErrorMessage}
              />
              <PasswordField
                setPassword={handlePassword}
                passwordErrorMessage={passwordErrorMessage}
              />
              <LoginButtons
                handleLogin={handleLogin}
                formRef={formRef}
                handleSignUp={handleSignUp}
              />
            </Paper>
          </Box>
        </div>
      </form>
      <Alert
        open={openAlert}
        severity='success'
        customText='You have successfully logged in, redirecting you to subscription page.'
      />
    </div>
  );
}

export default LoginPage;
