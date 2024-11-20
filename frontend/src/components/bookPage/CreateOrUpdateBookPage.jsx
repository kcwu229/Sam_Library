import { useState, useEffect } from "react";
import axios from "axios";
import InputTag from "../form/InputTag";
import LabelsTag from "../form/LabelsTag";
import TextAreaTag from "../form/TextAreaTag";
import CreateFormErrorTag from "../form/CreateFormErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../../services/BookServices";
import FileInput from "../form/FileInput";

const CreateOrUpdateBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    isbn: "",
    catchPhrase: "",
    bookDescription: "",
    imageName: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    publishedYear: "",
    catchPhrase: "",
    bookDescription: "",
    file: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    if (id) {
      getBook(id)
        .then((response) => {
          setBook(response.data);
          if (response.data.imageName) {
            const imageUrl = `${process.env.REACT_APP_BASE_URL}/books/${response.data.imageName}.png`;
            setImagePreviewUrl(imageUrl);
            fetch(imageUrl, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the request headers
              },
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.blob();
              })
              .then((blob) => {
                if (blob.size > 0) {
                  const file = new File([blob], response.data.imageName, {
                    type: blob.type,
                  });
                  setFile(file);
                  console.log("File: ", file);
                } else {
                  console.error(
                    "Failed to fetch the image blob. Blob size is 0."
                  );
                }
              })
              .catch((error) =>
                console.error("Error fetching the image blob:", error)
              );
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bookDescription") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 2000) {
        setErrors({
          ...errors,
          bookDescription: "bookDescription cannot exceed 2000 characters",
        });
        return;
      } else {
        setErrors({ ...errors, bookDescription: "" });
      }
    }

    if (name === "catchPhrase") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 2000) {
        setErrors({
          ...errors,
          catchPhrase: "CatchPhrase cannot exceed 2000 characters",
        });
        return;
      } else {
        setErrors({ ...errors, catchPhrase: "" });
      }
    }

    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (fileList) => {
    const file = fileList[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size > 1048576) {
        // 1 MB = 1048576 bytes
        alert("File size cannot be greater than 1 MB.");
        return;
      }
      setFile(file);
      setBook({ ...book, imageName: file.name }); // Update imageName with the image name

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

    if (book.author.trim()) {
      errorsCopy.author = "";
    } else {
      valid = false;
      errorsCopy.author = "Author is required";
    }

    if (book.publishedYear && book.publishedYear.toString().trim()) {
      const publishedYear = Number(book.publishedYear);
      if (!Number.isInteger(publishedYear)) {
        valid = false;
        errorsCopy.publishedYear = "Published Year must be an integer";
      } else if (
        publishedYear < 0 ||
        publishedYear > new Date().getFullYear()
      ) {
        valid = false;
        errorsCopy.publishedYear = `Publication Year should be between 0 and ${new Date().getFullYear()}`;
      } else {
        errorsCopy.publishedYear = "";
      }
    } else {
      valid = false;
      errorsCopy.publishedYear = "Publication Year is required!";
    }

    if (book.catchPhrase.trim()) {
      errorsCopy.catchPhrase = "";
    } else {
      valid = false;
      errorsCopy.catchPhrase = "CatchPhrase is required";
    }

    if (book.bookDescription.trim()) {
      errorsCopy.bookDescription = "";
    } else {
      valid = false;
      errorsCopy.bookDescription = "bookDescription is required";
    }

    if (!id && !file) {
      valid = false;
      errorsCopy.file = "Cover image is required";
    } else {
      errorsCopy.file = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  const saveOrUpdateBook = async (e) => {
    e.preventDefault();

    console.log("Book object:", book);

    if (validateForm()) {
      // Create a new FormData object
      const formData = new FormData();
      formData.append(
        "book",
        new Blob([JSON.stringify(book)], { type: "application/json" })
      );
      if (file) {
        formData.append("file", file);
        console.log("File: before submit ??", file);
      }

      // Debugging: Log the book object to verify the fields
      console.log("Book object:", book);

      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the request headers
        };

        if (id) {
          // Update existing book
          console.log("File: after submit ??", file);
          const response = await axios.put(`/books/${id}`, formData, {
            headers,
          });
          console.log("Book updated successfully:", response.data);
        } else {
          // Create a new book
          const response = await axios.post("/books", formData, {
            headers,
          });
          console.log("Book created successfully:", response.data);
        }
        navigate("/books");
      } catch (error) {
        console.error("Error saving book:", error);
      }
    }
  };

  return (
    <form className="w-full max-w-lg pt-40" onSubmit={saveOrUpdateBook}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <LabelsTag for="title" text="Title" required="*" />
          <InputTag
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            text="Title"
            error={errors.title}
          />
          {errors.title && <CreateFormErrorTag error={errors.title} />}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <LabelsTag for="author" text="Author" required="*" />
          <InputTag
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            text="Author"
            error={errors.author}
          />
          {errors.author && <CreateFormErrorTag error={errors.author} />}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <LabelsTag for="publishedYear" text="Publication Year" required="*" />
          <InputTag
            id="publishedYear"
            name="publishedYear"
            value={book.publishedYear}
            onChange={handleInputChange}
            error={errors.publishedYear}
            text="Publication Year"
          />
          {errors.publishedYear && (
            <CreateFormErrorTag error={errors.publishedYear} />
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 relative">
          <LabelsTag for="isbn" text="isbn" />
          <InputTag
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            text="isbn"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 relative">
          <LabelsTag for="catchPhrase" text="CatchPhrase" required="*" />
          <TextAreaTag
            id="catchPhrase"
            name="catchPhrase"
            text="CatchPhrase"
            onChange={handleInputChange}
            value={book.catchPhrase}
            error={errors.catchPhrase}
          />
          {errors.catchPhrase && (
            <CreateFormErrorTag error={errors.catchPhrase} />
          )}
          <p className="mt-4 text-gray-600 text-xs italic">
            Not more than 2000 characters
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 relative">
          <LabelsTag
            for="bookDescription"
            text="bookDescription"
            required="*"
          />
          <TextAreaTag
            id="bookDescription"
            name="bookDescription"
            text="bookDescription"
            onChange={handleInputChange}
            value={book.bookDescription}
            error={errors.bookDescription}
          />
          {errors.bookDescription && (
            <CreateFormErrorTag error={errors.bookDescription} />
          )}
          <p className="text-gray-600 text-xs italic">
            Not more than 2000 characters
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <LabelsTag for="imageName" text="Cover Image" required="*" />
          <FileInput value={file ? [file] : []} onChange={handleFileChange} />
          {errors.file && <CreateFormErrorTag error={errors.file} />}
          {imagePreviewUrl && (
            <div className="mt-4">
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="w-1/3 mb-4"
              />
              <p className="text-gray-600 text-xs italic">Current Image</p>
            </div>
          )}
        </div>
      </div>

      <button
        className="mb-20 bg-rose-500 rounded-xl px-8 py-2 text-center text-white 
              hover:border-rose-600 hover:border items-center mr-4 relative"
        type="submit"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CreateOrUpdateBookPage;
