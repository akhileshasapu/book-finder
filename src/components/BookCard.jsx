import React, { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks";

function BookCard({ book }) {
  const { setSelectedBook } = useBooks(); 
  // 👉 This lets us update the "selectedBook" in global state 
  // when the user clicks a book card (so modal can open).

  // Local state for book cover image
  const [coverUrl, setCoverUrl] = useState(
    "https://via.placeholder.com/150x200?text=No+Cover"
  );

  useEffect(() => {
    // ⚠️ PROBLEM:
    // Loading images directly from OpenLibrary in StackBlitz causes CORS/CORP errors.
    //
    // ✅ SOLUTION:
    // Fetch the image as a blob, then convert it into a safe local object URL.
    if (book.cover_i) {
      const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          setCoverUrl(URL.createObjectURL(blob)); // safe local URL
        })
        .catch(() => {
          setCoverUrl("https://via.placeholder.com/150x200?text=No+Cover");
        });
    }
  }, [book.cover_i]);

  return (
    <div
      onClick={() => setSelectedBook(book)} // open modal with this book
      className="cursor-pointer bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Book cover */}
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden rounded-t-xl">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Book details */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {book.author_name?.[0] || "Unknown Author"}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          First published: {book.first_publish_year || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
