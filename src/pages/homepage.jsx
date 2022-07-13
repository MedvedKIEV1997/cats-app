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
    <Stack flex={1} height={1} position="relative">
      <Box bgcolor={"primary.dark"} height={"100%"} borderRadius={"20px"} m={3}>
        <StyledImg src={girl} />
      </Box>
    </Stack>
  );
};

export default Homepage;
