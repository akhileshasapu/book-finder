import React, { useState, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";

function SearchBar() {
  // Global state from context (used to update search query and reset results)
  const { setQuery, setBooks, setPage } = useBooks();

  // Local state for input value
  const [inputValue, setInputValue] = useState(""); 
  // State to enable/disable the Search button
  const [isdisable, setIsdisable] = useState(true);

  // Watch input value and disable button if empty
  useEffect(() => {
    setIsdisable(!inputValue.trim());
  }, [inputValue]);

  // Debounce logic: wait 500ms after typing stops before firing search
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only set query if input has at least 4 characters
      if (inputValue.trim().length > 3) {
        setQuery(inputValue.trim());
      }
      // Reset results + pagination whenever query changes
      setBooks([]);
      setPage(1);
    }, 500);

    // Cleanup: cancel the timeout if user types again quickly
    return () => clearTimeout(handler);
  }, [inputValue, setQuery, setBooks, setPage]);

  // Manual search trigger on form submit (e.g., pressing Enter or clicking Search)
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue.trim()); 
    setBooks([]);
    setPage(1);
  };

  return (
    <div className="relative flex justify-center px-2">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col sm:flex-row 
          w-full sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2
        "
      >
        {/* Input field for typing book name */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search books by title..."
          className="
            w-full p-2 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none
            border border-gray-300 focus:outline-none
          "
        />

        {/* Search button (disabled until user types something) */}
        <button
          disabled={isdisable}
          type="submit"
          className={`
            px-4 py-2 text-white 
            rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none
            ${isdisable ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
