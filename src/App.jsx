import './App.css';
import Router from './Config/router';
import { getUserDataFromDb } from './Config/firebase';
import { updateUser } from './store/userInfoSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    addDataInRedux();
  }, []);

  const addDataInRedux = async () => {
    const res = getUserDataFromDb();
    res.then(data => {
      dispatch(updateUser(data));
    })
    .catch(err => {
      dispatch(updateUser(err));
    })
  };

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;