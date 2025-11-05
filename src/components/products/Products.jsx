import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-5 pt-10 h-[210px]">
        <img src={image} alt="Image" className="rounded-xl object-cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-primary font-bold text-2xl">
          ${price_min}-{price_max}
        </p>
        <div className="card-actions w-full">
          <Link
            to={`/ProductsDetails/${_id}`}
            className="btn btn-primary w-full"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
