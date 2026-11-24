import { useEffect, useState } from "react";

export default function useCompleted() {
  const [completed, setCompleted] = useState<string[]>(() => {
    const saved = localStorage.getItem("completed");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleCompleted(isbn: string) {
    setCompleted((previousBooks) => {
      if (previousBooks.includes(isbn)) {
        return previousBooks.filter((id) => id !== isbn);
      }

      return [...previousBooks, isbn];
    });
  }

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  return { completed, toggleCompleted };
}