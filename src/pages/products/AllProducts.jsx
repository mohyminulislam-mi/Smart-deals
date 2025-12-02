import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Products from "../../components/products/Products";

const AllProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/products").then((res) => {
      console.log("after secureData", res.data);
      setProducts(res.data);
    });
  }, [axiosSecure]);
  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
        {products.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
