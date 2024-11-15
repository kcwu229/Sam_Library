import ChangeLanguageIcon from "./atoms/ChangeLanguageIcon";
import QuestionIcon from "./atoms/QuestionIcon";
import LoginImage from "../assets/images/login.png";
import LogoImage from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import ExplainationIcon from "./atoms/ExplainationIcon";
import { login } from "../services/AuthService";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (username === "") {
      errorCopy.username = "Username is required !";
      valid = false;
    } else {
      errorCopy.username = "";
    }

    if (password === "") {
      errorCopy.password = "Password is required !";
      valid = false;
    } else {
      errorCopy.password = "";
    }

    setErrors(errorCopy);
    return valid;
  }

  async function submitLoginForm(e) {
    e.preventDefault();

    if (validateForm()) {
      //console.log("Pass the validation");
      try {
        const response = await login({ username, password });
        if (response.data === "Login successful") {
          alert("Login successful");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("There was an error logging in!", error);
      }
    } else {
      //console.log("Failed the validation");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-4/5 flex">
      <div className="w-1/2 flex">
        <img className="w-full h-full" src={LoginImage}></img>
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div>
          <QuestionIcon />
          <div className="group">
            <button>
              <ChangeLanguageIcon />
            </button>
            <p className="absolute top-10 right-8 w-14 h-18 text-xs text-wrap invisible group-hover:visible text-center bg-slate-50">
              Click to change language
            </p>
          </div>
        </div>

        <form className="w-full max-w-sm relative mt-10">
          <img className="w-20 h-18 mb-10" src={LogoImage}></img>
          <h1 className="font-bold mb-4 mt-1 text-blue-500 text-4xl">
            Welcome Back
          </h1>
          <p>Log in your account</p>
          <br />
          <div className="mb-4">
            <input
              className={`shadow appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-pink-500" : ""
              }`}
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <i className="text-red-400 text-sm">{errors.username}</i>
            )}
          </div>

          <div className="mb-10">
            <input
              className={`shadow appearance-none
              border rounded w-full py-2 px-3
               text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                 errors.password ? "border-pink-500" : ""
               }`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <i className="text-red-400 text-sm">{errors.password}</i>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" className="w-4 h-4" />
              <label className="inline-flex items-center ml-3">
                Remember me
              </label>
            </div>
            <a href="/forget-password">
              <i className="text-sm">Forget Password ?</i>
            </a>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white 
              font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8
              focus:shadow-outline"
            type="submit"
            onClick={submitLoginForm}
          >
            Login
          </button>
          <div className="text-center mt-2 mb-20">
            Don't have account ?
            <a href="/sign-up" className="ml-6">
              <b>
                <i className="text-sm">Sign up</i>
              </b>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
