import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { getLocalUser } from "../../AWS/userService";
import { getAllMusic, getAllImages } from "../../AWS/subscribeService";
import { listObjects } from "../../AWS/common";
import { SubscriptionTable } from "../Component/SubscriptionTable";
import { Button } from "@mui/material";

const SubscriptionPage = ({ onLogout }) => {
  const navigate = useNavigate();

  let loginInfo = getLocalUser();

  function handleSubscriptionPage() {
    navigate("/subscriptionpage");
  }

  function handleQueryPage() {
    navigate("/querypage");
  }

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <>
      <AppBarComponent
        onSubscriptionClick={handleSubscriptionPage}
        onQueryClick={handleQueryPage}
        onLogoutClick={handleLogout}
        userName={loginInfo.user_name}
      />
      <div style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Button
          variant='contained'
          style={{
            height: 50,
          }}
          onClick={function () {
            getAllImages();
          }}>
          Get all Music
        </Button>
        <SubscriptionTable />
      </div>
    </>
  );
};

export { SubscriptionPage };
