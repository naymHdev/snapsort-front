import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr />
      <footer className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-lg font-semibold mb-2">Snap Sort</h2>
          <p className="mb-4">
            Showcasing the best moments in a beautiful and organized gallery.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaInstagram />
            <FaYoutube />
          </div>
          <p className="text-sm text-gray-700">
            &copy; {new Date().getFullYear()} Image Gallery. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
