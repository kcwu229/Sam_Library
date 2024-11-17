import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import ForgetPassword from "./components/ForgetPassword";
import BookPage from "./components/BookPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <HomePage />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/books"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <BookPage />
              </div>
            }
          />

          <Route
            path="/sign-up"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <SignUpPage />
              </div>
            }
          />

          <Route
            path="/forget-password"
            element={
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <ForgetPassword />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
