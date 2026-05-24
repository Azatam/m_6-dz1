import axios from "axios";

export const fetchProduct = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);

  return response.data;
};
