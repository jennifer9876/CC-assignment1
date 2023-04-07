import LoginPage from "./Login/Screen/LoginPage";
import SignUpPage from "./SignUp/Screen/SignUpPage";
import { SubscriptionPage } from "./Subscribe/Screen/SubscriptionPage";
import QueryPage from "./Query/Screen/QueryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { removeLocalUser } from "./AWS/userService";

function App() {
  const onLogout = () => {
    removeLocalUser();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signuppage' element={<SignUpPage />} />
        <Route
          path='/subscriptionpage'
          element={<SubscriptionPage onLogout={onLogout} />}
        />
        <Route path='/querypage' element={<QueryPage onLogout={onLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
