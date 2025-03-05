import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import GoogleLoginButton from "../../component/GoogleLoginButton/GoogleLoginButton";
import { login } from "../../../app/Slice/authSlice/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values.email, values.password, navigate));
    },
  });

  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Login Button */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
          Login
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton
          type="button"  // Add this line to avoid the warning
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />      </form>
    </div>
  );
};

export default Login;
