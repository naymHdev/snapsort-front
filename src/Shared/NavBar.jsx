import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  // Toggle the mobile menu
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold">MyGallery</div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
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

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleNav}>
          {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={`md:hidden bg-gray-800 space-y-4 p-4 absolute top-16 left-0 w-full text-center transition-transform ${
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
