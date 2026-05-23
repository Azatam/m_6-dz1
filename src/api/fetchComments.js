import axios from "axios";

export const fetchComments = async (id) => {
  const response = await axios.get(
    `https://dummyjson.com/posts/${id}/comments`,
  );

  return response.data.comments;
};
