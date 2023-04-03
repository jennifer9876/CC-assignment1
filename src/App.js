import "./App.css";
import * as React from "react";
import { useState } from "react";
import LoginPage from "./Login/Screen/LoginPage";
import SignUpPage from "./SignUp/Screen/SignUpPage";
import { HomePage } from "./Home/Screen/HomePage";
import ProfilePage from "./Profile/Screen/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { removeLocalUser } from "../src/AWS/route";

function App() {
  //useState set to grab user in localstorage to keep user logged in
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
  );

  //centralise login and logout
  const onLogin = (email) => {
    setLoggedInUser(email);
    localStorage.setItem("loggedInUser", email);
  };
  const onLogout = (email) => {
    removeLocalUser();
  };

  function onDelete(postId) {
    window.localStorage.removeItem("post_" + postId);
    let postIds = window.localStorage.getItem("postIds");
    postIds = JSON.parse(postIds);

    let loginInfo = window.localStorage.getItem(loggedInUser);
    loginInfo = JSON.parse(loginInfo);

    let idx = postIds.indexOf(postId);
    let newPostIds = [...postIds];
    newPostIds.splice(idx, 1);
    window.localStorage.setItem("postIds", JSON.stringify(newPostIds));

    let userPostIds = loginInfo.userPostIds;
    let userPostIdx = userPostIds.indexOf("post_" + postId);
    let newUserPostIds = [...userPostIds];
    newUserPostIds.splice(userPostIdx, 1);
    loginInfo.userPostIds = newUserPostIds;
    window.localStorage.setItem(loggedInUser, JSON.stringify(loginInfo));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage onLogin={onLogin} />} />
        <Route path='/signuppage' element={<SignUpPage />} />
        <Route
          path='/homepage'
          element={<HomePage loggedInUser={loggedInUser} onLogout={onLogout} />}
        />
        <Route
          path='/profilepage'
          element={
            <ProfilePage
              loggedInUser={loggedInUser}
              onLogout={onLogout}
              onDelete={onDelete}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
