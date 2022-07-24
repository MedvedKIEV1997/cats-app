import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import girl from "../assets/girl.png";

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Homepage = () => {
  return (
    <Stack flex={1} height="100vh" position="relative">
      <Box bgcolor="primary.dark" height={1} borderRadius={"20px"} m={4} />
      <StyledImg src={girl} />
    </Stack>
  );
};

export default Homepage;
