import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CustomButton from "../components/customButton";
import GridPattern from "../components/gridPattern";

import PageTitle from "../components/pageTitle";
import { getAllBreeds } from "../requests";

const StyledImg = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [allBreeds, setAllBreeds] = useState();
  const [searchedBreeds, setSearchedBreeds] = useState();
  const [currentSearch, setCurrentSearch] = useState("");

  const fetchAllBreeds = async () => {
    const breeds = await getAllBreeds();
    setAllBreeds(breeds);
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  useEffect(() => {
    if (allBreeds) {
      const name = searchParams.get("name");
      setCurrentSearch(name);
      const filteredBreeds = allBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(name.toLowerCase())
      );
      setSearchedBreeds(filteredBreeds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, allBreeds]);
  return (
    <Stack
      height={1}
      spacing={2}
      bgcolor="primary.main"
      p={2}
      borderRadius="20px"
    >
      <PageTitle page="SEARCH" />
      <Typography
        variant="h2"
        sx={{
          "& b": {
            color: "#1D1D1D",
          },
        }}
      >
        Search results for: <b>{currentSearch}</b>
      </Typography>
      <GridPattern>
        {searchedBreeds &&
          searchedBreeds.map((item) => {
            return (
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
                    to={{ pathname: `/breeds/${item.id}`, replace: true }}
                    variant="contained"
                    size="large"
                    sx={{
                      display: "none",
                      margin: "10px",
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </CustomButton>
                </Stack>
              </Box>
            );
          })}
      </GridPattern>
    </Stack>
  );
};

export default Search;
