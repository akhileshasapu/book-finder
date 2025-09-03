import { useContext } from "react";
import { BookContext } from "../context/BookContext";

//  helper hook to access context easily
export const useBooks = () => {
  return useContext(BookContext);
};
// Custom Hook 
// Instead of calling useContext(BookContext) everywhere, you wrap it in your own hook.
// Abstraction: Components don’t need to know which context you’re using, they just use the hook.