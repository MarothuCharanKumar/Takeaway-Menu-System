import './App.css';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './components/Admin-Components/AdminDashboard';
import UserDashboard from './components/User-Components/UserDashboard';
import EmployeeDashboard from './components/Employee-Components/EmployeeDashboard';
import React from 'react';
import Menu from './components/Menu/Menu';


function App() {
  const [isLoggedIn,setIsLoggedIn] = React.useState(false);
  const manageLogin=(payload)=>setIsLoggedIn(payload)
  
  return (
    <Router>
    <NavBar isLoggedIn={isLoggedIn} manageLogin={manageLogin}/>
      <div className="container-fluid">
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/signin'>
            <SignIn manageLogin={manageLogin}/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/admin'>
            <AdminDashboard/>
          </Route>
          <Route path='/user'>
            <UserDashboard/>
          </Route>
          <Route path='/employee'>
            <EmployeeDashboard/>
          </Route>
          <Route path='/menu'>
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
