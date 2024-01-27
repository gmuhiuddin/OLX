import './App.css';
import Router from './Config/router';
import NodeState from './note/NodeState';

function App() {
  
  return (
    <div className="App">
      <NodeState>
      <Router />
      </NodeState>
    </div>
  );
}

export default App;
