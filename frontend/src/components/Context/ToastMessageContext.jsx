import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessageContext = createContext();

export const useToast = () => useContext(ToastMessageContext);

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warn":
        toast.warn(message);
        break;
      case "info":
      default:
        toast.info(message);
        break;
    }
  };

  return (
    <ToastMessageContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </ToastMessageContext.Provider>
  );
};
