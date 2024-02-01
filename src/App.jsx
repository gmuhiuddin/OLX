import './App.css';
import Router from './Config/router';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from './Config/firebase';
import { useEffect } from 'react';
import { updataUser } from './store/userInfoSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    try {
      getUserInfo()
        .then(res => {
          dispatch(updataUser(res));
        })
        .catch(err => {
          dispatch(updataUser(err));
        });

    } catch (err) {
      alert(err.message)
    }

  }, [])

  const abc = useSelector(res => res.userInfo);

  console.log(abc);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
