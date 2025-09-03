import React from "react";
import Home from "./pages/Home";
import { useBooks } from "./hooks/useBooks";
import Loader from "./components/Loader";
import LoadMoreButton from "./components/LoadMoreButton";
import BookCard from "./components/BookCard";

function App() {
  // Pull global state from context (books, loading, query, page setter)
  const { books, loading, query, setPage } = useBooks();

  // Handles "Load More" pagination
  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
      {/* ---------------- HEADER ---------------- */}
      <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg flex flex-col items-center justify-center py-10">
        
        {/* App Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-6 flex items-center gap-2 text-center px-4">
          📚 <span>Book Finder</span>
        </h1>

        {/* Search Bar (centered, responsive width) */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl shadow-lg p-2 max-w-3xl mx-auto">
            <Home /> {/* Home contains SearchBar + BookModal */}
          </div>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 mt-6 sm:mt-10 md:mt-16 lg:mt-4 px-4 sm:px-6 lg:px-8">
        {/* Loader while fetching */}
        {loading && <Loader />}

        {/* No results found */}
        {!loading && books.length === 0 && query && (
          <p className="text-center text-gray-600 mt-4">No books found</p>
        )}

        {/* Books Grid */}
        {query && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {books.map((book, idx) => (
              <BookCard key={idx} book={book} />
            ))}
          </div>
        )}

        {/* Load More button (pagination) */}
        {books.length > 0 && (
          <div className="flex justify-center mt-6">
            <LoadMoreButton fetchMore={handleLoadMore} />
          </div>
        )}
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="text-center py-4 text-sm text-gray-500 bg-gray-100 mt-auto">
        Made with ❤️ using Open Library API
      </footer>
    </div>
  );
}

export default App;
