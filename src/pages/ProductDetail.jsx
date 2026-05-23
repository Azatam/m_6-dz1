import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Card, Carousel, Spin } from "antd";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-2xl mt-10">Error loading product</h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <Card className="rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Carousel autoplay>
            {data.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={data.title}
                  className="h-[400px] w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </Carousel>

          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold">{data.title}</h1>

            <p className="text-gray-500 text-lg">{data.category?.name}</p>

            <h2 className="text-3xl font-semibold">${data.price}</h2>

            <p className="text-gray-700 leading-7">{data.description}</p>

            <button className="bg-black text-white px-6 py-3 rounded-xl w-fit hover:opacity-80 transition">
              Add to cart
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
