import React, { useEffect, useState } from "react";
import Products from "./products/Products";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

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
    return <span>Loading..</span>;
  }
  return (
    <div>
      <h1 className="text-center text-4xl text-purple-500 font-bold">
        Latest Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
