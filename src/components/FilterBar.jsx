export default function FilterBar({ genres, chaines, genreActif, chaineActive, onGenre, onChaine }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Genre :</span>
        <div className="filter-buttons">
          <button className={`filter-btn ${genreActif === "" ? "active" : ""}`} onClick={() => onGenre("")}>Tous</button>
          {genres.map((g) => (
            <button key={g} className={`filter-btn ${genreActif === g ? "active" : ""}`} onClick={() => onGenre(g)}>{g}</button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Chaîne :</span>
        <select className="filter-select" value={chaineActive} onChange={(e) => onChaine(e.target.value)}>
          <option value="">Toutes les chaînes</option>
          {chaines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
