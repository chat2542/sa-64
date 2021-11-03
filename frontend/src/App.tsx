import React, {useState} from 'react';
import './App.css';
// import Login from './pages/Login';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import StudentRecord from './components/StudentRecord';
import StudentRecordFollow from './components/StudentRecordFollow';



function App() {
  const [redirect, setRedirect] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar redirect={redirect} setRedirect={setRedirect} />
          <Switch>
            {/* <Route exact path="/" component={() => <Home />} /> */}
            {/* <Route path="/login" component={() => <Login setRedirect={setRedirect} />} /> */}
            <Route exact path="/" component={() => <StudentRecordFollow />} />
            <Route exact path="/create" component={() => <StudentRecord />} />
          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;