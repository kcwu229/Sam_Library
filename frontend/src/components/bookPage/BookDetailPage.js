import { useEffect, useState } from "react";
import { viewBook } from "../../services/BookServices";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import BlockQuote from "../atoms/BlockQuote";

function BookDetailPage() {
  const [book, setBook] = useState(null);
  const { id } = useParams(); // Retrieve the id from the URL

  function getBook() {
    viewBook(id) // Pass the id as a parameter
      .then((response) => {
        setBook(response.data);
        console.log("Book detail obj" + response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (id) {
      getBook();
    }
  }, [id]);

  // Todo
  return (
    <div className="w-full pt-32">
      {/* hyperlink */}
      <div className="flex items-center text-left pt-4 ml-16">
        <a href="/books" className="font-light">
          Book
        </a>{" "}
        <FaChevronRight className="w-3 h-3 ml-2 font-light" />
        {book && (
          <a href="#" className="ml-2 font-light">
            {book.name}
          </a>
        )}
      </div>
      <br />

      {/* Heading */}
      <h1 className="font-bold text-2xl mt-2 ml-16 md:flex-nowrap">
        Meet the Book: A Journey Through Words
      </h1>
      <div className="flex items-center w-full mt-10 flex-col md:flex-row">
        <div className="w-5/12 h-80 md:ml-16">
          {book && (
            <img
              className="md:w-8/12 w-full"
              src={`${process.env.REACT_APP_BASE_URL}/Books/${book.imageName}.png`}
              alt="Book image"
            ></img>
          )}
        </div>

        {/* Birth Year to Death */}
        <div className="w-7/12 h-80 mr-20">
          <hr className="bg-black text-black h-1 border-0"></hr>
          <div className="w-full md:flex hidden mt-8">
            {book && (
              <div
                className="w-3/12 text-sam-black border 
                border-black rounded-3xl px-5 py-2 text-center 
              items-center mr-4 relative
              justify-center
              md:flex"
              >
                {book.publishedYear ? book.publishedYear : "Unknown"}
              </div>
            )}
            <br />

            {/* Isbn */}
            {book && (
              <div
                className="w-3/12 text-sam-black border border-black 
                rounded-3xl px-5 py-2 text-center 
              items-center mr-4 relative
              justify-center
              md:flex"
              >
                <p className="">{book.isbn}</p>
              </div>
            )}
          </div>
          {/* Title */}
          {book && (
            <h1 className="text-4xl font-bold mt-10 tracking-wide">
              {book.title}
            </h1>
          )}
          <br />
          {/* Block Quote */}
          {book && (
            <BlockQuote className="w-full" text={book && book.catchPhrase} />
          )}
          {/* Author */}
          <div className="flex-col">
            <p>
              <b className="text-2xl block mt-10">Author</b>
            </p>
            <p className="block mt-4 font-light tracking-widest leading-loose">
              {book && book.author}
            </p>
          </div>
          {/* Descrition */}
          <div className="flex-col">
            <p>
              <b className="text-2xl block mt-10">Description</b>
            </p>
            <p className="block mt-4 font-light tracking-widest leading-loose">
              {book && book.bookDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full mt-20 h-96"></div>
      <div className="flex items-center w-full mt-20 h-20"></div>
      <div className="flex items-center w-full mt-20 h-20"></div>
    </div>
  );
}

export default BookDetailPage;
