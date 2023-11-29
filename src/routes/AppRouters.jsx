import React from "react";
import { Routes, Route } from "react-router-dom";
import Resetpassword from "../Pages/Resetpassword";
import SignIn from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Forgotpasword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import Header from "../components/Header";

export const AppRouters = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Signup />
          </>
        }
      />
      <Route
        path="/resetpassword"
        element={
          <>
            <Resetpassword />
          </>
        }
      />
      <Route
        path="/Forgotpassword"
        element={
          <>
            <Forgotpasword />
          </>
        }
      />
      <Route
        path="/Home"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
    </Routes>
  );
};

export default AppRouters;
