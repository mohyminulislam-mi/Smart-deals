import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Products from "../../components/products/Products";
import Loading from "../../Loading/Loading";
import { FaSearch } from "react-icons/fa";

const AllProducts = () => {
  const { loading } = useAuth();
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, [axiosSecure]);
  if (loading) {
    <Loading />;
  }
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-lg md:text-3xl font-bold leading-tight text-center mb-2">
        Search Your <span className="text-[#ad46ff]">Deals</span> {" "} In <span className="text-[#ad46ff]">Smart Way!</span>
      </h1>
      <div className="flex items-center bg-white shadow-lg rounded-full px-4 w-full max-w-lg mx-auto mb-14">
        <input
          type="text"
          placeholder="Search for Products, Categories..."
          className="flex-1 py-3 px-3 outline-none text-gray-700 rounded-full"
        />
        <button className="bg-[#ad46ff] text-white p-3 rounded-full hover:bg-[#ad46ff] transition">
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
        {products.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
