import { Stack, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Breed from "./pages/breed";
import Breeds from "./pages/breeds";
import Dislikes from "./pages/dislikes";
import Favorites from "./pages/favorites";
import Gallery from "./pages/gallery";
import Homepage from "./pages/homepage";
import Likes from "./pages/likes";
import Menu from "./pages/menu";
import Search from "./pages/search";
import Voting from "./pages/voting";

import { inputGlobalStyles, themeLight } from "./styling";

const App = () => {
  return (
    <>
      {inputGlobalStyles}
      <ThemeProvider theme={themeLight}>
        <Stack direction={"row"} height={1}>
          <Menu />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route element={<Layout />}>
              <Route path="voting" element={<Voting />} />
              <Route path="breeds" element={<Breeds />} />
              <Route path="breeds/:breedId" element={<Breed />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="search/*" element={<Search />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="likes" element={<Likes />} />
              <Route path="dislikes" element={<Dislikes />} />
            </Route>
          </Routes>
        </Stack>
      </ThemeProvider>
    </>
  );
};
export default App;

//nth-of-type
//voting img
// breeds text styling
