import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard";
import Button from "./components/Button";
import InfiniteScroll from "./components/InfiniteScroll";
import InfiniteScrollIO from "./components/InfiniteScrollIO";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "button",
        element: <Button />,
      },
      {
        path: "infinitescroll",
        element: <InfiniteScroll/>,
      },
      {
        path: "infinitescrollio",
        element: <InfiniteScrollIO/>,
      },
    ],
  },
]);
