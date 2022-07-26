import {
  ButtonGroup,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PageTitle from "../components/pageTitle";
import { ReactComponent as Smile } from "../assets/smile.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Sad } from "../assets/sad.svg";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  getRandomImage,
  postAddToFavorites,
  postVoteDown,
  postVoteUp,
} from "../requests";
import { useDispatch, useSelector } from "react-redux";
import { addLogToVotes, selectVotesLog } from "../logsSlice";
import Spinner from "../components/spinner";

const StyledImg = styled.img`
  display: block;
  width: 100%;
`;

const Voting = () => {
  const [currentImg, setCurrentImg] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const votesLog = useSelector(selectVotesLog);

  const fetchNewImg = async () => {
    setLoading(true);
    const img = await getRandomImage();
    setCurrentImg(img[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewImg();
  }, []);

  const handleVoteDown = async () => {
    const res = await postVoteDown(currentImg.id);
    dispatch(
      addLogToVotes({
        id: currentImg.id,
        type: "voteDown",
        date: new Date(),
      })
    );
    if (res === 200) {
      fetchNewImg();
    }
  };
  const handleVoteUp = async () => {
    const res = await postVoteUp(currentImg.id);
    dispatch(
      addLogToVotes({
        id: currentImg.id,
        type: "voteUp",
        date: new Date(),
      })
    );
    if (res === 200) {
      fetchNewImg();
    }
  };
  const handleAddToFavorites = async () => {
    const res = await postAddToFavorites(currentImg.id);
    dispatch(
      addLogToVotes({
        id: currentImg.id,
        type: "addToFavorites",
        date: new Date(),
      })
    );
    if (res.status === 200) {
      fetchNewImg();
    }
  };

  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <PageTitle page="VOTING" />
      <Stack spacing={7}>
        {loading ? (
          <Stack height={1} justifyContent="center" alignItems="center">
            <Spinner wh={30} />
          </Stack>
        ) : (
          <Stack position="relative" height="40rem" width={1}>
            <Stack
              overflow="hidden"
              justifyContent={"center"}
              borderRadius="20px"
            >
              <StyledImg src={currentImg ? currentImg.url : ""} />
            </Stack>
            <ButtonGroup
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "primary.main",
                borderRadius: "20px",
                outline: "#fff solid 4px",
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 50%)",
              }}
            >
              <IconButton
                onClick={handleVoteUp}
                sx={{
                  bgcolor: "#97EAB9",
                  color: "primary.main",
                  height: "80px",
                  width: "80px",
                  borderRadius: "20px 0 0 20px",

                  "&:hover": {
                    bgcolor: "#97EAB94D",
                    color: "#97EAB9",
                  },
                }}
              >
                <SvgIcon
                  component={Smile}
                  sx={{
                    fontSize: "30px",
                  }}
                  inheritViewBox
                />
              </IconButton>
              <IconButton
                onClick={handleAddToFavorites}
                sx={{
                  bgcolor: "secondary.main",
                  color: "primary.main",
                  height: "80px",
                  width: "80px",
                  borderRadius: 0,
                  marginX: "4px",

                  "&:hover": {
                    bgcolor: "primary.dark",
                    color: "secondary.main",
                  },
                }}
              >
                <SvgIcon
                  sx={{
                    fontSize: "30px",
                  }}
                  component={Like}
                  inheritViewBox
                />
              </IconButton>
              <IconButton
                onClick={handleVoteDown}
                sx={{
                  bgcolor: "#FFD280",
                  color: "primary.main",

                  height: "80px",
                  width: "80px",
                  borderRadius: "0 20px 20px 0",

                  "&:hover": {
                    bgcolor: "#FFD2804D",
                    color: "#FFD280",
                  },
                }}
              >
                <SvgIcon
                  sx={{
                    fontSize: "30px",
                  }}
                  component={Sad}
                  inheritViewBox
                />
              </IconButton>
            </ButtonGroup>
          </Stack>
        )}
        <Stack spacing={1}>
          {votesLog.length !== 0 &&
            votesLog.map((log) => {
              let icon;
              let color;
              let group;
              if (log.type === "voteDown") {
                icon = Sad;
                color = "#FFD280";
                group = "Dislikes";
              }
              if (log.type === "voteUp") {
                icon = Smile;
                color = "#97EAB9";
                group = "Likes";
              }
              if (log.type === "addToFavorites") {
                icon = Like;
                color = "#FF868E";
                group = "Favorites";
              }
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
                    Image ID: <b>{log.id}</b> was added to {group}
                  </Typography>
                  <SvgIcon component={icon} inheritViewBox htmlColor={color} />
                </Stack>
              );
            })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Voting;
