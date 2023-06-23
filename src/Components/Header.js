import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: "#232F3D" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <LocalLibraryIcon />
          </Typography>
          <Typography> Book Spot </Typography>

          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            // value = {1}

            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/add_book" label="Add Book" />
            <Tab LinkComponent={Link} to="/books" label=" Books " />
            <Tab LinkComponent={Link} to="/signup" label="Signup" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;



