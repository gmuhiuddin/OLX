import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import CartContainer from '../Views/CartContainer';
import CartSelected from '../Views/SelectedItem';
import Login from '../Views/Login';
import SignUP from '../Views/SignUp';
import AddSellPost from '../Views/AddSellPost';
import Navbar from '../Component/Navbar';
import CategoryNavbar from '../Component/Category-Navbar';
import SmallNavbar from '../Component/SmallNavbar';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Navbar /> <CategoryNavbar /> <CartContainer /></div>,
    },
    {
        path: "/item/:id",
        element: <div><SmallNavbar /> <CartSelected /></div>,
    },
    {
        path: "/login",
        element:<div><SmallNavbar /> <Login /></div>,
    },
    {
        path: "/signup",
        element:<div><SmallNavbar /> <SignUP /></div>,
    },
    {
      path: "/addsellpost",
      element: <div><SmallNavbar /><AddSellPost /></div>,
  }
  ]);

  function Router(){
    return <RouterProvider router={router} />
  };

  export default Router;