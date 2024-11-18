import React, { useState } from "react";
import { createBook } from "../services/BookServices";
import { useNavigate } from "react-router-dom";

function CreateBooksPage() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisherYear: "",
    introduction: "",
    isbn: "",
    image: null,
  });

  // ToDo: make a save img url and save img to server function

  const goBack = () => navigate("/books");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setBookData({
      ...bookData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    createBook(bookData)
      .then((response) => {
        console.log(response.data);
        navigate("/books");
      })
      .catch((error) => {
        //console.log(error);
        alert(error);
      });
    console.log(bookData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label> <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publisher Year:</label> <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="publisherYear"
            value={bookData.publisherYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Book introduction:</label> <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="introduction"
            value={bookData.introduction}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ISBN:</label> <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label> <br />
          <input
            className="shadow appearance-none border-t border-b border-r px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <br />
        <button
          class="text-sam-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 
            font-bold rounded-lg text-sm px-5 py-2.5 
            text-center"
          type="submit"
        >
          Create Book
        </button>
      </form>
      <br />
      <button
        class="text-sam-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 
            font-bold rounded-lg text-sm px-5 py-2.5 
            text-center"
        type="button"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
}

export default CreateBooksPage;
