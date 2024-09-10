import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error/Error";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
