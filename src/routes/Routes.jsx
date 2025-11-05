import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/home/Home";
import AllProducts from "../pages/products/AllProducts";
import CreateProduct from "../pages/products/CreateProduct";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import MyProducts from "../pages/products/MyProducts";
import MyBids from "../pages/Bids/MyBids";
import ProductsDetails from "../components/products/ProductsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      { index: true, Component: Home },
      { path: "/allproduct", Component: AllProducts },
      {
        path: "/ProductsDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params}`),
        Component: ProductsDetails,
      },
      { path: "/My-Products", Component: MyProducts },
      { path: "/My-Bids", Component: MyBids },
      { path: "/Create-Product", Component: CreateProduct },
      { path: "/login", Component: Login },
      { path: "/registration", Component: Register },
      { path: "/forget-password", Component: ForgetPassword },
    ],
  },
]);

export default router;
