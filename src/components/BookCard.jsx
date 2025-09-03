import React from "react";
import { useBooks } from "../hooks/useBooks";

function BookCard({ book }) {
  const { setSelectedBook } = useBooks();
  // This allows the card to update the globally selected book when clicked (useful for opening a modal with extra details).

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";
  // If the API response has a cover_i (OpenLibrarys cover image ID), build the cover image URL.
  // If not, fall back to a placeholder image (No Cover).

  return (
    <div
      onClick={() => setSelectedBook(book)}
      className="cursor-pointer bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden rounded-t-xl">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-contain"
        />
      </div>
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
