import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import Session from 'react-session-api';
import {ToastContainer,toast} from 'react-toastify'
import {useHistory,useLocation} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function NavBar(props) {
  
  const history = useHistory()
  const location = useLocation()
  const [show, setShow] = useState(false);
  const role =  Session.get('role',1);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    setShow(true);
    
  }

  const manageLogout=async ()=>{
    handleClose();
    toast.info("You will be logged out in a moment...");   
    setTimeout(() => {
      props.manageLogin(false);
      Session.clear(); 
      history.push('/')
    },3000);
   
  }
  if(props.isLoggedIn){
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>If yes, please click on yes. Otherwise click on No</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={manageLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary p-3 w-100">
<div className="container-fluid">
  <Link className="navbar-brand" to="/">Crunchy Spicy Restaurant</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-right">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">Home</Link>
      </li>
      <li className="nav-item">
          <Link className="nav-link" to="/menu">Menu</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to={role===1?"/admin":role===2?"/employee":"/user"}>Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={location} onClick={handleShow}>Sign Out</Link>
      </li>
     
    </ul>
  </div>
</div>
</nav>
<ToastContainer position='bottom-right'/>
  </div>
    )
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary p-3 w-100">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Crunchy Spicy Restaurant</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-right">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu">Menu</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      </ul>

    </div>
  </div>
</nav>
<ToastContainer position='bottom-right'/>
    </div>
  )
}
