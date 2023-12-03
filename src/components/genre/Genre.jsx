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

  const API_KEY = "68c3ad2897ef4acd7987e0e9218396c0";
  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
      );
      console.log(data);
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching Genres Api");
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
