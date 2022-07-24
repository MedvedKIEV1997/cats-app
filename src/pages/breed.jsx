import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import { getBreed, getFiveImages } from "../requests";

const StyledImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.active ? "#FF868E" : "#FBE0DC")};
  display: block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Breed = () => {
  const [images, setImages] = useState();
  const [counter, setCounter] = useState(0);
  const [info, setInfo] = useState();
  const { breedId } = useParams();

  const fetchBreed = async (id) => {
    const data = await getBreed(id);

    setInfo(data);
  };

  const fetchFiveImages = async (id) => {
    const data = await getFiveImages(id);
    setImages(data.map((item) => item.url));
  };

  const handleImageChange = (e) => {
    setCounter(e.target.value);
  };

  useEffect(() => {
    fetchBreed(breedId);
    fetchFiveImages(breedId);
  }, [breedId]);

  return (
    <Stack bgcolor={"primary.main"} borderRadius="20px" p={2} spacing={2}>
      <Stack direction="row" spacing="10px">
        <PageTitle page="BREEDS" color={{ body: "#FBE0DC", text: "#FF868E" }} />
        <Stack
          bgcolor="#FF868E"
          borderRadius="10px"
          paddingX={3}
          justifyContent="center"
        >
          <Typography variant="h3" color="text.secondary" letterSpacing={2}>
            {breedId.toLocaleUpperCase()}
          </Typography>
        </Stack>
      </Stack>
      <Stack position="relative" height="40rem" width={1}>
        <Stack
          overflow="hidden"
          justifyContent={"center"}
          borderRadius="20px"
          width={1}
          height={1}
        >
          <StyledImg src={images && images[counter]} />
        </Stack>
        <Stack
          position="absolute"
          direction="row"
          padding="10px"
          spacing="5px"
          bottom={0}
          left="50%"
          borderRadius="20px"
          bgcolor="#fff"
          sx={{
            transform: "translate(-50%, 50%)",
          }}
        >
          {images &&
            images.map((_, i) => {
              return (
                <StyledButton
                  key={i}
                  value={i}
                  active={i === +counter}
                  onClick={handleImageChange}
                />
              );
            })}
        </Stack>
      </Stack>
      <Stack
        position="relative"
        direction="row"
        borderRadius="20px"
        spacing={2}
        p={4}
        sx={{
          border: "2px solid #FBE0DC",
          marginTop: "50px !important",
        }}
        justifyContent="center"
      >
        <Typography
          variant="h1"
          fontSize="36px"
          position="absolute"
          top={0}
          paddingX={4}
          left="50%"
          bgcolor="#fff"
          overflow="hidden"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {info?.name}
        </Typography>
        <Stack flex={1}>
          <Typography>Temperament:</Typography>
          <Typography color="#8C8C8C">{info?.temperament} </Typography>
        </Stack>
        <Stack flex={1}>
          <Stack spacing={1} direction="row">
            <Typography>Origin:</Typography>
            <Typography color="#8C8C8C">{info?.origin}</Typography>
          </Stack>
          <Stack spacing={1} direction="row">
            <Typography>Weight:</Typography>
            <Typography color="#8C8C8C">{info?.weight.metric} kg</Typography>
          </Stack>
          <Stack spacing={1} direction="row">
            <Typography>Life span:</Typography>
            <Typography color="#8C8C8C">{info?.life_span} years</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Breed;
