import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SingleContent from "../../components/singleContent/SingleContent";

import { Box } from "@mui/material";
import CustomPagination from "../pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [trendingContent, setTrendingContent] = useState([]);

  const API_KEY = "68c3ad2897ef4acd7987e0e9218396c0";
  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      );

      setTrendingContent(data.results);
    } catch (error) {
      console.error("Error fetching trending content api:", error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);
  return (
    <>
      <h1 className="pageTitle">Trending Today</h1>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 3,
          padding: 2,

          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {trendingContent &&
          trendingContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </Box>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
