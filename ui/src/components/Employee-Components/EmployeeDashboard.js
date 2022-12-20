import React from 'react';
import Session from 'react-session-api';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Welcome from './Welcome';
import AddItem from './AddItem';
import ModifyItem from './ModifyItem';
import Profile from './Profile';
import TelephonicOrder from './TelephonicOrder';
import Orders from './Orders';


export default function EmployeeDashboard() {
  const _id = Session.get('_id');
  if(_id=== undefined){
   return (
    <div className="container expired">
      <div className="row my-5">
      <h3>Your session has been expired.<br/> 
      Plese <Link to="/signin">Login</Link> to continue</h3>
      </div>
  </div>
   )
  }
  return (
    <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 my-5 px-5 rounded-circle">
        <ul class="list-group ">
        <Link to="/employee/" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Welcome</li></Link>
        <Link to="/employee/add-item" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Add Item</li></Link>   
        <Link to="/employee/modify-item" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Modify Item</li></Link>  
        <Link to="/employee/profile" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Profile</li></Link>    
        <Link to="/employee/add-order" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Add Order</li></Link>
        <Link to="/employee/order-details" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Order Details</li></Link> 

         </ul>
        </div>
        <div className="col-9 my-5">
        <Switch>
           <Route exact path="/employee/">
             <Welcome />
           </Route>
           <Route path="/employee/add-item" >
             <AddItem />
           </Route>
           <Route path="/employee/modify-item" >
             <ModifyItem />
           </Route>
           <Route path="/employee/profile" >
             <Profile />
           </Route>
           <Route path="/employee/add-order" >
            <TelephonicOrder/>
           </Route>
           <Route path="/employee/order-details">
            <Orders/>
           </Route>
         </Switch>
        </div>
      </div>
    </div>
  </Router>
  )
}
