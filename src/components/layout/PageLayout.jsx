import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}