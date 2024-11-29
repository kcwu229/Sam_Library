import { useState, useEffect } from "react";
import axios from "axios";
import InputTag from "../form/InputTag";
import LabelsTag from "../form/LabelsTag";
import TextAreaTag from "../form/TextAreaTag";
import CreateFormErrorTag from "../form/CreateFormErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../../services/BookServices";
import FileInput from "../form/FileInput";
import { useToast } from "../Context/ToastMessageContext";
import { createBook, updateBook } from "../../services/BookServices";

const CreateOrUpdateBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedDate: "",
    publisher: "",
    category: "",
    isbn: "",
    catchPhrase: "",
    bookDescription: "",
    image: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    publishedDate: "",
    catchPhrase: "",
    bookDescription: "",
    file: "",
  });
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Fetch image from external API
  async function fetchImage(url, bookId) {
    const response = await fetch(
      `${process.env.REACT_APP_PROD_BACKEND_URL}/proxy?url=${encodeURIComponent(
        url
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //console.log("Response: ", response);
    // turn the response into a blob (binary data)
    const blob = await response.blob();
    const file = new File([blob], bookId + ".jpg", { type: blob.type });
    console.log(`it return ${file.name}`);
    return file;
  }

  useEffect(() => {
    // console.log("token: ", Cookies.get("token"));
    if (id) {
      getBook(id)
        .then(async (response) => {
          setBook(response.data);
          if (response.data.image) {
            let imageUrl;
            if (!response.data.image.startsWith("http")) {
              imageUrl = `${process.env.REACT_APP_PROD_BACKEND_URL}/books/${response.data.image}.png`;
            } else {
              imageUrl = response.data.image;
            }
            try {
              const imageFile = await fetchImage(imageUrl, id);
              //console.log("Image file:", imageFile);
              setFile(imageFile);
              setImagePreviewUrl(URL.createObjectURL(imageFile));
            } catch (error) {
              console.error("Error fetching image:", error);
            }
          }
        })
        .catch((error) => console.error("Error fetching book data:", error));
    }
  }, [id]);

  useEffect(() => {
    console.log("Updated Book: ", book);
  }, [book]);

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

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (fileList) => {
    const selectedFile = fileList[0];
    console.log("It return the file: ", selectedFile);
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      console.log("step 1");
      if (selectedFile.size > 1048576) {
        // 1 MB = 1048576 bytes
        alert("File size cannot be greater than 1 MB.");
        return;
      }
      setFile(selectedFile);
      console.log("step 2");
      setBook((prevBook) => ({
        ...prevBook,
        image: selectedFile.name,
      })); // Update image with the image name// Update image with the image name
      console.log("step 3 : new book ", selectedFile.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      console.log("step 4");
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
    console.log("Book object: yoyoyo", book);

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

      // Debugging: Log the formData contents
      for (let pair of formData.entries()) {
        if (pair[1] instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            console.log(`${pair[0]}: ${reader.result}`);
            if (pair[0] === "file") {
              setImagePreviewUrl(reader.result); // Set the image preview URL
            }
          };
          reader.readAsDataURL(pair[1]); // Read as Data URL to verify the file contents
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }

      try {
        if (id) {
          // Update existing book
          console.log("i want to check", formData);
          const response = await updateBook(id, formData);
          console.log("Book updated successfully:", response.data);
          showToast("Successfully update on book!", "success");
        } else {
          // Create a new book
          const response = await createBook(formData);
          console.log("Book created successfully:", response.data);
          showToast("Successfully create a book !", "success");
        }
        navigate("/books#searchBar");
      } catch (error) {
        console.error("Error saving book:", error);
        showToast("Fail to create / update book", "error");
      }
    }
  };

  return (
    <form className="w-10/12 md:w-7/12 pt-40" onSubmit={saveOrUpdateBook}>
      <div className="flex flex-row mx-3 mb-6 items-center">
        <div className="w-full px-3">
          <LabelsTag for="image" text="Cover Image" required="*" />
          <FileInput
            value={file ? [file] : []}
            onChange={(e) => handleFileChange(e)}
            error={errors.file}
          />
          {errors.file && <CreateFormErrorTag error={errors.file} />}
          {imagePreviewUrl && (
            <div className="mt-4">
              <img src={imagePreviewUrl} alt="Image Preview" />
              <p className="text-gray-600 text-xs italic">Current Image</p>
            </div>
          )}
        </div>
      </div>

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
          <LabelsTag for="publishedDate" text="Publication Year" required="*" />
          <InputTag
            id="publishedDate"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleInputChange}
            error={errors.publishedDate}
            text="Publication Date"
          />
          {errors.publishedDate && (
            <CreateFormErrorTag error={errors.publishedDate} />
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <LabelsTag for="publisher" text="Publisher" required="*" />
          <InputTag
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
            text="Author"
            error={errors.publisher}
          />
          {errors.publisher && <CreateFormErrorTag error={errors.publisher} />}
        </div>
        <div className="w-full md:w-1/2 px-3 mt-4">
          <LabelsTag for="category" text="Category" required="*" />
          <InputTag
            id="category"
            name="category"
            value={book.category}
            onChange={handleInputChange}
            text="Category"
            error={errors.category}
          />
          {errors.category && <CreateFormErrorTag error={errors.category} />}
        </div>
        <div className="w-full md:w-1/2 px-3 mt-4 relative">
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
