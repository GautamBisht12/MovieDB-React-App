import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SingleContent from "../../components/singleContent/SingleContent";
import { Box } from "@mui/material";
import CustomPagination from "../pagination/CustomPagination";
import Genre from "../genre/Genre";
import useGenres from "../../hooks/useGenres";

const Series = () => {
  const [page, setPage] = useState(1);
  const [seriesContent, setSeriesContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreforURL = useGenres(selectedGenres);

  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const fetchSeries = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}&with_genres=${genreforURL}`
      );
      console.log(data);
      setSeriesContent(data.results);
      setNoOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching series content:", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, [page, genreforURL]);
  return (
    <>
      <h1 className="pageTitle">Series</h1>
      <Genre
        type="tv"
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
        {seriesContent &&
          seriesContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
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

export default Series;
