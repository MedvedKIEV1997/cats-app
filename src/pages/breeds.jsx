import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import GridPattern from "../components/gridPattern";
import PageTitle from "../components/pageTitle";
import styled from "@emotion/styled";
import { ReactComponent as ZtoA } from "../assets/ZtoA.svg";
import { ReactComponent as AtoZ } from "../assets/AtoZ.svg";
import { ReactComponent as Prev } from "../assets/prev.svg";
import { ReactComponent as Next } from "../assets/next.svg";

import CustomButton from "../components/customButton";
import { useEffect, useRef, useState } from "react";
import { getAllBreeds, getAllBreedsWithLimitPageAndOrder } from "../requests";
import { Link } from "react-router-dom";

const StyledImg = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Breeds = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [breed, setBreed] = useState("All breeds");
  const [items, setItems] = useState();
  const [count, setCount] = useState();
  const [order, setOrder] = useState("ASC");
  const allBreedsRef = useRef(null);

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleBreed = (e) => {
    setBreed(e.target.value);
  };

  const handleOrderAtoZ = () => {
    setOrder("ASC");
  };
  const handleOrderZtoA = () => {
    setOrder("DESC");
  };

  const fetchAllBreeds = async () => {
    const breeds = await getAllBreeds();
    allBreedsRef.current = breeds;
  };

  const fetchAllBreedsWithLimitPageAndOrder = async (limit, page, order) => {
    const { data, count: newCount } = await getAllBreedsWithLimitPageAndOrder(
      limit,
      page,
      order
    );
    setItems(data);
    setCount(newCount);
    setLastPage(Math.ceil(count / limit) - 1);
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  useEffect(() => {
    if (breed === "All breeds") {
      fetchAllBreedsWithLimitPageAndOrder(limit, page, order);
    } else {
      setItems(
        allBreedsRef.current.filter((breedRef) => breedRef.id === breed)
      );
      setPage(0);
      setLastPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order, breed]);

  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <Stack direction="row" spacing="10px">
        <PageTitle page="BREEDS" />

        <FormControl
          fullWidth
          sx={{
            flex: 2,
          }}
        >
          <Select
            value={breed}
            onChange={handleBreed}
            sx={{
              height: "40px",
              backgroundColor: "#F8F8F7",
              borderRadius: "10px",
            }}
          >
            <MenuItem value={"All breeds"}>All breeds</MenuItem>
            {allBreedsRef.current &&
              allBreedsRef.current.map((breed) => (
                <MenuItem key={breed.id} value={breed.id}>
                  {breed.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            flex: 1,
          }}
        >
          <Select
            value={limit}
            onChange={handleLimit}
            sx={{
              height: "40px",
              backgroundColor: "#F8F8F7",
              borderRadius: "10px",
            }}
          >
            <MenuItem value={5}>Limit: 5</MenuItem>
            <MenuItem value={10}>Limit: 10</MenuItem>
            <MenuItem value={15}>Limit: 15</MenuItem>
            <MenuItem value={20}>Limit: 20</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          sx={{
            backgroundColor: "#F8F8F7",
            borderRadius: "10px",
            width: "40px",
          }}
          onClick={handleOrderZtoA}
        >
          <ZtoA />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#F8F8F7",
            borderRadius: "10px",
            width: "40px",
          }}
          onClick={handleOrderAtoZ}
        >
          <AtoZ />
        </IconButton>
      </Stack>

      <GridPattern>
        {items &&
          items.map((item) => (
            <Box
              key={item.id}
              borderRadius="20px"
              overflow="hidden"
              width={1}
              height={1}
              position="relative"
            >
              <StyledImg src={item.image?.url} />
              <Stack
                position="absolute"
                height={1}
                alignItems="center"
                justifyContent="end"
                width={1}
                sx={{
                  zIndex: 5,
                  top: 0,
                  left: 0,

                  "&:hover": {
                    bgcolor: "#FF868E99",
                  },
                  "&:hover a": {
                    display: "inline-flex",
                  },
                }}
              >
                <CustomButton
                  component={Link}
                  to={item.id}
                  variant="contained"
                  size="large"
                  sx={{
                    display: "none",
                    margin: "30px",
                    width: "80%",
                  }}
                >
                  {item.name}
                </CustomButton>
              </Stack>
            </Box>
          ))}
      </GridPattern>
      <Stack direction="row" justifyContent="space-evenly">
        <CustomButton
          disabled={page === 0}
          variant="contained"
          startIcon={<Prev />}
          onClick={handlePrevPage}
        >
          Prev
        </CustomButton>
        <CustomButton
          disabled={page === lastPage}
          variant="contained"
          startIcon={<Next />}
          onClick={handleNextPage}
        >
          Next
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default Breeds;
