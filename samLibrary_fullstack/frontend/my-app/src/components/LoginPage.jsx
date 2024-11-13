import ChangeLanguageIcon from "./atoms/ChangeLanguageIcon";
import QuestionIcon from "./atoms/QuestionIcon";
import LoginImage from "../assets/images/login.jpg";
import { useEffect, useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    let valid = true;

    if (username === "" || password === "") {
      valid = false;
    }
    return valid;
  }

  function submitLoginForm(e) {
    e.preventDefault();

    if (validateForm()) {
      console.log("Pass the validation");
    } else {
      console.log("Failed the validation");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-4/5 flex">
      <div className="w-1/2 flex">
        <img src={LoginImage}></img>
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div>
          <ChangeLanguageIcon />
          <QuestionIcon />
        </div>

        <form className="w-full max-w-sm relative mt-20">
          <h1 className="text-2xl font-bold mb-4 mt-10">Welcome Back</h1>
          <p>Log in your account</p>
          <br />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none 
              border rounded w-full py-2 px-3
               text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" className="w-4 h-4" />
              <label className="inline-flex items-center ml-3">
                Remember me
              </label>
            </div>
            <a href="#">Forget Password ? </a>
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
          <div className="text-center mt-3 mb-20">
            Don't have account ?
            <a href="#" className="ml-6">
              <b>Sign up</b>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
