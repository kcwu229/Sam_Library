import React, { useState } from "react";
import axios from "axios";
import InputTag from "../form/InputTag";
import LabelsTag from "../form/LabelsTag";
import TextAreaTag from "../form/TextAreaTag";
import CreateFormErrorTag from "../form/CreateFormErrorTag";
import { useNavigate } from "react-router-dom";

const CreateAuthorsPage = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    name: "",
    birthYear: "",
    deathYear: "",
    country: "",
    catchPhrase: "",
    description: "",
    authorName: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    name: "",
    birthYear: "",
    file: "",
    catchPhrase: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 2000) {
        setErrors({
          ...errors,
          description: "Description cannot exceed 2000 characters",
        });
        return;
      } else {
        setErrors({ ...errors, description: "" });
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

    setAuthor({ ...author, [name]: value });
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
      setAuthor({ ...author, authorName: file.name }); // Update authorName with the image name

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

    if (author.name.trim()) {
      errorsCopy.name = "";
    } else {
      valid = false;
      errorsCopy.name = "Name is required";
    }

    if (author.birthYear.trim()) {
      const birthYear = Number(author.birthYear);
      if (!Number.isInteger(birthYear)) {
        valid = false;
        errorsCopy.birthYear = "Birth Year must be an integer";
      } else if (birthYear < 0 || birthYear > 2022) {
        valid = false;
        errorsCopy.birthYear = "Birth Year should be between 0 and 2022";
      } else {
        errorsCopy.birthYear = "";
      }
    } else {
      valid = false;
      errorsCopy.birthYear = "Birth Year is required!";
    }

    if (author.catchPhrase.trim()) {
      errorsCopy.catchPhrase = "";
    } else {
      valid = false;
      errorsCopy.catchPhrase = "CatchPhrase is required";
    }

    if (author.description.trim()) {
      errorsCopy.description = "";
    } else {
      valid = false;
      errorsCopy.description = "Description is required";
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

  const saveOrUpdateAuthor = async (e) => {
    e.preventDefault();

    console.log("Author object:", author);

    if (validateForm()) {
      const formData = new FormData();
      formData.append(
        "author",
        new Blob([JSON.stringify(author)], { type: "application/json" })
      );
      formData.append("file", file);

      // Debugging: Log the author object to verify the fields
      console.log("Author object:", author);

      // create a new author
      try {
        const response = await axios.post("/authors", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-File-Name": file.name, // Custom header to pass the file name
          },
        });
        console.log("Author created successfully:", response.data);
        navigate("/authors");
      } catch (error) {
        console.error("Error creating author:", error);
      }
    }
  };

  return (
    <form className="w-full max-w-lg pt-40">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <LabelsTag for="name" text="Name" required="*" />
          <InputTag
            id="name"
            name="name"
            value={author.name}
            onChange={handleInputChange}
            text="Name"
            error={errors.name}
          />
          {errors.name && <CreateFormErrorTag error={errors.name} />}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <LabelsTag for="country" text="Country" />
          <InputTag
            id="country"
            name="country"
            value={author.country}
            onChange={handleInputChange}
            text="Japan"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <LabelsTag for="birthYear" text="Year Of Birth" required="*" />
          <InputTag
            id="birthYear"
            name="birthYear"
            value={author.birthYear}
            onChange={handleInputChange}
            error={errors.birthYear}
            text="1990"
          />
          {errors.birthYear && <CreateFormErrorTag error={errors.birthYear} />}
        </div>
        <div className="w-full md:w-1/2 px-3 relative">
          <LabelsTag for="deathYear" text="Year of Death" />
          <InputTag
            id="deathYear"
            name="deathYear"
            value={author.deathYear}
            onChange={handleInputChange}
            error={errors.deathYear}
            text="2000"
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
            value={author.catchPhrase}
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
          <LabelsTag for="description" text="Description" required="*" />
          <TextAreaTag
            id="description"
            name="description"
            text="Description"
            onChange={handleInputChange}
            value={author.description}
            error={errors.description}
          />
          {errors.description && (
            <CreateFormErrorTag error={errors.description} />
          )}
          <p className="text-gray-600 text-xs italic">
            Not more than 2000 characters
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <LabelsTag for="grid-zip" text="Image" required="*" />
          <input
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            required
          />
          {errors.file && <CreateFormErrorTag error={errors.file} />}
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
        onClick={saveOrUpdateAuthor}
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateAuthorsPage;
