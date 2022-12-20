import React from 'react';
import Session from 'react-session-api';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Profile from './Profile';
import Cart from './Cart';
import { BsFillCartFill } from "react-icons/bs";
import Orders from './Orders';




export default function UserDashboard() {
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
    <div className="container-fluid ">
      <div className="row">
        <div className="col-3 my-5 px-5 rounded-circle">
        <ul class="list-group ">
        <Link to="/user/" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Welcome</li></Link>
        <Link to="/user/profile" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Profile</li></Link>
        <Link to="/user/basket" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Basket</li></Link>
        <Link to="/user/orders" style={{ textDecoration: 'none', color:'white' }} ><li class="list-group-item list-group-item-dark">Orders</li></Link>    

         </ul>
        </div>
        <div className="col-9 my-5">
        <Switch>
           <Route exact path="/user/">
             <Welcome />
           </Route>
           <Route path="/user/basket" >
             <Cart/>
           </Route>
           <Route path="/user/profile" >
             <Profile />
           </Route>
           <Route path="/user/orders" >
             <Orders/>
           </Route>
         </Switch>
         
        </div>
      </div>
      { Session.get('role')===3?
        <>
        <Link className='float' to="/user/basket">
        <BsFillCartFill className='my-float' style={{width:'36px',height:'36px'}} />
      </Link>
        </>:<></>
      }
    </div>
  </Router>
  )
}
