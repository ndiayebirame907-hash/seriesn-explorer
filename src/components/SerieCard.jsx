import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { useFavoris } from "../context/FavorisContext";

export default function SerieCard({ serie }) {
  const navigate = useNavigate();
  const { isFavori, toggleFavori } = useFavoris();
  const favori = isFavori(serie.id);

  return (
    <article
      className="serie-card"
      onClick={() => navigate(`/serie/${serie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/serie/${serie.id}`)}
    >
      <div className="card-img-wrapper">
        <img
          src={serie.image}
          alt={`Affiche de ${serie.titre}`}
          className="card-img"
          loading="lazy"
          onError={(e) => { e.target.src = "https://picsum.photos/seed/default/300/450"; }}
        />
        {serie.enCours && <span className="badge-en-cours">🎬 En cours</span>}
        <button
          className={`btn-favori ${favori ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavori(serie); }}
          aria-label={favori ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {favori ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-titre">{serie.titre}</h3>
        <div className="card-meta">
          <span className="card-chaine">{serie.chaine}</span>
          <span className="card-annee">{serie.annee}</span>
        </div>
        <StarRating note={serie.note} />
        <div className="card-genres">
          {serie.genre.map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
