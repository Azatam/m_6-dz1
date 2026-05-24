import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fetchProduct";
import { Card, Carousel, Spin } from "antd";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <h1 style={{ textAlign: "center" }}>Error loading product</h1>;
  }

  // 🔥 безопасные картинки (важно!)
  const images =
    data.images && data.images.length > 0 ? data.images : [data.thumbnail];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Card
        style={{ borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
      >
        {/* 🔥 SWIPE CAROUSEL */}
        <Carousel autoplay dots draggable swipeToSlide>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={data.title}
                style={{
                  width: "100%",
                  height: 400,
                  objectFit: "contain", // ⭐ ВАЖНО: без мыла и обрезки
                  background: "#f5f5f5",
                  borderRadius: 12,
                  padding: 10,
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400";
                }}
              />
            </div>
          ))}
        </Carousel>

        {/* INFO */}
        <div style={{ marginTop: 20 }}>
          <h1>{data.title}</h1>
          <p style={{ color: "gray" }}>{data.category?.name}</p>
          <h2>{data.price}$</h2>
          <p>{data.description}</p>
        </div>
      </Card>
    </div>
  );
};

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { Card, Spin } from "antd";
// import { fetchProduct } from "../api/fetchProduct";

// export const ProductDetail = () => {
//   const { id } = useParams();
//   const [activeImg, setActiveImg] = useState(0);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["product", id],
//     queryFn: () => fetchProduct(id),
//   });

//   if (isLoading) {
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
//       >
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError) return <h1 style={{ textAlign: "center" }}>Error</h1>;

//   return (
//     <div style={{ maxWidth: 1000, margin: "0 auto", padding: 40 }}>
//       <Card style={{ borderRadius: 16 }}>
//         <div
//           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}
//         >
//           {/* IMAGE BLOCK */}
//           <div>
//             <img
//               src={data.images?.[activeImg]}
//               alt={data.title}
//               style={{
//                 width: "100%",
//                 height: 400,
//                 objectFit: "cover",
//                 borderRadius: 12,
//               }}
//             />

//             {/* thumbnails */}
//             <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
//               {data.images?.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   onClick={() => setActiveImg(index)}
//                   style={{
//                     width: 70,
//                     height: 70,
//                     objectFit: "cover",
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     border:
//                       activeImg === index
//                         ? "2px solid black"
//                         : "2px solid transparent",
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* INFO */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
//             <h1>{data.title}</h1>

//             <p style={{ color: "gray" }}>{data.category}</p>

//             <h2>${data.price}</h2>

//             <p>{data.description}</p>

//             <button
//               style={{
//                 padding: "10px 15px",
//                 background: "black",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 width: "fit-content",
//               }}
//             >
//               Add to cart
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import { Card, Carousel, Spin } from "antd";

// export const ProductDetail = () => {
//   const { id } = useParams();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const response = await axios.get(
//         `https://api.escuelajs.co/api/v1/products/${id}`,
//       );

//       return response.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <h1 className="text-center text-2xl mt-10">Error loading product</h1>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-10">
//       <Card className="rounded-2xl shadow-lg">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <Carousel autoplay>
//             {data.images.map((img, index) => (
//               <div key={index}>
//                 <img
//                   src={img}
//                   alt={data.title}
//                   className="h-[400px] w-full object-cover rounded-xl"
//                 />
//               </div>
//             ))}
//           </Carousel>

//           <div className="flex flex-col gap-5">
//             <h1 className="text-4xl font-bold">{data.title}</h1>

//             <p className="text-gray-500 text-lg">{data.category?.name}</p>

//             <h2 className="text-3xl font-semibold">${data.price}</h2>

//             <p className="text-gray-700 leading-7">{data.description}</p>

//             <button className="bg-black text-white px-6 py-3 rounded-xl w-fit hover:opacity-80 transition">
//               Add to cart
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };
