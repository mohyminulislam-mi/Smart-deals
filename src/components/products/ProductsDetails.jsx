// import React, { useRef } from "react";
import { useLoaderData } from "react-router";

const ProductsDetails = () => {
  const product = useLoaderData();
  // const bidModalRef = useRef();
  console.log(product);

  // const handleBidModalBox = () => {
  //   bidModalRef.current.showModal();
  // };
  return (
    <div>
      <h1>product</h1>
    </div>
  );
};

export default ProductsDetails;
