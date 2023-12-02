import { Box, Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ setPage, numOfPages = 100 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={numOfPages}
          hidePrevButton
          hideNextButton
          onChange={(e) => handlePageChange(e.target.textContent)}
          sx={{
            "& .MuiPaginationItem-root": {
              fontFamily: "Arial",
              fontSize: "16px",
              color: "#22092c",
            },
            "& .Mui-selected": {
              backgroundColor: "#be3144",
              color: "#fff",
            },
          }}
        />
      </Box>
    </>
  );
};

export default CustomPagination;
