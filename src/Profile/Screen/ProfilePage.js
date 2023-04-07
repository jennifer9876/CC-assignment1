import * as React from "react";
//dialog imports
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../AWS/route";

const ProfilePage = ({ onLogout }) => {
  const navigate = useNavigate();

  function handleSubscriptionPage() {
    navigate("/subscriptionpage");
  }
  function handleQueryPage() {
    navigate("/profilepage");
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
      <div style={{ paddingLeft: 100, paddingRight: 100 }}>
        This is Query Page
      </div>
    </>
  );
};
export default ProfilePage;
