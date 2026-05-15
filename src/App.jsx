import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavorisProvider } from "./context/FavorisContext";
import { ThemeProvider }   from "./context/ThemeContext";
import Navbar   from "./components/Navbar";
import Accueil  from "./pages/Accueil";
import Detail   from "./pages/Detail";
import Favoris  from "./pages/Favoris";
import "./index.css";

export default function App() {
  return (
    <ThemeProvider>
      <FavorisProvider>
        <BrowserRouter>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/"          element={<Accueil />} />
              <Route path="/serie/:id" element={<Detail />}  />
              <Route path="/favoris"   element={<Favoris />} />
              <Route path="*" element={
                <div className="error-page">
                  <span className="error-icon">🔍</span>
                  <h2>Page introuvable (404)</h2>
                  <a href="/" className="btn-retour">← Retour à l'accueil</a>
                </div>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </FavorisProvider>
    </ThemeProvider>
  );
}
