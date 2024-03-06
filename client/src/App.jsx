import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Blog from "./pages/blog/Blog";
import Write from "./pages/write/Write";
import SingleBlog from "./pages/singleBlog/SingleBlog";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import { ThemeContext } from "./context/ThemeContext";
import SignUp from "./pages/signup/SignUp";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/NotFound";
import { withAuthRequired } from "./hoc/withAuthRequired";
import AdminPage from "./pages/admin/AdminPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const ProtectedHome = withAuthRequired(Home);
const ProtectedWrite = withAuthRequired(Write);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedHome />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/write",
        element: <ProtectedWrite />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <div className='container'>
        <div className='wrapper'>
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
};

export default App;
