import React, { use } from "react";
import Products from "./products/Products";

const LatestProducts = ({ productsPromise }) => {
  const products = use(productsPromise);
  console.log(products);

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
