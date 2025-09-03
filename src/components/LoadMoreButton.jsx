import React from "react";
import { useBooks } from "../hooks/useBooks";

function LoadMoreButton({ fetchMore }) {
  const { books } = useBooks();

  if (books.length === 0) return null;

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={fetchMore}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Load More
      </button>
      {/* You search → API returns first 10 books → state updates.

        LoadMoreButton sees that books.length > 0 → button appears.

        User clicks Load More → fetchMore() runs → gets next page → appends books to list. */}
    </div>
  );
}

export default LoadMoreButton;
