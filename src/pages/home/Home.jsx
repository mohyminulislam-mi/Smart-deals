import React, { Suspense } from "react";
import LatestProducts from "../../components/Home/LatestProducts";
import HeroSection from "../../components/Home/HeroSection";
import GetStart from "../../components/Home/GetStart";
import Testimonials from "../../components/Home/Testimonials";
const Home = () => {
  return (
    <section>
      <div>
        <HeroSection />
      </div>
      <LatestProducts></LatestProducts>
      <Testimonials />
      <GetStart />
    </section>
  );
};

export default Home;
