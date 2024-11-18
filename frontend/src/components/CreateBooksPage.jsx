import React, { useState } from "react";
import axios from "axios";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import TextAreaTag from "./form/TextAreaTag";
import CreateBookErrorTag from "./form/CreateBookErrorTag";
import { useNavigate } from "react-router-dom";

const CreateBooksPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    isbn: "",
    bookDescription: "",
    bookName: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    title: "",
    publishedYear: "",
    file: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // file validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size > 1048576) {
        // 1 MB = 1048576 bytes
        alert("File size cannot be greater than 1 MB.");
        return;
      }
      setFile(file);
      setBook({ ...book, bookName: file.name }); // Update bookName with the image name

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG or PNG file.");
    }
  };

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (book.title.trim()) {
      errorsCopy.title = "";
    } else {
      valid = false;
      errorsCopy.title = "Title is required";
    }

    if (book.publishedYear.trim()) {
      const publishedYear = Number(book.publishedYear);
      if (!Number.isInteger(publishedYear)) {
        valid = false;
        errorsCopy.publishedYear = "Publish Year must be an integer";
      } else if (publishedYear < 0 || publishedYear > 30) {
        valid = false;
        errorsCopy.publishedYear = "Publish Year should be between 0 and 2022";
      } else {
        errorsCopy.publishedYear = "";
      }
    } else {
      valid = false;
      errorsCopy.publishedYear = "Publish Year is required";
    }

    if (file) {
      errorsCopy.file = "";
    } else {
      valid = false;
      errorsCopy.file = "Image is required";
    }

    setErrors(errorsCopy);
    return valid;
  }

  const saveOrUpdateBook = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append(
        "book",
        new Blob([JSON.stringify(book)], { type: "application/json" })
      );
      formData.append("file", file);

      // create a new book
      try {
        const response = await axios.post("/books", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-File-Name": file.name, // Custom header to pass the file name
          },
        });
        console.log("Book created successfully:", response.data);
        navigate("/books");
      } catch (error) {
        console.error("Error creating book:", error);
      }
    }
  };

  return (
    <form className="w-full max-w-lg pt-40">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <LabelsTag for="title" text="Title" />
          <InputTag
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            text="Title"
            error={errors.title}
          />
          {errors.title && <CreateBookErrorTag error={errors.title} />}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <LabelsTag for="author" text="Author" />
          <InputTag
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            text="Tom Chan"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <LabelsTag for="isbn" text="ISBN" />
          <InputTag
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            text="978-3-16-148410-0"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 relative">
          <LabelsTag for="publishedYear" text="Published Year" />
          <InputTag
            id="publishedYear"
            name="publishedYear"
            value={book.publishedYear}
            onChange={handleInputChange}
            error={errors.publishedYear}
            text="1990"
          />
          {errors.publishedYear && (
            <CreateBookErrorTag error={errors.publishedYear} />
          )}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <LabelsTag for="description" text="Description" />
          <TextAreaTag
            id="description"
            name="bookDescription"
            text="Description"
            onChange={handleInputChange}
            value={book.bookDescription}
          />
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Image
          </label>
          <input
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            required
          />
          {errors.file && <CreateBookErrorTag error={errors.file} />}
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Image Preview"
              className="mt-4 w-1/3"
            />
          )}
        </div>
      </div>

      <button
        className="mb-20 bg-rose-500 rounded-xl px-8 py-2 text-center text-white 
              hover:border-rose-600 hover:border items-center mr-4 relative"
        onClick={saveOrUpdateBook}
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateBooksPage;
