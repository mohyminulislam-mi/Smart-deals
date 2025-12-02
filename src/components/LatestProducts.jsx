import React, { useEffect, useState } from "react";
import Products from "./products/Products";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";
import { Link } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

const LatestProducts = () => {
  const {user, loading } = useAuth();
  console.log(loading);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.accessToken) {
       axiosSecure.get("/latest-products").then((data) => {
      console.log("data", data.data);
      setProducts(data.data);
    });
    }
  }, [user]);

  if (loading) {
    return <Loading />
  }
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center text-5xl text-black font-bold py-14">
        Latest <span className="text-purple-500">Products</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
        {products.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
      <div className="text-center my-16">
        <Link to='/allproduct' className="btn bg-purple-500 text-white ">
          Show All <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
