import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trending from "./components/trending/Trending";
import Movies from "./components/movies/Movies";
import Series from "./components/series/Series";
import Search from "./components/search/Search";
import DownMenu from "./components/footer/DownMenu";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route exact path="/" element={<Trending />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/series" element={<Series />} />
              <Route exact path="/search" element={<Search />} />
            </Routes>
          </Container>
        </div>
        <DownMenu />
      </Router>
    </>
  );
}

export default App;
