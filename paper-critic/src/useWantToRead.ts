import { useEffect, useState } from "react";


export default function useWantToRead() {
    
  const [wantToRead, setWantToRead] = useState<string[]>(() => {
    const saved = localStorage.getItem("wantToRead");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleWantToRead(isbn: string) {
    setWantToRead((previousBooks) => {
      if (previousBooks.includes(isbn)) {
        return previousBooks.filter((id) => id !== isbn);
      }

      return [...previousBooks, isbn];
    });
  }

  useEffect(() => {
    localStorage.setItem("wantToRead", JSON.stringify(wantToRead));
  }, [wantToRead]);

  return { wantToRead, toggleWantToRead };
}

