import { deleteFromFavorites, getAllFavorites } from "../requests";
import { Stack, Box, Typography } from "@mui/material";
import PageTitle from "../components/pageTitle";
import { useEffect, useState } from "react";
import GridPattern from "../components/gridPattern";
import styled from "@emotion/styled";
import CustomIconButton from "../components/customIconButton";
import { ReactComponent as Like } from "../assets/like.svg";
import Spinner from "../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { addLogToFavorites, selectFavoritesLog } from "../logsSlice";

const StyledImg = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favLog = useSelector(selectFavoritesLog);

  const fetchFavorites = async () => {
    const data = await getAllFavorites();
    setFavorites(data);
    setLoading(false);
  };

  const handleDeleteFromFavorites = async (e) => {
    const id = e.currentTarget.value;
    await deleteFromFavorites(id);
    await fetchFavorites();
    dispatch(
      addLogToFavorites({
        id: id,
        date: new Date(),
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchFavorites();
  }, []);
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <PageTitle page="FAVORITES" />

      {loading ? (
        <Stack height={1} justifyContent="center" alignItems="center">
          <Spinner wh={30} />
        </Stack>
      ) : favorites.length !== 0 ? (
        <GridPattern>
          {favorites.map((item) => {
            return (
              <Box
                key={item.id}
                borderRadius="20px"
                overflow="hidden"
                width={1}
                height={1}
                position="relative"
              >
                <StyledImg src={item.image.url} />
                <Stack
                  position="absolute"
                  height={1}
                  alignItems="center"
                  justifyContent="center"
                  width={1}
                  sx={{
                    zIndex: 5,
                    top: 0,
                    left: 0,

                    "&:hover": {
                      bgcolor: "#FF868E99",
                    },
                    "&:hover button": {
                      display: "inline-flex",
                    },
                  }}
                >
                  <CustomIconButton
                    value={item.id}
                    onClick={handleDeleteFromFavorites}
                    sx={{
                      display: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    <Like />
                  </CustomIconButton>
                </Stack>
              </Box>
            );
          })}
        </GridPattern>
      ) : (
        <Typography
          variant="h4"
          color="#8C8C8C"
          bgcolor="#e5e5e5"
          padding="20px"
          borderRadius="10px"
        >
          No item found
        </Typography>
      )}
      {favLog.length !== 0 &&
        favLog.map((log) => {
          return (
            <Stack
              key={log.id}
              direction="row"
              bgcolor="#F8F8F7"
              p="15px"
              spacing={2}
              borderRadius="10px"
              alignItems="center"
            >
              <Typography
                bgcolor="primary.main"
                paddingX="10px"
                paddingY="3px"
                borderRadius="5px"
              >
                {log.date.getHours()}:{log.date.getMinutes()}
              </Typography>

              <Typography flex={1}>
                Image ID: <b>{log.id}</b> was removed from Favorites
              </Typography>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Favorites;
