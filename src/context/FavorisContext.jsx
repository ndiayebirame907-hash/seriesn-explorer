import { createContext, useContext, useState, useEffect } from "react";

const FavorisContext = createContext();

export function FavorisProvider({ children }) {
  const [favoris, setFavoris] = useState(() => {
    try {
      const stored = localStorage.getItem("seriesn_favoris");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("seriesn_favoris", JSON.stringify(favoris));
  }, [favoris]);

  function toggleFavori(serie) {
    setFavoris((prev) =>
      prev.some((f) => f.id === serie.id)
        ? prev.filter((f) => f.id !== serie.id)
        : [...prev, serie]
    );
  }

  function isFavori(id) {
    return favoris.some((f) => f.id === id);
  }

  return (
    <FavorisContext.Provider value={{ favoris, toggleFavori, isFavori }}>
      {children}
    </FavorisContext.Provider>
  );
}

export function useFavoris() {
  return useContext(FavorisContext);
}
