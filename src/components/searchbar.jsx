import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "../assets/search.svg";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      value={search}
      onChange={handleChangeSearch}
      label="Search for breeds by name"
      sx={{
        height: "60px",
        justifyContent: "center",
        borderRadius: "20px",
        fontSize: "2rem",
        bgcolor: "primary.main",
        color: "text.disabled",
        transition: "outline-color 0.3s",
        outline: "#fff solid 2px",
        "& label": {
          fontSize: "2rem",
          color: "text.disabled",
        },
        "& label.Mui-focused": {
          display: "none",
        },
        "& label.MuiInputLabel-shrink": {
          display: "none",
        },

        "&:hover, &:focus ": {
          outlineStyle: " solid ",
          outlineWidth: 2,
          outlineColor: "#FBE0DC",
        },
        "&:active ": {
          outlineStyle: " solid ",
          outlineWidth: 2,
          outlineColor: "#FF868E",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              component={Link}
              to={`/search?name=${search}`}
              edge="end"
              sx={{
                bgcolor: "primary.dark",
                padding: "10px",
                borderRadius: "10px",
                marginRight: "1px",
              }}
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Searchbar;
