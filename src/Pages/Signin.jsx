import React, { useState } from "react";
import { toast } from "react-toastify";
import AxiosService from "../components/utils/ApiService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Sipnners"; // Import your Spinner component
import Signincss from "./signin.module.css";

function Signin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // New loading state

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting the login process

      const response = await AxiosService.post("/user/signin", loginData);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/Home");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData)
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Set loading to false when the login process is complete
    }
  };

  return (
    <>
      <div className={Signincss.totalbody}>
        <div className={Signincss.circles}>
          <div className={Signincss.circle1}></div>
          <div className={Signincss.circle2}></div>
        </div>
        <form onSubmit={handleLogin} className={Signincss.login_form}>
          <h1>Welcome back!</h1>
          <p>Login to your account.</p>
          <input
            type="email"
            className={Signincss.formcontrol}
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />

          <input
            type="password"
            className={Signincss.formcontrol}
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button type="submit">{loading ? <Spinner /> : "Login"}</button>

          <div className="mt-3">
            <Link to="/Forgotpassword" className={Signincss.signuptext}>
              Forgot Password?
            </Link>
          </div>

          <div>
            <p className={Signincss.signuplink}>
              Don't have an account?{" "}
              <Link to="/signup" className={Signincss.signuptext}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
