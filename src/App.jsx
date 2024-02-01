import './App.css';
import Router from './Config/router';
import SetDataInRedux from './Config/firebase';

function App() {

  return (
    <div className="App">
      <Router />
      <SetDataInRedux />
    </div>
  );
}

export default App;
