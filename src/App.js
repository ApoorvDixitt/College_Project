import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-6 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-600">
                Recipe Finder App &copy; {new Date().getFullYear()} - Find and
                save your favorite recipes
              </p>
            </div>
          </footer>
          <ScrollToTop />
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
