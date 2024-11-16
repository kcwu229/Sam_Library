import { showBooks } from "../services/BookServices";
import { useEffect, useState } from "react";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await showBooks();
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8">Books</h1>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Borrow
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookPage;
