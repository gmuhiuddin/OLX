import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";
import CartContainer from '../Views/CartContainer';
import CartSelected from '../Views/SelectedItem';
import Login from '../Views/Login';
import SignUP from '../Views/SignUp';
import AddSellPost from '../Views/AddSellPost';
import ChatsPage from '../Views/ChatsPage';
import Navbar from '../Component/Navbar';
import CategoryNavbar from '../Component/Category-Navbar';
import SmallNavbar from '../Component/SmallNavbar';
import { useContext, useEffect, useState } from "react";
import Loader from "../Views/Loader";
import nodeContext from '../note/nodeContext'

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
        path: "/chats/:productId",
        element: <ChatsPage />,
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
        path: "/addSellPost",
        element: < AddSellPost />,
      }
    ]
  }
]);

function Layout() {

  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  const { anotherUserId } = useParams();
  const contextState = useContext(nodeContext);
  const navigate = useNavigate();
  
  useEffect(() => {

    setUserData(contextState.userData);
    setUser(contextState.user);
    setLoader(false);

  }, [])

  useEffect(() => {
    checkUser();
  }, [pathname, user]);

  async function checkUser() {

    if (user) {

      if (pathname == '/login' || pathname == '/signup') {
        navigate('/');
      };

    } else if (user == false) {

      if (pathname == '/addSellPost' || pathname == `/chats/${anotherUserId}`) {
        navigate('/');
      };

    }

  }

  if (user == undefined) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <SmallNavbar loader={loader} userData={userData} />
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