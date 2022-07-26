import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import GridPattern from "../components/gridPattern";
import PageTitle from "../components/pageTitle";
import Spinner from "../components/spinner";
import StyledImg from "../components/styledImg";
import { getVotes } from "../requests";

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLikes = async () => {
    const data = await getVotes();
    const filtered = data.filter((item) => item.value === 1);
    setLikes(filtered);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchLikes();
  }, []);

  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <PageTitle page="LIKES" />

      {loading ? (
        <Stack height={1} justifyContent="center" alignItems="center">
          <Spinner wh={30} />
        </Stack>
      ) : likes.length !== 0 ? (
        <GridPattern>
          {likes.map((item) => {
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
    </Stack>
  );
};

export default Likes;
