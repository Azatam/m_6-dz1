import axios from "axios";

export const fetchNews = async (page = 0) => {
  const limit = 10;

  const skip = page * limit;

  const response = await axios.get(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
  );

  return response.data;
};
