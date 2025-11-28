import React, { Suspense } from "react";
import LatestProducts from "../../components/LatestProducts";
import HeroSection from "../../components/HeroSection";
const productsPromise = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json()
);
const Home = () => {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
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
