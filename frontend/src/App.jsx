import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import ForgetPassword from "./components/ForgetPassword";
import BookPage from "./components/bookPage/BookPage";
import HomePage from "./components/HomePage";
import CreateBooksPage from "./components/bookPage/CreateBooksPage";
import AuthorPage from "./components/authorPage/AuthorPage";
import CreateAuthorsPage from "./components/authorPage/CreateAuthorsPage";
import AuthorDetailPage from "./components/authorPage/AuthorDetailPage";
import BookDetailPage from "./components/bookPage/BookDetailPage";

function App() {
  return (
    <>
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
          path="/books/create-book"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <CreateBooksPage />
            </div>
          }
        />
        <Route
          path="/books/:id"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <BookDetailPage />
            </div>
          }
        />

        <Route
          path="/authors"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <AuthorPage />
            </div>
          }
        />
        <Route
          path="/authors/create-author"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <CreateAuthorsPage />
            </div>
          }
        />
        <Route
          path="/authors/:id"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <AuthorDetailPage />
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
    </>
  );
}

export default App;
