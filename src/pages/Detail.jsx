import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import seriesData from "../data/series.json";
import StarRating from "../components/StarRating";
import Loader from "../components/Loader";
import { useFavoris } from "../context/FavorisContext";

export default function Detail() {
  const { id }                     = useParams();
  const navigate                   = useNavigate();
  const { isFavori, toggleFavori } = useFavoris();
  const [serie, setSerie]          = useState(null);
  const [loading, setLoading]      = useState(true);
  const [erreur, setErreur]        = useState(false);
  const [note, setNote]            = useState(null);

  useEffect(() => {
    setLoading(true); setErreur(false);
    const timer = setTimeout(() => {
      const found = seriesData.find((s) => s.id === parseInt(id));
      if (found) {
        setSerie(found);
        const saved = localStorage.getItem(`seriesn_note_${found.id}`);
        setNote(saved ? parseFloat(saved) : found.note);
      } else {
        setErreur(true);
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  function handleNote(n) {
    setNote(n);
    localStorage.setItem(`seriesn_note_${serie.id}`, n);
  }

  if (loading) return <Loader />;

  if (erreur) return (
    <div className="error-page">
      <span className="error-icon">🎬</span>
      <h2>Série introuvable</h2>
      <p>La série <strong>#{id}</strong> n'existe pas dans notre catalogue.</p>
      <button className="btn-retour" onClick={() => navigate("/")}>← Retour au catalogue</button>
    </div>
  );

  const favori = isFavori(serie.id);

  return (
    <main className="detail-page">
      <button className="btn-retour" onClick={() => navigate(-1)}>← Retour</button>

      <div className="detail-container">
        <aside className="detail-aside">
          <img src={serie.image} alt={serie.titre} className="detail-img"
            onError={(e) => { e.target.src = "https://picsum.photos/seed/default/300/450"; }} />
          <button className={`btn-favori-detail ${favori ? "active" : ""}`} onClick={() => toggleFavori(serie)}>
            {favori ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
          </button>
          <div className="detail-note-section">
            <p className="note-label">Votre note :</p>
            <StarRating note={note} editable={true} onChange={handleNote} />
          </div>
        </aside>

        <section className="detail-info">
          <div className="detail-header">
            <h1 className="detail-titre">{serie.titre}</h1>
            {serie.enCours && <span className="badge-en-cours">🎬 En cours</span>}
          </div>

          <div className="detail-meta-grid">
            <div className="meta-item"><span className="meta-key">📺 Chaîne</span><span className="meta-val">{serie.chaine}</span></div>
            <div className="meta-item"><span className="meta-key">📅 Année</span><span className="meta-val">{serie.annee}</span></div>
            <div className="meta-item"><span className="meta-key">🎞️ Saisons</span><span className="meta-val">{serie.saisons} saison{serie.saisons > 1 ? "s" : ""}</span></div>
            <div className="meta-item"><span className="meta-key">⭐ Note</span><span className="meta-val">{serie.note} / 5</span></div>
          </div>

          <div className="detail-section">
            <h3 className="section-label">Genres</h3>
            <div className="card-genres">
              {serie.genre.map((g) => <span key={g} className="genre-tag">{g}</span>)}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-label">Synopsis</h3>
            <p className="detail-synopsis">{serie.synopsis}</p>
          </div>

          <div className="detail-section">
            <h3 className="section-label">Acteurs principaux</h3>
            <div className="acteurs-list">
              {serie.acteurs.map((acteur) => (
                <div key={acteur.nom} className="acteur-card">
                  <img
                    src={acteur.photo}
                    alt={acteur.nom}
                    className="acteur-photo"
                    onError={(e) => { e.target.src = "/images/acteurs/default.png"; }}
                  />
                  <span className="acteur-nom">{acteur.nom}</span>
                  {acteur.role && <span className="acteur-role">{acteur.role}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
