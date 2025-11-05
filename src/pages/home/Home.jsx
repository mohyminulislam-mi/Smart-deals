import React, { Suspense } from "react";
import LatestProducts from "../../components/LatestProducts";
const productsPromise = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json()
);
const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Suspense
        fallback={
          <span className="loading loading-spinner loading-xl text-center"></span>
        }
      >
        <LatestProducts productsPromise={productsPromise}></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
