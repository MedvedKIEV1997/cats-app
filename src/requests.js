import axios from "axios";

const END_POINT = "https://api.thecatapi.com/v1";
const SUB_ID = "MedvedKIEV1997";

export const getRandomImage = async () => {
  try {
    const res = await axios.get(`${END_POINT}/images/search`);
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const postVoteDown = async (id) => {
  try {
    const res = await axios.post(
      `${END_POINT}/votes`,
      {
        image_id: id,
        sub_id: SUB_ID,
        value: 0,
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );

    return res.status;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};
export const postVoteUp = async (id) => {
  try {
    const res = await axios.post(
      `${END_POINT}/votes`,
      {
        image_id: id,
        sub_id: SUB_ID,
        value: 1,
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return res.status;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const postAddToFavorites = async (id) => {
  try {
    const res = await axios.post(
      `${END_POINT}/favourites`,
      {
        image_id: id,
        sub_id: SUB_ID,
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const postUploadImg = async (selectedFile) => {
  // formData.append("sub_id", SUB_ID);

  try {
    let formData = new FormData();
    formData.append("file", selectedFile);
    const res = await axios.post(`${END_POINT}/images/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
    return error.response;
  }
};

export const deleteFromFavorites = async (id) => {
  try {
    const res = await axios.delete(`${END_POINT}/favourites/${id}`, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return res.status;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const getAllBreeds = async () => {
  try {
    const res = await axios.get(`${END_POINT}/breeds`);
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const getAllBreedsWithLimitPageAndOrder = async (limit, page, order) => {
  try {
    const res = await axios.get(
      `${END_POINT}/breeds?limit=${limit}&page=${page}&order=${order}`
    );

    return { data: res.data, count: res.headers["pagination-count"] };
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const getBreed = async (id) => {
  try {
    const res = await axios.get(`${END_POINT}/breeds/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};
export const getFiveImages = async (id) => {
  try {
    const res = await axios.get(
      `${END_POINT}/images/search?limit=5&breed_ids=${id}`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const getImages = async (breedId, limit, order, type) => {
  try {
    const res = await axios.get(
      `${END_POINT}/images/search?order=${order}&limit=${limit}${
        breedId !== "none" ? `&breed_ids=${breedId}` : ""
      }&mime_types=${type}`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};

export const getAllFavorites = async () => {
  try {
    const res = await axios.get(
      `${END_POINT}/favourites?sub_id=${SUB_ID}`,

      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, reload the page or try again later");
  }
};
