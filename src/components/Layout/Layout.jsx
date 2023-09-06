import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Routers from "../../router/routers";

const Layout = () => {
  return (
    <>
      <nav>
        <Navbar />
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
