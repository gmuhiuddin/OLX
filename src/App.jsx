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
  const res = await getUserDataFromDb();
console.log();
  dispatch(updateUser(res));
};

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;