import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className=" min-h-screen overflow-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
