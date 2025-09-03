import React, { createContext, useState } from "react";

// Create context
// This creates a Context object.
// Context lets you share state across components without having to pass props down manually at every level.
export const BookContext = createContext();

// Provider to wrap app
// This is a provider component that will wrap the app 
// It makes the book-related state (books, loading, etc.) and functions (fetchBooks) available to all child components.
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); // pagination
  const [selectedBook, setSelectedBook] = useState(null); // modal
// books → stores the list of books fetched from the OpenLibrary API.
// loading → boolean that tracks whether data is being fetched (loading text).
// query → the search term entered by the user.
// page → current page of search results (OpenLibrary API supports pagination).
// selectedBook → stores a single book object when a user clicks (for more details view).

return (
    <BookContext.Provider   
      value={{
        books,
        setBooks,
        loading,
        setLoading,
        query,
        setQuery,
        page,
        setPage,
        selectedBook,
        setSelectedBook,
      }}
    >
        {/*  Context is just a state container (books, query, loading, etc.).
             The component itself handles fetching using the setters from context. */}

          {/*   Context stays “dumb” , only cares about data, not business logic.
                Components have more control (e.g Home can fetch differently than Bookmodel component (imp)).
                Easier testing : you can test fetching logic in the component without mocking context. */}
      {children}
    </BookContext.Provider>
  );
};
