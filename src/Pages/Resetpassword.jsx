import React, { useState } from "react";
import AxiosService from "../components/utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Sipnners"; // Replace with the correct path to your Spinner component
import resetcss from "./resetPassword.module.css";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting the reset password process

      const response = await AxiosService.post("/user/reset-password", {
        token,
        password,
      });

      // Assuming your backend returns a message on success
      setMessage(response.data.message);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      // Handle errors from the backend
      setMessage(error.response.data.message);
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      }
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        navigate("/");
      }
    } finally {
      setLoading(false); // Set loading to false when the reset password process is complete
    }
  };

  return (
    <>
      <div className={resetcss.totalbody}>
        <div className={resetcss.circles}>
          <div className={resetcss.circle1}></div>
          <div className={resetcss.circle2}></div>
        </div>
        <form onSubmit={handleResetPassword} className={resetcss.login_form}>
          <h1>Welcome back!</h1>
          <p>Reset Password</p>

          <input
            type="text"
            className={resetcss.formcontrol}
            value={token}
            placeholder="Token"
            onChange={(e) => setToken(e.target.value)}
          />
          <input
            type="password"
            className={resetcss.formcontrol}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={resetcss.formcontrol}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            {loading ? <Spinner /> : "Reset Password"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default ResetPassword;
