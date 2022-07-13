import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import React from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as Search } from "../assets/search.svg";

const Searchbar = () => {
  return (
    <Stack flex={1} p={3}>
      <TextField
        id="input-with-icon-textfield"
        label="Search for breeds by name"
        sx={{
          borderRadius: "20px",
          bgcolor: "primary.main",
          color: "text.disabled",
          "& label, & label.Mui-focused": { color: "text.disabled" },

          "&.Mui-focused, &:active ": {
            bgcolor: "primary.main",
          },
          "&.MuiOutlinedInput-notchedOutline": {},
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

      <Outlet />
    </Stack>
  );
};

export default Searchbar;
