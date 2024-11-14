import ChangeLanguageIcon from "./atoms/ChangeLanguageIcon";
import QuestionIcon from "./atoms/QuestionIcon";
import { useEffect, useState } from "react";
import LogoImage from "../assets/images/logo.png";
import ExplainationIcon from "./atoms/ExplainationIcon";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    eamil: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (email === "") {
      errorCopy.email = "Email is required !";
      valid = false;
    } else {
      errorCopy.email = "";
    }

    setErrors(errorCopy);
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
    <div className="bg-white p-8 rounded-lg shadow-lg w-3/5 h-4/5 flex">
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

        <form className="w-full max-w-sm relative mt-20">
          <img className="w-20 h-18 mb-10" src={LogoImage}></img>
          <h1 className="font-bold mb-10 text-orange-500 text-4xl">
            Forget your password
          </h1>
          <p>
            Please enter the email address you'd like your password reset
            information sent to
          </p>
          <br />

          <div className="mb-10">
            <input
              className={`shadow appearance-none
              border rounded w-full py-2 px-3
               text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                 errors.email ? "border-pink-500" : ""
               }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <i className="text-red-400 text-sm">{errors.email}</i>
            )}
          </div>

          <button
            className="bg-orange-500 hover:bg-orange-700 text-white 
              font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8
              focus:shadow-outline"
            type="submit"
            onClick={submitLoginForm}
          >
            Request
          </button>
          <div className="text-center mt-2 mb-8">
            <a href="/sign-up" className="ml-6">
              <b>
                <i className="text-l text-blue-600">Back to Login</i>
              </b>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
