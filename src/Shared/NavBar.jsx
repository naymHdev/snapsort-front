import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Toggle icons
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  // Toggle the mobile menu
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className=" fixed w-full top-0 left-0 z-10 shadow-sm">
      <div className="container relative mx-auto flex justify-between items-center py-6 px-5 md:px-0">
        {/* Social Icons (Left) */}
        <div className="">
          <img
            className=" absolute top-0 w-20 mx-auto h-auto"
            src={logo}
            alt="Snap Sort logo"
          />
        </div>

        {/* Routes (Middle) */}
        <ul className="hidden md:flex space-x-6 text-center">
          <li className="hover:text-gray-400">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Add image button */}
        <div className=" hidden md:flex">
          <AiOutlineMenu size={30} />
        </div>

        {/* Mobile Toggle Icon (Right) */}
        <div className="md:hidden cursor-pointer" onClick={toggleNav}>
          {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={`md:hidden  space-y-4 p-4 absolute top-16 left-0 w-full text-center transition-transform ${
          navOpen ? "block" : "hidden"
        }`}
      >
        <li className="hover:text-gray-400">
          <a href="/">Home</a>
        </li>
        <li className="hover:text-gray-400">
          <a href="#gallery">Gallery</a>
        </li>
        <li className="hover:text-gray-400">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-gray-400">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
