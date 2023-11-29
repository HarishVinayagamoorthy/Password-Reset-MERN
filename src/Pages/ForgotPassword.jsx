import React, { useState } from "react";
import AxiosService from "../components/utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Sipnners"; // Import your Spinner component

import Forgotpassword from "./forgot.module.css";
const Resetpassword = () => {
  const navigate = useNavigate();

  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false); // New loading state

  const handleCancel = () => {
    navigate("/");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AxiosService.post(
        "/user/resetpassword",
        resetPasswordData
      );
      toast.success(
        `OTP and Link Send Successfully to ${resetPasswordData.email} `
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Forgotpassword.totalbody}>
        <div className={Forgotpassword.circles}>
          <div className={Forgotpassword.circle1}></div>
          <div className={Forgotpassword.circle2}></div>
        </div>
        <form
          onSubmit={handleResetPassword}
          className={Forgotpassword.login_form}
        >
          <h1>Welcome back!</h1>
          <p>Forgot Password</p>
          <input
            type="email"
            className={Forgotpassword.formcontrol}
            placeholder="Email"
            value={resetPasswordData.email}
            onChange={(e) =>
              setResetPasswordData({
                ...resetPasswordData,
                email: e.target.value,
              })
            }
          />
          <button type="submit">
            {loading ? <Spinner /> : "Reset Password"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Resetpassword;
