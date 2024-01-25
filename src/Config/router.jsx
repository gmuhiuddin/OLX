import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation
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
        path: "/addsellpost",
        element: < AddSellPost />,
      }
    ]
  }
]);

function Layout() {

  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
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
  }, [window.location.pathname, user]);
  
  async function checkUser(){
    const path = window.location.pathname;

    if (user) {

      if(path == '/login' || path == '/signup'){
        navigate('/');
      };

    } else if(user == false) {

      if(path == '/addsellpost'){
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