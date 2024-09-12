import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" mt-24 flex justify-end">
        <Link to="/imageForm">
          <button className="bg-green-500 text-white p-3 m-4 rounded">
            Add New Image
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
