import React, { useState } from "react";
import AxiosService from "../components/utils/ApiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Signupcss from "./signup.module.css";
import Spinner from "../components/Sipnners"; // Replace with the correct path to your Spinner component

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Input validation
    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmailValid(signupData.email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await AxiosService.post("/user/signup", signupData);
      console.log(response.data.message);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Signupcss.totalbody}>
        <div className={Signupcss.circles}>
          <div className={Signupcss.circle1}></div>
          <div className={Signupcss.circle2}></div>
        </div>
        <form onSubmit={handleSignup} className={Signupcss.login_form}>
          <h1>Welcome back!</h1>
          <p>Signup to your account.</p>
          <input
            type="text"
            className={Signupcss.formcontrol}
            placeholder="First Name"
            value={signupData.firstName}
            onChange={(e) =>
              setSignupData({ ...signupData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            className={Signupcss.formcontrol}
            placeholder="Last Name"
            value={signupData.lastName}
            onChange={(e) =>
              setSignupData({ ...signupData, lastName: e.target.value })
            }
          />
          <input
            type="email"
            className={Signupcss.formcontrol}
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            className={Signupcss.formcontrol}
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <button type="submit"> {loading ? <Spinner /> : "Signup"}</button>
          {/* Login Link */}
          <p>
            Already have an account?{" "}
            <Link to="/" className={Signupcss.signuptext}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
