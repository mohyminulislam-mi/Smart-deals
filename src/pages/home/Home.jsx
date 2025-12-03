import React, { Suspense } from "react";
import LatestProducts from "../../components/Home/LatestProducts";
import HeroSection from "../../components/Home/HeroSection";
import GetStart from "../../components/Home/GetStart";
// const productsPromise = fetch("http://localhost:3000/latest-products").then(
//   (res) => res.json()
// );
const Home = () => {
  return (
    <section>
      <div>
        <HeroSection />
      </div>
      <LatestProducts></LatestProducts>
      <GetStart />
    </section>
  );
};

export default Home;
