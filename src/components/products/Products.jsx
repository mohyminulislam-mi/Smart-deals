import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { _id, title, price_min, price_max } = product;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-primary font-bold text-2xl">
          ${price_min}-{price_max}
        </p>
        <div className="card-actions w-full">
          <Link to={`/ProductsDetails/${_id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
