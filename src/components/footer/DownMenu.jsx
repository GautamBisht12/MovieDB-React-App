import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { MovieCreation, Whatshot, Tv, Search } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BottomNav = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: #22092c;
`;

const BottomIcon = styled(BottomNavigationAction)(({ theme }) => ({
  color: "white",
  "&.Mui-selected": {
    color: "skyblue",
  },
}));

const DownMenu = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <Box>
      <BottomNav
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomIcon label="Trending" icon={<Whatshot />} />

        <BottomIcon label="Movies" icon={<MovieCreation />} />

        <BottomIcon label="Tv series" icon={<Tv />} />

        <BottomIcon label="Search" icon={<Search />} />
      </BottomNav>
    </Box>
  );
};

export default DownMenu;
