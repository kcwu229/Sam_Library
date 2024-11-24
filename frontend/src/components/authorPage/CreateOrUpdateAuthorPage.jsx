import { useState, useEffect } from "react";
import axios from "axios";
import InputTag from "../form/InputTag";
import LabelsTag from "../form/LabelsTag";
import TextAreaTag from "../form/TextAreaTag";
import CreateFormErrorTag from "../form/CreateFormErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthor } from "../../services/AuthorServices";
import FileInput from "../form/FileInput";
import Cookies from "js-cookie";
import { createAuthor, updateAuthor } from "../../services/AuthorServices";

const CreateOrUpdateAuthorPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      getAuthor(id)
        .then((response) => {
          setAuthor(response.data);
          if (response.data.imageName) {
            const imageUrl = `${process.env.REACT_APP_BASE_URL}/authors/${response.data.imageName}.png`;
            setImagePreviewUrl(imageUrl);
            fetch(imageUrl, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`, // Include the token in the request headers
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

  const handleFileChange = (fileList) => {
    const file = fileList[0];
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

    if (author.birthYear.toString().trim()) {
      const birthYear = Number(author.birthYear);
      if (!Number.isInteger(birthYear)) {
        valid = false;
        errorsCopy.birthYear = "Birth Year must be an integer";
      } else if (birthYear < 0 || birthYear > new Date().getFullYear()) {
        valid = false;
        errorsCopy.birthYear = `Birth Year should be between 0 and ${new Date().getFullYear()}`;
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

    if (!id && !file) {
      valid = false;
      errorsCopy.file = "Image is required";
    } else {
      errorsCopy.file = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  const saveOrUpdateAuthor = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create a new FormData object
      const formData = new FormData();
      formData.append(
        "author",
        new Blob([JSON.stringify(author)], { type: "application/json" })
      );
      if (file) {
        formData.append("file", file);
        console.log("File: before submit ??", file);
      }

      // Debugging: Log the author object to verify the fields

      try {
        if (id) {
          // Update existing author
          const response = await updateAuthor(id, formData);
        } else {
          // Create a new author
          const response = await createAuthor(formData);
        }
        navigate("/authors");
      } catch (error) {
        console.error("Error saving author:", error);
      }
    }
  };

  return (
    <form className="w-full max-w-lg pt-40" onSubmit={saveOrUpdateAuthor}>
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

      <div className="flex flex-wrap -mx-3 mb-6 relative">
        <div className="w-full px-3">
          <LabelsTag for="grid-zip" text="Image" required="*" />
          <FileInput
            value={file ? [file] : []}
            onChange={handleFileChange}
            error={errors.file}
          />
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

export default CreateOrUpdateAuthorPage;
