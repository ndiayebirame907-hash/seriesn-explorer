import { useState, useMemo } from "react";
import seriesData from "../data/series.json";
import SerieCard from "../components/SerieCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

const PAR_PAGE = 8;

export default function Accueil() {
  const [recherche, setRecherche]       = useState("");
  const [genreActif, setGenreActif]     = useState("");
  const [chaineActive, setChaineActive] = useState("");
  const [page, setPage]                 = useState(1);

  const genres = useMemo(() => [...new Set(seriesData.flatMap((s) => s.genre))].sort(), []);
  const chaines = useMemo(() => [...new Set(seriesData.map((s) => s.chaine))].sort(), []);

  const seriesFiltrees = useMemo(() => {
    return seriesData.filter((s) => {
      const matchRecherche = s.titre.toLowerCase().includes(recherche.toLowerCase());
      const matchGenre = genreActif === "" || s.genre.includes(genreActif);
      const matchChaine = chaineActive === "" || s.chaine === chaineActive;
      return matchRecherche && matchGenre && matchChaine;
    });
  }, [recherche, genreActif, chaineActive]);

  const total      = seriesFiltrees.length;
  const seriesPage = seriesFiltrees.slice(0, page * PAR_PAGE);
  const hasMore    = seriesPage.length < total;

  function reset() {
    setRecherche(""); setGenreActif(""); setChaineActive(""); setPage(1);
  }

  return (
    <main className="accueil">
      <section className="hero">
        <h1 className="hero-title">🇸🇳 Découvrez les Séries Sénégalaises</h1>
        <p className="hero-subtitle">Explorez le meilleur de la production télévisuelle du Sénégal</p>
      </section>

      <section className="search-section">
        <SearchBar value={recherche} onChange={(v) => { setRecherche(v); setPage(1); }} />
      </section>

      <FilterBar
        genres={genres} chaines={chaines}
        genreActif={genreActif} chaineActive={chaineActive}
        onGenre={(g) => { setGenreActif(g); setPage(1); }}
        onChaine={(c) => { setChaineActive(c); setPage(1); }}
      />

      <div className="results-count">
        <span>{total === 0 ? "Aucune série trouvée" : `${total} série${total > 1 ? "s" : ""} trouvée${total > 1 ? "s" : ""}`}</span>
        {(recherche || genreActif || chaineActive) && (
          <button className="reset-filters" onClick={reset}>✕ Réinitialiser</button>
        )}
      </div>

      {total === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎬</span>
          <p>Aucune série ne correspond à votre recherche.</p>
        </div>
      ) : (
        <>
          <div className="series-grid">
            {seriesPage.map((serie) => <SerieCard key={serie.id} serie={serie} />)}
          </div>
          {hasMore && (
            <div className="voir-plus-wrapper">
              <button className="btn-voir-plus" onClick={() => setPage((p) => p + 1)}>
                Voir plus ({total - seriesPage.length} restante{total - seriesPage.length > 1 ? "s" : ""})
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
