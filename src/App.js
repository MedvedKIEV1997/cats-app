import { Route, Routes } from "react-router-dom";
import Searchbar from "../componets/searchbar";
import Breeds from "../pages/breeds";
import Dislikes from "../pages/dislikes";
import Favorites from "../pages/favorites";
import Gallery from "../pages/gallery";
import Homepage from "../pages/homepage";
import Likes from "../pages/likes";
import Menu from "../pages/menu";
import Search from "../pages/search";
import Voting from "../pages/voting";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Homepage />} />
          <Searchbar>
            <Route path="voting" element={<Voting />} />
            <Route path="breeds" element={<Breeds />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="search" element={<Search />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="likes" element={<Likes />} />
            <Route path="dislikes" element={<Dislikes />} />
          </Searchbar>
        </Route>
      </Routes>
    </>
  );
};
export default App;
