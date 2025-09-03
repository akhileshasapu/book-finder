import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookModal from "../components/BookModal";
import { useBooks } from "../hooks/useBooks";

function Home() {
  // Pull global state & setters from context
  const { setBooks, setLoading, query, page } = useBooks();

  // Effect runs whenever query or page changes
  useEffect(() => {
    if (!query) return; // Do nothing if search query is empty

    // Async function to fetch books from OpenLibrary API
    const fetchBooks = async () => {
      setLoading(true); // Show loader while fetching

      try {
        // Call OpenLibrary search API with encoded query + page number
        const res = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(
            query.trim()
          )}&page=${page}`
        );

        const data = await res.json();

        // If loading next page → append results
        if (page > 1) {
          setBooks((prev) => [...prev, ...data.docs]);
        } else {
          // If first page → replace results
          setBooks(data.docs);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        // Always stop loading state after API call (success or fail)
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, page, setBooks, setLoading]); 
  // dependencies: re-run if query or page changes

  return (
    <div>
      {/* Search input + button */}
      <SearchBar />

      {/* Book details modal (opens when a book is selected) */}
      <BookModal />
    </div>
  );
}

export default Home;
