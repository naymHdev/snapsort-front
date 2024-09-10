import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center text-center h-screen space-y-6">
        <h3 className=" text-4xl font-mono text-black">
          Oops! That page can’t be found.
        </h3>
        <p className=" font-mono text-gray-700 w-1/2 mx-auto">
          The page you are looking for might have beeen removed had it is name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className=" bg-black text-gray-200 px-8 py-4">
            GO TO HOME PAGE
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error;
