import './App.css';
import Router from './Config/router';
import SetDataInRedux from './Config/firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;