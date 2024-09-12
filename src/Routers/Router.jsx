import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home/Home";
import Error from "../Components/Error/Error";
import ImageFormModal from "../Components/ImageFormModal/ImageFormModal";

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
      {
        path: "imageForm",
        element: <ImageFormModal />,
      },
    ],
  },
]);

export default router;
