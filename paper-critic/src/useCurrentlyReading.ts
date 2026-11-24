import { useEffect, useState } from "react";

export default function useCurrentlyReading() {
  const [currentlyReading, setCurrentlyReading] = useState<string[]>(() => {
    const saved = localStorage.getItem("currentlyReading");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleCurrentlyReading(isbn: string) {
    setCurrentlyReading((previousBooks) => {
      if (previousBooks.includes(isbn)) {
        return previousBooks.filter((id) => id !== isbn);
      }

      return [...previousBooks, isbn];
    });
  }

  useEffect(() => {
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
  }, [currentlyReading]);

  return { currentlyReading, toggleCurrentlyReading };
}