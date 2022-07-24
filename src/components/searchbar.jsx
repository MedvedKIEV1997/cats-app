import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ReactComponent as Search } from "../assets/search.svg";

const Searchbar = () => {
  return (
    <TextField
      fullWidth
      id="input-with-icon-textfield"
      label="Search for breeds by name"
      InputLabelProps={{ shrink: false }}
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
