import { Stack } from "@mui/material";
import { ReactComponent as Smile } from "../assets/smile.svg";
import { ReactComponent as Sad } from "../assets/sad.svg";
import { ReactComponent as Like } from "../assets/like.svg";

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import CustomIconButton from "./customIconButton";
import Searchbar from "./searchbar";

const Layout = () => {
  return (
    <Stack flex={1} p={3}>
      <Stack direction="row" spacing={1} pb={3}>
        <Searchbar />
        <CustomIconButton
          sx={{
            width: "60px",
          }}
          component={NavLink}
          to="/likes"
        >
          <Smile />
        </CustomIconButton>
        <CustomIconButton
          sx={{
            width: "60px",
          }}
          component={NavLink}
          to="/favorites"
        >
          <Like />
        </CustomIconButton>
        <CustomIconButton
          sx={{
            width: "60px",
          }}
          component={NavLink}
          to="/dislikes"
        >
          <Sad />
        </CustomIconButton>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default Layout;
