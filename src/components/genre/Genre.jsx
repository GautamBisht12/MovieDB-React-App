/* eslint-disable react/prop-types */
import { Box, Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genre = ({
  selectedGenres,
  setSelectedGenres,
  // eslint-disable-next-line react/prop-types
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
      );
      console.log(data);
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching Genres");
    }
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Box>
        {selectedGenres &&
          selectedGenres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              style={{ margin: 3, backgroundColor: "#22092C", color: "white" }}
              clickable
              onDelete={() => handleRemove(genre)}
              color="primary"
            />
          ))}
        {Array.isArray(genres) && genres.length > 0 ? (
          genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              style={{ margin: 3, backgroundColor: "#BE3144", color: "white" }}
              clickable
              onClick={() => handleAdd(genre)}
            />
          ))
        ) : (
          <p>No genres available</p>
        )}
      </Box>
    </>
  );
};

export default Genre;