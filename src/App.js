import React from 'react';
import './App.css';
import TodoContainer from "./containers/todo/TodoContainer";

function App() {
  return (
    <div className="app-wrap">
      <div className="app-body">
            <TodoContainer/>
      </div>
    </div>
  );
}

export default App;
