import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { getLocalUser } from "../../AWS/route";

const SubscriptionPage = ({ onLogout }) => {
  const navigate = useNavigate();

  let loginInfo = getLocalUser();

  function handleSubscriptionPage() {
    navigate("/subscriptionpage");
  }

  function handleQueryPage() {
    navigate("/profilepage");
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
        This is Subscribe Page
      </div>
    </>
  );
};

export { SubscriptionPage };
