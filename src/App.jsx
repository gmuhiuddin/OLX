import './App.css';
import Router from './Config/router';
import { Provider } from 'react-redux'
import store from './store';
import AddUserDataFB from './Config/firebase';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    <AddUserDataFB />
  },[])
  
  return (
    <div className="App">
      <Provider store={store}>
      <Router />
      </Provider>
    </div>
  );
}

export default App;
