import { useEffect, useState } from "react";
import { viewAuthor } from "../../services/AuthorServices";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";

function AuthorDetailPage() {
  const [author, setAuthor] = useState(null);
  const { id } = useParams(); // Retrieve the id from the URL

  function getAuthor() {
    viewAuthor(id) // Pass the id as a parameter
      .then((response) => {
        setAuthor(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (id) {
      getAuthor();
    }
  }, []);

  // Todo
  return (
    <>
      <div></div>
    </>
  );
}

export default AuthorDetailPage;
