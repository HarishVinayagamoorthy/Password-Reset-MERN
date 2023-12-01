import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosService from "../components/utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Sipnners"; // Import your Spinner component
import Signincss from "./signin.module.css";

function Signin() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosService.post("/user/signin", values);
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
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className={Signincss.totalbody}>
        <div className={Signincss.circles}>
          <div className={Signincss.circle1}></div>
          <div className={Signincss.circle2}></div>
        </div>
        <form onSubmit={formik.handleSubmit} className={Signincss.login_form}>
          <h1>Welcome back!</h1>
          <p>Login to your account.</p>
          <input
            type="email"
            name="email"
            className={Signincss.formcontrol}
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={Signincss.error}>{formik.errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            className={Signincss.formcontrol}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={Signincss.error}>{formik.errors.password}</p>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : "Login"}
          </button>

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
