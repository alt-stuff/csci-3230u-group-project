import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(isbn: string) {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(isbn)) {
        return previousFavorites.filter((id) => id !== isbn);
      }

      return [...previousFavorites, isbn];
    });
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, toggleFavorite };
}