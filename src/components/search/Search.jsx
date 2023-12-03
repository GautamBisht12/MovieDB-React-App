import { Search as Searchicon } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../pagination/CustomPagination";
import SingleContent from "../singleContent/SingleContent";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const API_KEY = "68c3ad2897ef4acd7987e0e9218396c0";
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log("error in fetching Search Api");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);
  return (
    <>
      <Box style={{ display: "flex", marginTop: "30px" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            style: {
              color: "white", // Set text color to white
            },
          }}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 20 }}
          onClick={fetchSearch}
        >
          <Searchicon />
        </Button>
      </Box>

      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{
          padding: "5 0",
          margin: "30px",
        }}
      >
        <Tab
          style={{ width: "50%", color: "white" }}
          label="Search Movies"
        ></Tab>
        <Tab
          style={{ width: "50%", color: "white" }}
          label="Search Tv Series"
        ></Tab>
      </Tabs>
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
        {content.length > 0 &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        <div style={{ marginTop: "50px" }}>
          {content.length === 0 && searchText !== 0 ? (
            type ? (
              <h2>No Series Found </h2>
            ) : (
              <h2>No Movies Found</h2>
            )
          ) : null}
        </div>
      </Box>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Search;
