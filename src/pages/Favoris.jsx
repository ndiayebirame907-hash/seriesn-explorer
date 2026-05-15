import { useNavigate } from "react-router-dom";
import { useFavoris } from "../context/FavorisContext";
import SerieCard from "../components/SerieCard";

export default function Favoris() {
  const { favoris } = useFavoris();
  const navigate    = useNavigate();

  return (
    <main className="favoris-page">
      <div className="favoris-header">
        <h1 className="favoris-title">❤️ Mes Séries Favorites</h1>
        <p className="favoris-subtitle">
          {favoris.length > 0
            ? `${favoris.length} série${favoris.length > 1 ? "s" : ""} dans votre liste`
            : "Votre liste de favoris"}
        </p>
      </div>

      {favoris.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🌟</span>
          <h2>Votre liste est vide !</h2>
          <p>Explorez le catalogue et cliquez sur ❤️ pour sauvegarder vos séries préférées.</p>
          <button className="btn-voir-plus" onClick={() => navigate("/")} style={{ marginTop: "1.5rem" }}>
            🎬 Découvrir les séries
          </button>
        </div>
      ) : (
        <div className="series-grid">
          {favoris.map((serie) => <SerieCard key={serie.id} serie={serie} />)}
        </div>
      )}
    </main>
  );
}
