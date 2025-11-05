import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";
// import Footer from "../components/Footer";

const MainLayouts = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Header></Header>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default MainLayouts;
