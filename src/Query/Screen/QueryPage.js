import * as React from "react";
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../AWS/userService";
import { TextField, Button } from "@mui/material";
import { getQueriedData } from "../../AWS/subscribeService";

const QueryPage = ({ onLogout }) => {
  const [title, setTitle] = React.useState();
  const [artist, setArtist] = React.useState();
  const [year, setYear] = React.useState();

  const navigate = useNavigate();

  function handleSubscriptionPage() {
    navigate("/subscriptionpage");
  }

  function handleQueryPage() {
    navigate("/querypage");
  }

  async function handleQuery() {
    const rslt = await getQueriedData(title, artist, year);
  }

  let loginInfo = getLocalUser();

  const handleLogout = () => {
    onLogout();
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <AppBarComponent
        onSubscriptionClick={handleSubscriptionPage}
        onQueryClick={handleQueryPage}
        onLogoutClick={handleLogout}
        userName={loginInfo.user_name}
      />
      <div
        style={{
          paddingTop: "5%",
          paddingLeft: "10%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <TextField
          style={{
            paddingRight: "5%",
          }}
          type='text'
          label='Title'
          variant='outlined'
          onChange={function (event) {
            setTitle(event.target.value);
          }}
        />

        <TextField
          style={{
            paddingRight: "5%",
          }}
          type='text'
          label='Artist'
          variant='outlined'
          onChange={function (event) {
            setArtist(event.target.value);
          }}
        />

        <TextField
          style={{
            paddingRight: "5%",
          }}
          type='text'
          label='Year'
          variant='outlined'
          onChange={function (event) {
            setYear(event.target.value);
          }}
        />

        <Button
          variant='contained'
          onClick={async function () {
            await handleQuery();
          }}>
          Query
        </Button>
      </div>
    </>
  );
};
export default QueryPage;
