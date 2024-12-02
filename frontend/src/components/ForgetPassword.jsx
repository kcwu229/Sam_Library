import { useState } from "react";
import LogoImage from "../assets/images/logo.png";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (email === "") {
      errorCopy.email = "Email is required!";
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
    <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5 lg:w-4/5 xl:w-4/5 h-auto flex flex-col md:flex-row mt-28 mx-auto">
      <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
        <div className="w-full max-w-sm">
          <form className="w-full relative mt-10" onSubmit={submitLoginForm}>
            <img
              className="w-20 h-18 mb-10 mx-auto"
              src={LogoImage}
              alt="Logo"
            />
            <h1 className="font-bold mb-10 text-orange-500 text-4xl text-center">
              Forget your password
            </h1>
            <p className="text-center">
              Please enter the email address you'd like your password reset
              information sent to
            </p>
            <br />
            <div className="mb-10 relative">
              <LabelsTag for="email" text="Email" />
              <InputTag
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                text="Enter your email"
                error={errors.email}
              />
              {errors.email && <CreateFormErrorTag error={errors.email} />}
            </div>

            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8 focus:shadow-outline w-full"
              type="submit"
            >
              Request
            </button>
            <div className="text-center mt-2 mb-8">
              <a href="/login" className="ml-2 text-blue-600 hover:underline">
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
