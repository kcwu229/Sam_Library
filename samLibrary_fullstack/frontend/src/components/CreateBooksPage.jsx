import React, { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    isbn: "",
    bookDescription: "",
    bookName: "", // This will store the image name
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setBook({ ...book, bookName: file.name }); // Update bookName with the image name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "book",
      new Blob([JSON.stringify(book)], { type: "application/json" })
    );
    formData.append("file", file);

    try {
      const response = await axios.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-File-Name": file.name, // Custom header to pass the file name
        },
      });
      console.log("Book created successfully:", response.data);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Published Year:</label>
        <input
          type="text"
          name="publishedYear"
          value={book.publishedYear}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="bookDescription"
          value={book.bookDescription}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
