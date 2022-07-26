import styled from "@emotion/styled";
import {
  FormControl,
  IconButton,
  Link,
  MenuItem,
  Modal,
  Select,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../components/customButton";
import GridPattern from "../components/gridPattern";
import PageTitle from "../components/pageTitle";
import CustomIconButton from "../components/customIconButton";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Reload } from "../assets/reload.svg";
import { ReactComponent as Yes } from "../assets/yes.svg";
import { ReactComponent as No } from "../assets/no.svg";
import { ReactComponent as Exit } from "../assets/exit.svg";
import Placeholder from "../assets/placeholder.svg";
import {
  deleteFromFavorites,
  getAllBreeds,
  getAllFavorites,
  getImages,
  postAddToFavorites,
  postUploadImg,
} from "../requests";
import SmallSpinner from "../components/small-spinner";
import Spinner from "../components/spinner";

const StyledImg = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const StyledUploadedImg = styled.img`
  display: block;
  height: 90%;
  width: 90%;
  border-radius: 10px;
  position: absolute;
  object-fit: cover;
  z-index: 5;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
  z-index: 10;
`;

const Gallery = () => {
  // to move
  const [inputImg, setInputImg] = useState();
  const [uploading, setUploading] = useState(false);
  const [text, setText] = useState();
  const [error, setError] = useState(false);

  const handleFileDrop = (e) => {
    const file = e.target.files[0];
    setError(false);

    if (!file) {
      alert("Wrong type of file");
      return;
    } else {
      setInputImg(file);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const res = await postUploadImg(inputImg);
    if (res.status === 201) {
      setText(
        <Stack
          padding="20px"
          direction="row"
          bgcolor="#fff"
          borderRadius="10px"
          alignSelf="normal"
          alignItems="center"
          spacing={2}
        >
          <SvgIcon component={Yes} inheritViewBox />

          <Typography variant="h4" color="#8C8C8C">
            Thanks for the Upload - Cat found!
          </Typography>
        </Stack>
      );
      setInputImg(null);
      setUploading(false);
    } else {
      setText(
        <Stack
          padding="20px"
          direction="row"
          bgcolor="#fff"
          borderRadius="10px"
          alignSelf="normal"
          alignItems="center"
          spacing={2}
        >
          <SvgIcon component={No} inheritViewBox />

          <Typography variant="h4" color="#8C8C8C">
            No Cat found - try a different one
          </Typography>
        </Stack>
      );
      setUploading(false);
      setError(true);
    }
  };
  //
  const [order, setOrder] = useState("RANDOM");
  const [breed, setBreed] = useState("none");
  const [type, setType] = useState("jpg,png");
  const [limit, setLimit] = useState(5);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const allBreedsRef = useRef();

  const fetchAllBreeds = async () => {
    const breeds = await getAllBreeds();
    allBreedsRef.current = breeds;
  };

  const fetchImages = async (breedId, limit, order, type) => {
    const data = await getImages(breedId, limit, order, type);
    setItems(data);
    setLoading(false);
  };

  const handleAddRemoveToFavorites = async (e) => {
    const imageId = e.currentTarget.value;
    const target = e.currentTarget;
    target.classList.add("Mui-disabled");
    const favorites = await getAllFavorites();
    const filtered = favorites.filter(
      (favorite) => favorite.image_id === imageId
    );

    if (filtered.length === 0) {
      await postAddToFavorites(imageId);
      target.classList.remove("Mui-disabled");
      target.classList.add("active");
    } else {
      target.classList.remove("active");
      await deleteFromFavorites(filtered[0].id);
      target.classList.remove("Mui-disabled");
    }
  };

  const handleReload = () => {
    setLoading(true);
    fetchImages(breed, limit, order, type);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchImages(breed, limit, order, type);
  }, [limit, order, breed, type]);

  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <Stack direction="row" spacing="10px" justifyContent="space-between">
        <PageTitle page="GALLERY" />
        <CustomButton
          onClick={handleOpen}
          variant="contained"
          sx={{
            bgcolor: "primary.dark",
          }}
        >
          Upload
        </CustomButton>
        <Modal open={open} onClose={handleClose}>
          <Stack
            bgcolor="#F8F8F7"
            borderRadius="20px"
            width={0.5}
            position="absolute"
            right="24px"
            bottom="24px"
            top="24px"
            padding={3}
            alignItems="center"
            spacing={3}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                borderRadius: "10px",
                bgcolor: "#FFF",
                width: "40px",
                height: "40px",
                alignSelf: "end",
              }}
            >
              <Exit />
            </IconButton>

            <Typography variant="h1">
              Upload a .jpg or .png Cat Image
            </Typography>
            <Typography variant="h2">
              Any uploads must comply with the{" "}
              <Link
                color="#FF868E"
                underline="none"
                href="https://thecatapi.com/privacy"
              >
                upload guidelines
              </Link>{" "}
              or face deletion.
            </Typography>

            <Stack
              height="40vh"
              width={1}
              bgcolor={error ? "#FBE0DC" : "#fff"}
              position="relative"
              borderRadius="20px"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: error ? "2px dashed #FF868E" : "2px dashed #FBE0DC",
                backgroundImage: `url(${Placeholder})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {!inputImg && (
                <Typography
                  variant="h2"
                  sx={{
                    "& b": {
                      color: "#1D1D1D",
                    },
                  }}
                >
                  {" "}
                  <b>Drag here</b> your file or <b>Click here</b> to upload
                </Typography>
              )}
              <StyledInput
                value=""
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={handleFileDrop}
              />
              {inputImg && (
                <StyledUploadedImg src={URL.createObjectURL(inputImg)} />
              )}
            </Stack>
            <Typography variant="h2">
              {inputImg
                ? `Image File Name: ${inputImg.name}`
                : "No file selected"}
            </Typography>
            {inputImg && (
              <CustomButton
                startIcon={uploading && <SmallSpinner />}
                disabled={uploading}
                sx={{
                  bgcolor: "#FF868E",
                  paddingX: "30px",
                  "&:hover": {
                    bgcolor: "#FF868E",
                  },
                }}
                onClick={handleUpload}
              >
                Upload photo
              </CustomButton>
            )}

            {text}
          </Stack>
        </Modal>
      </Stack>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        bgcolor="#F8F8F7"
        borderRadius={"20px"}
        p="20px"
        gap="20px"
      >
        <Stack spacing="5px">
          <Typography variant="h5" marginLeft="5px">
            ORDER
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              sx={{
                bgcolor: "#FFF",
                borderRadius: "10px",
              }}
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem value={"RANDOM"}>Random</MenuItem>
              <MenuItem value={"DESC"}>Desc</MenuItem>
              <MenuItem value={"ASC"}>Asc</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing="5px">
          <Typography variant="h5" marginLeft="5px">
            TYPE
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              sx={{
                bgcolor: "#FFF",
                borderRadius: "10px",
              }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"jpg,png,gif"}>All</MenuItem>
              <MenuItem value={"jpg,png"}>Static</MenuItem>
              <MenuItem value={"gif"}>Animated</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing="5px">
          <Typography variant="h5" marginLeft="5px">
            BREED
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              sx={{
                bgcolor: "#FFF",
                borderRadius: "10px",
              }}
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <MenuItem value={"none"}>None</MenuItem>
              {allBreedsRef.current &&
                allBreedsRef.current.map((breed) => (
                  <MenuItem key={breed.id} value={breed.id}>
                    {breed.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing="5px">
          <Typography variant="h5" marginLeft="5px">
            LIMIT
          </Typography>
          <FormControl
            fullWidth
            sx={{
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Select
              size="small"
              sx={{
                bgcolor: "#FFF",
                borderRadius: "10px",
                width: "100%",
              }}
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <MenuItem value={5}>5 items per page</MenuItem>
              <MenuItem value={10}>10 items per page</MenuItem>
              <MenuItem value={15}>15 items per page</MenuItem>
              <MenuItem value={20}>20 items per page</MenuItem>
            </Select>
            <IconButton
              onClick={handleReload}
              flex={0}
              sx={{
                borderRadius: "10px",
                bgcolor: "#FFF",
                width: "40px",
              }}
            >
              <Reload />
            </IconButton>
          </FormControl>
        </Stack>
      </Box>
      {loading ? (
        <Stack height={1} justifyContent="center" alignItems="center">
          <Spinner wh={30} />
        </Stack>
      ) : items.length !== 0 ? (
        <GridPattern>
          {items.map((item) => {
            return (
              <Box
                key={item.id}
                borderRadius="20px"
                overflow="hidden"
                width={1}
                height={1}
                position="relative"
              >
                <StyledImg src={item.url} />
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
                    onClick={handleAddRemoveToFavorites}
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
    </Stack>
  );
};

export default Gallery;
