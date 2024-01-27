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
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from './firebase';
import Loader from "../Views/Loader";

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
        path: "/chats/:anotherUserId",
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
  const {pathname} = useLocation();
  const {anotherUserId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
      
        const uid = user.uid;
        const userDateFromDb = await getDoc(doc(db, 'userInfo', uid));
        setUserData(userDateFromDb.data());
        setUser(true);
      } else {
  
        setUserData(null);
        setUser(false)
      };
      
      setLoader(false);
    });

  }, [])

  useEffect( () => {
    checkUser();
  }, [pathname, user]);
  
  async function checkUser(){

    if (user) {

      if(pathname == '/login' || pathname == '/signup'){
        navigate('/');
      };

    } else if(user == false) {

      if(pathname == '/addSellPost' || pathname == `/chats/${anotherUserId}`){
        navigate('/');
      };

    }

  }

if(user == undefined){
  return(
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