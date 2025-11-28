import React from "react";
import Header from "../pages/shared/Header";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white"><Header></Header></header>
      <section ><Outlet></Outlet></section>
      {/* <section className="w-11/12 mx-auto"><Footer></Footer></section> */}
    </div>
  );
};

export default MainLayouts;
