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
  const [pageChangerLoader, setPageChangerLoader] = useState(true);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoader(false);
    });

  }, [])

  useEffect( () => {
    
    async function checkUser(){
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const userDateFromDb = await getDoc(doc(db, 'userInfo', uid));
        setUserData(userDateFromDb.data());

        if(path == '/login' || path == '/signup'){
          navigate('/');
          setPageChangerLoader(false);
        };

        // ...
      } else {
        // User is signed out
        // ...
        if(path == '/addsellpost'){
          navigate('/');
          setPageChangerLoader(false);
        };


        setUserData(null);
      }
    }

    checkUser();
  }, [path, user]);

  if(pageChangerLoader){
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