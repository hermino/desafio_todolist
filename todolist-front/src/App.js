import {BrowserRouter as Router, Route} from 'react-router-dom';
import ToDoList from './components/ToDoList';
import React from 'react';

const App = () => (
  <Router>
    <Route path="/" component={ToDoList}/>
  </Router>
)

export default App;
