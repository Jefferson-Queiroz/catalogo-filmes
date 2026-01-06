import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListMovies from "./pages/ListMovies";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListMovies />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
