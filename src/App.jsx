import './App.css';
import Router from './Config/router';
import { Provider } from 'react-redux'
import store from './store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <Router />
      </Provider>
    </div>
  );
}

export default App;
