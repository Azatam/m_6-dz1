import axios from "axios";

export const fetchProduct = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);

  return res.data;
};
