import { Stack, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../assets/logo.svg";
import vote from "../assets/voting.png";
import breeds from "../assets/breeds.png";
import gallery from "../assets/gallery.png";
import styled from "@emotion/styled";
import CustomButton from "../components/customButton";
import { NavLink } from "react-router-dom";

const StyledImg = styled.img`
  display: block;
  object-fit: scale-down;
  max-width: 100%;
  max-height: 100%;
`;
const StyledVotingImg = styled.img`
  display: block;
  object-fit: scale-down;
  max-width: 80%;
  max-height: 80%;
`;

const Menu = () => {
  return (
    <Stack flex={1} alignItems="center" p={3} position="relative">
      <Stack gap={6} position="fixed">
        <Logo />
        <Stack mt={1.5}>
          <Typography variant="h1">Hi intern!</Typography>
          <Typography variant="h2">
            Welcome to MI 2022 Front-end test
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h3">Lets start using The Cat API</Typography>
          <Stack direction={"row"} gap={1}>
            <Stack gap={1}>
              <Stack
                bgcolor={"#B4B7FF"}
                border={"4px solid rgba(255, 255, 255, 0.6)"}
                borderRadius={"20px"}
                height="198px"
                width="138px"
                justifyContent="center"
                alignItems="center"
              >
                <StyledVotingImg src={vote} />
              </Stack>
              <CustomButton
                component={NavLink}
                to="/voting"
                variant="contained"
              >
                VOTING
              </CustomButton>
            </Stack>

            <Stack gap={1}>
              <Stack
                bgcolor={"#97EAB9"}
                border={"4px solid rgba(255, 255, 255, 0.6)"}
                borderRadius={"20px"}
                height="198px"
                width="138px"
                justifyContent="center"
              >
                <StyledImg src={breeds} />
              </Stack>
              <CustomButton
                component={NavLink}
                to="/breeds"
                variant="contained"
              >
                BREEDS
              </CustomButton>
            </Stack>
            <Stack gap={1}>
              <Stack
                bgcolor={"#FFD280"}
                border={"4px solid rgba(255, 255, 255, 0.6)"}
                borderRadius={"20px"}
                height="198px"
                width="138px"
              >
                <StyledImg src={gallery} />
              </Stack>
              <CustomButton
                component={NavLink}
                to="/gallery"
                variant="contained"
              >
                GALLERY
              </CustomButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Menu;
