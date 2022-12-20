import React from 'react';
import Session from 'react-session-api';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Welcome from './Welcome';
import AddItem from './AddItem';
import ModifyItem from './ModifyItem';
import AddEmployee from './AddEmployee';
import ModifyEmployee from './ModifyEmployee';
import ModifyUser from './ModifyUser';
import Promotion from './Promotion';
import Orders from './Orders';
import AddImage from './AddImage';
import ModifyImage from './ModifyImage';

export default function AdminDashboard() {
  const _id = Session.get('_id');
  if(_id=== undefined){
   return (
    <div className="expired">
    <hi>Your session has been expired</hi>
  </div>
   )
  }
  return (
    <Router>
      <div className="row p-0">
        <div className="col-2 my-5  rounded-circle">
        <ul class="list-group ">
        <Link to="/admin/" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Welcome</li></Link>
        <Link to="/admin/add-item" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Add Item</li></Link>   
        <Link to="/admin/modify-item" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Modify Item</li></Link>   
        <Link to="/admin/add-employee" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Add Employee</li></Link>
        <Link to="/admin/modify-employee" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Modify Employeee</li></Link>
        <Link to="/admin/modify-user" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Modify User</li></Link>
        <Link to="/admin/promotional" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Promotional Message</li></Link>
        <Link to="/admin/orders" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Order Details</li></Link>
        <Link to="/admin/add-image" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Add Image(HOME PAGE)</li></Link>
        <Link to="/admin/modify-image" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Modify Image(HOME PAGE)</li></Link>
         </ul>
        </div>
        <div className="col-9 my-5">
        <Switch>
           <Route exact path="/admin/">
             <Welcome />
           </Route>
           <Route path="/admin/add-item" >
             <AddItem />
           </Route>
           <Route path="/admin/modify-item" >
             <ModifyItem />
           </Route>
           <Route path="/admin/add-employee">
             <AddEmployee />
           </Route>
           <Route path="/admin/modify-employee">
             <ModifyEmployee />
           </Route> 
           <Route path="/admin/modify-user">
             <ModifyUser />
           </Route>
           <Route path="/admin/promotional">
             <Promotion/>
           </Route>
           <Route path="/admin/orders">
             <Orders/>
           </Route>
           <Route path="/admin/add-image">
             <AddImage/>
           </Route>
           <Route path="/admin/modify-image">
             <ModifyImage/>
           </Route>
         </Switch>
        </div>
      </div>
  </Router>
  )
}
