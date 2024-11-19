import React, { useState } from "react";
import axios from "axios";
import InputTag from "../form/InputTag";
import LabelsTag from "../form/LabelsTag";
import TextAreaTag from "../form/TextAreaTag";
import CreateFormErrorTag from "../form/CreateFormErrorTag";
import { useNavigate } from "react-router-dom";

const CreateAuthorsPage = () => {
  const navigate = useNavigate();
  const [author, setauthor] = useState({
    name: "",
    birthYear: "",
    deathYear: "",
    country: "",
    authorDescription: "",
    authorName: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    name: "",
    birthYear: "",
    file: "",
    authorDescription: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "authorDescription") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 50) {
        setErrors({
          ...errors,
          authorDescription: "Description cannot exceed 50 words",
        });
        return;
      } else {
        setErrors({ ...errors, authorDescription: "" });
      }
    }

    setauthor({ ...author, [name]: value });
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
      setauthor({ ...author, authorName: file.name }); // Update authorName with the image name

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
      errorsCopy.name = "name is required";
    }

    if (author.birthYear.trim()) {
      const deathYear = Number(author.birthYear);
      if (!Number.isInteger(deathYear)) {
        valid = false;
        errorsCopy.birthYear = "Birth Year must be an integer";
      } else if (deathYear < 0 || deathYear > 2022) {
        valid = false;
        errorsCopy.birthYear = "Birth Year should be between 0 and 2022";
      } else {
        errorsCopy.birthYear = "";
      }
    } else {
      valid = false;
      errorsCopy.birthYear = "Birth Year is required !";
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

    if (validateForm()) {
      const formData = new FormData();
      formData.append(
        "author",
        new Blob([JSON.stringify(author)], { type: "application/json" })
      );
      formData.append("file", file);

      // create a new author
      try {
        const response = await axios.post("/authors", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-File-Name": file.name, // Custom header to pass the file name
          },
        });
        console.log("author created successfully:", response.data);
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
          <LabelsTag for="name" text="name" required="*" />
          <InputTag
            id="name"
            name="name"
            value={author.name}
            onChange={handleInputChange}
            text="name"
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
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0  relative">
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
        <div className="w-full px-3">
          <LabelsTag for="description" text="Description" />
          <TextAreaTag
            id="description"
            name="authorDescription"
            text="Description"
            onChange={handleInputChange}
            value={author.authorDescription}
          />
          {errors.authorDescription && (
            <CreateFormErrorTag error={errors.authorDescription} />
          )}
          <p className="text-gray-600 text-xs italic">Not more than 50 words</p>
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
