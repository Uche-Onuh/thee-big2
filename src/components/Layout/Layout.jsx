import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Routers from "../../router/routers";

import { AdminNav } from "../../admin";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <nav>
        {location.pathname.startsWith("/admin") ? <AdminNav /> : <Navbar />}
      </nav>
      <div>
        <Routers />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
