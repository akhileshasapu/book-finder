import React from "react";
import { useBooks } from "../hooks/useBooks";

function BookModal() {
  const { selectedBook, setSelectedBook } = useBooks();

  if (!selectedBook) return null;

  const coverUrl = selectedBook.cover_i
    ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  // Build Google search query with title + author(s)
const query = encodeURIComponent(
  `${selectedBook.title} by ${selectedBook.author_name?.join(", ") || ""}`
);
const googleSearchUrl = `https://www.google.com/search?q=${query}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 lg:h-2/3 md:h-2/4 sm:h-2/4 relative shadow-2xl">
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        
        <img
          src={coverUrl}
          alt={selectedBook.title}
          className="w-full h-64 object-contain rounded-md mb-4 mt-2"
        />
        <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
        <p className="text-gray-700">
          Author: {selectedBook.author_name?.join(", ") || "Unknown"}
        </p>
        <p className="text-gray-600">
          First Published: {selectedBook.first_publish_year || "N/A"}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Edition Count: {selectedBook.edition_count || "N/A"}
        </p>

        {/* Google search link */}
        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 hover:underline font-medium"
        >
          🔎 Know more
        </a>
      </div>
    </div>
  );
}

export default BookModal;
