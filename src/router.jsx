import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { CustomLayout } from "./providers/Layout";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";

import { fetchProducts } from "./api/fetchProducts";
import { fetchProduct } from "./api/fetchProduct";

import { News } from "./pages/News";
import { NewsDetail } from "./pages/NewsDetail";
import { fetchNewsDetail } from "./api/fetchNewsDetail";
import { fetchComments } from "./api/fetchComments";

export const router = createBrowserRouter([
  {
    element: <CustomLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/products",
        element: <Products />,
        loader: () => fetchProducts(),
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsDetail />,
        loader: async ({ params }) => {
          const post = await fetchNewsDetail(params.id);
          const comments = await fetchComments(params.id);

          return { post, comments };
        },
      },
    ],
  },
]);
