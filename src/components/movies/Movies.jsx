import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomPagination from "../pagination/CustomPagination";
import SingleContent from "../../components/singleContent/SingleContent";
import Genre from "../genre/Genre";
import useGenres from "../../hooks/useGenres";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [movieContent, setMovieContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState();
  const genreforURL = useGenres(selectedGenres);

  const API_KEY = "68c3ad2897ef4acd7987e0e9218396c0";
  const fetchMovie = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=${API_KEY}&page=${page}&with_genres=${genreforURL}`
      );
      console.log(data);
      setMovieContent(data.results);
      setNoOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching movie content:", error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovie();
    
  }, [genreforURL, page]);
  return (
    <>
      <h1 className="pageTitle">Movies</h1>
      <Genre
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
        genres={genres}
        setGenres={setGenres}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 3,
          padding: 2,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {movieContent &&
          movieContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </Box>
      {noOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={noOfPages} />
      )}
    </>
  );
};

export default Movies;
