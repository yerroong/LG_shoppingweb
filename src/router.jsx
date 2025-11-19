import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Default from "./layout/Default";
import NotFound from "./pages/NotFound";
import { shopPageLoader, detailPageLoader } from "./loaders/productsLoaders";

// 일반 import
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/blog", element: <BlogPage /> },
      // { path: "/*", element: <NotFound /> },
      { path: "/shop", element: <ShopPage />, loader: shopPageLoader },
      { path: "/cart", element: <CartPage /> },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },
    ],
  },
]);

export default router;
