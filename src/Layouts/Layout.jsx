import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/NavBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen overflow-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
