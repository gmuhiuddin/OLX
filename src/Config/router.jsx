import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import CartContainer from '../Views/CartContainer';
import CartSelected from '../Views/SelectedItem';
import Login from '../Views/Login';
import SignUP from '../Views/SignUp';
import AddSellPost from '../Views/AddSellPost';
import Navbar from '../Component/Navbar';
import CategoryNavbar from '../Component/Category-Navbar';
import SmallNavbar from '../Component/SmallNavbar';
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/item/:id",
        element: <CartSelected />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUP />,
      },
      {
        path: "/addsellpost",
        element: < AddSellPost />,
      }
    ]
  }
]);

function Layout() {

  return (
    <div>
      <SmallNavbar />
      <Outlet />
    </div>
  )
};

function MainPage() {

  return (
    <div>
      <Navbar />
      <CategoryNavbar />
      <CartContainer />
    </div>
  )
};

function Router() {
  return <RouterProvider router={router} />
};

export default Router;