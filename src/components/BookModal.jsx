import React, { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks";

function BookModal() {
  const { selectedBook, setSelectedBook } = useBooks();

  // If no book is selected, don't render anything
  if (!selectedBook) return null;

  // Local state for the cover image (default placeholder)
  const [coverUrl, setCoverUrl] = useState(
    "https://via.placeholder.com/200x300?text=No+Cover"
  );

  // ⚠️ PROBLEM:
  // Directly loading OpenLibrary cover images in StackBlitz triggers a CORP (Cross-Origin-Resource-Policy) error.
  // This happens because the image server does not allow embedding from certain sandboxes.
  //
  // ✅ SOLUTION:
  // Fetch the image as a Blob and convert it into a local object URL (safe for embedding).
  useEffect(() => {
    if (selectedBook.cover_i) {
      const url = `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`;

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          setCoverUrl(URL.createObjectURL(blob));
        })
        .catch(() => {
          setCoverUrl("https://via.placeholder.com/200x300?text=No+Cover");
        });
    }
  }, [selectedBook.cover_i]);

  // Build Google search query with title + author(s)
  const query = encodeURIComponent(
    `${selectedBook.title} by ${selectedBook.author_name?.join(", ") || ""}`
  );
  const googleSearchUrl = `https://www.google.com/search?q=${query}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 lg:h-2/3 md:h-2/4 sm:h-2/4 relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        {/* Book cover */}
        <img
          src={coverUrl}
          alt={selectedBook.title}
          className="w-full h-64 object-contain rounded-md mb-4 mt-2"
        />

        {/* Book details */}
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
