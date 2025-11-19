import React, { Suspense } from "react";
import Header from "@/organism/Header";
import Footer from "@/organism/Footer";
import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Default;
