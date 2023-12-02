import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const headerStyle = {
    backgroundColor: "#22092c",
    position: "fixed",
    zIndex: 100,
    textAlign: "center",
  };

  const titleStyle = {
    flexGrow: 1,
    margin: 20,
  };

  const top = () => {
    window.scroll(0, 0);
  };

  return (
    <AppBar onClick={() => top()} position="static" style={headerStyle}>
      <Toolbar>
        <Typography variant="h4" style={titleStyle}>
          MovieDB Pro
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
