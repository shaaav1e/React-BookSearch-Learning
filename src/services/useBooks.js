import { useEffect, useState } from "react";
import fetchBooks from "./api-client";
function useBooks(initialQuery) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    async function fetchBooksData(query) {
      setLoading(true);
      try {
        const items = await fetchBooks(query, controller);
        setBooks(items);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch Books:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm) {
      fetchBooksData(searchTerm);
    }
    // return () => {
    //   controller.abort();
    // };
  }, [searchTerm]);

  return { books, loading, setSearchTerm };
}

export default useBooks;
