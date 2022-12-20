import React,{useState,useEffect} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import axios from '../axios/axios';
import Session from 'react-session-api'
import Loading from '../Loading/Loading';
import messageDigest from 'js-md5';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useHistory} from 'react-router-dom';


export default function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode , setPostalcode] = useState('')
    const [phone,setPhone] = useState('')
    const [data, setData] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [changePass,setChangePass] = useState(false)
    const [password, setPassword] = useState('')
    const id= Session.get('_id')
    const [update, setUpdate] = useState(false)
    const [emp_objectId, setObjectId] = useState('');
    const [oldPassword,setOldPass] = useState('');
    const [subscribed,setSubscribed] = useState('')
    const history = useHistory();
    
     useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.userById({id});
        setObjectId(id)
        setData(response.data.data);
        setName(response.data.data.name)
        setEmail(response.data.data.email)
        setAddress(response.data.data.address)
        setCity(response.data.data.city)
        setPostalcode(response.data.data.postalcode)
        setPhone(response.data.data.phone)
        setOldPass(response.data.data.pass)
        setSubscribed(response.data.data.subscribed)

        
    }
    fetchData();
    return () => {
      
    }
  }, [id,update])
  
  const updateUser = async(e)=>{
       
    e.preventDefault();
    let pass;
    if(changePass && password!=='' && confirmPassword!=='' && password===confirmPassword)
    {
      pass = messageDigest(password);
    }
    
    else if(changePass && (password==='' || confirmPassword==='' || password!==confirmPassword) ){
      toast.error('Please check password feild');
      return 
    }
    else{
      pass=oldPassword
    }
     
      const payload = {emp_objectId,name,email,pass,address,city,postalcode,phone};
      await axios.updateUser(payload).then(res=>{
        if(res.data.data.acknowledged){
          toast.success('User Details are updated')
          setUpdate(!update)
        }
        else{
          toast.error('Error happened please try again later.')
        }
      })
}

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

 
  const handleDelete =async (e,key)=>{
    e.preventDefault();
    let id = emp_objectId;
    let payload = {id}
    await axios.deleteUser(payload).then(()=>{
        toast.success('User Deleted..!')
        handleClose(); 
        Session.clear(); 
        history.push('/')
        setTimeout(() => {
          window.location.reload(true)
        }, 3000);
    })
    .catch(e=>console.log(e))
  }
  const handleSubscribe = async (e)=>{
    e.preventDefault();
    let value = ! subscribed
    const payload = {value, email,emp_objectId}
    await axios.handleSubscribe(payload).then(()=>{
      toast.success('successfully update')
      setUpdate(!update)
    })
    .catch(e=>console.log(e))
   
  }
if(data === ''){
    return <Loading/>
  }
  else
  return (
    <div className='container-fluid'>
     <div className="model">
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Delete Your Account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>If yes, please click on yes. Otherwise click on No</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
     </div>
      
    <div className="row ">
    <div className="col-1"></div>
    <div className="col-8 border rounded p-3">
    <h4 className="text-center">Your Details</h4>
    <form onSubmit={updateUser}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
           
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Email ID</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputEmail3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} disabled/>
      </div>
    </div>

<div className="form-group row my-1">
  <label for="inputAddress" className="col-sm-2 col-form-label"> Address</label>
  <div className="col-sm-10">
        <input type="text" className="form-control" id="Address" placeholder="1234 Main St" value={address} onChange={e=>setAddress(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="City" className="col-sm-2 col-form-label"> City</label>
  <div className="col-sm-10">
        <input type="text" className="form-control" id="city" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="City" className="col-sm-2 col-form-label"> Postal Code</label>
  <div className="col-sm-10">
        <input type="text" className="form-control" id="postal code" placeholder="Postal Code" value={postalcode} onChange={e=>setPostalcode(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="inputAddress" className="col-sm-2 col-form-label"> Phone Number</label>
  <div className="col-sm-10">
        <input type="number" className="form-control" id="Address" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
       <div class="form-check mx-5 px-5">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={()=>setChangePass(!changePass)} />
          <label class="form-check-label" for="flexCheckDefault">
              Change Password
          </label>
          </div>
        
      </div>
   
      {changePass?<>
          <div className="form-group row my-1">
        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
      </div>
      <div className="form-group row my-1">
        <label for="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" placeholder="Confirm Password" value={confirmPassword}  onChange={e=> setConfirmPassword(e.target.value)         } required/>
        </div>
      </div></>:<></>}
<div className="form-group row my-1">
  <div className="col-sm-10">
    <button type="submit" className="btn btn-primary">Update Details</button>
  </div>
</div>
</form>
    </div>
    <div className="col-3"></div>
    </div>
    <div className="row my-3">
      <div className="col-1"></div>
      <div className="col-8">
       <div className="row">
         <div className="col">
           {subscribed?
           <button type="button" class="btn btn-outline-warning" onClick={handleSubscribe}>Unsubscribe for Promotional & Offers</button>:
           <button type="button" class="btn btn-outline-success" onClick={handleSubscribe}>Subscribe for Promotional & Offers</button>
          }
         
         </div>
         <div className="col">
         <button type="button" class="btn btn-outline-danger" onClick={handleShow}>Delete My Account</button>
         </div>
       </div>
      </div>
      <div className="col-3"></div>   
    </div>


    <ToastContainer position='bottom-right'/>
  </div>
  )
}
