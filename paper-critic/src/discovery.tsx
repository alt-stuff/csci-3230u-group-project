import { useEffect, useState } from "react";
import BookSection from "./components/book-section/book-section";
import { Book } from "./concept/book";

function parseBooks(value: unknown): Book[] {
  if (!Array.isArray(value)) {
    throw new TypeError("Book API response must be an array.");
  }

  return value.map((book) => Book.fromJSON(book));
}

export default function Discovery({query=""}: {query?: string}) {
  const [topPicks, setTopPicks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      try {
        setIsLoading(true);
        setError(null);

        if(query){
          const response = await fetch(
            "/api/search?q="+ encodeURIComponent(query),
            {signal: controller.signal}
          );
          if(!response.ok){
            throw new Error("Unable to search for books.");
          }

          const data = await response.json();
          if(controller.signal.aborted) return;
          setSearchResults(parseBooks(data));
          return;
        }

        const [recommendedResponse, handpickedResponse] = await Promise.all([
          fetch("/api/recommended", { signal: controller.signal }),
          fetch("/api/handpicked", { signal: controller.signal }),
        ]);

        if (!recommendedResponse.ok || !handpickedResponse.ok) {
          throw new Error("Unable to load books from the server.");
        }

        const [recommendedData, handpickedData]: [unknown, unknown] = await Promise.all([
          recommendedResponse.json(),
          handpickedResponse.json(),
        ]);

        setTopPicks(parseBooks(recommendedData));
        setFavorites(parseBooks(handpickedData));
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load books.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadBooks();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      {isLoading && <p>Loading books...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && (
        query? (
          <>
            <BookSection id="search-results" title="Search results" books={searchResults} />
            {searchResults.length === 0 && (<p>No books found.</p>)}
          </> ) : (
            <>
            <BookSection id="top-picks" title="Top picks" books={topPicks} />
            <BookSection id="favorites" title="Our Favourites" books={favorites} />
            
          </>
        )
      )}
    </>
  );
}