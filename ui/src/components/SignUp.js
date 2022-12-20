import axios from './axios/axios';
import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import messageDigest from 'js-md5';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalcode , setPostalcode] = useState('')
  const [phone,setPhone] = useState('')
  const [otp,setOtp] = useState('');
  const history = useHistory();
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [original_otp,setOrgOtp] = useState('');
  

  const verifyUser = async (e)=>{
    e.preventDefault();
    setShow(true);
    const payload = {name,email}
    let res = await axios.verify_user(payload);
    console.log(res)
    setOrgOtp(res.data.otp);
  }
  const verifyOtp= async (e)=>{
    e.preventDefault();
    if(parseInt(otp) ===parseInt(original_otp)){
      toast.success('Verification successful')
      setTimeout(() => {
        handleClose();
      }, 3000);
      if(password===confirmPassword){
    
        let pass = messageDigest(password);
        let orders =[]
        let basket =[]
        let instructions='';
        let subscribed = false;
        const payload = {name,email,pass,address,city,postalcode,phone, orders,basket, subscribed,instructions};
        await axios.signUp(payload).then(res=>{
          if(res.data.alerdyExist){
            toast.error('Email already present')
          }
          else{
            toast.success('Successfully register. Now you will be redirected to login page')
            setTimeout(()=>{
              history.push('/signin');
            },3000)
          }
        })
      }
      else{
        toast.error('both password must be the same')
      }
    }
    else{
      toast.error('OTP is not correct')
    }
  }
  return (
    <div className='container-fluid'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Email Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-3 p-3">
            <label>Please enter One Time Password</label> <br/><br/>
            <input type='number' placeholder='please enter otp' value={otp} onChange={(e)=>setOtp(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={otp.length===4?verifyOtp:()=>toast.error('otp length must be 4')}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-5">
      <div className="col-3"></div>
      <div className="col-6 border rounded p-3">
      <h4 className="text-center">Sign Up</h4>
      <form onSubmit={verifyUser}>
      <div className="form-group row my-1">
        <label for="Name" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        </div>
      </div>
      <div className="form-group row my-1">
        <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
      </div>
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
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </div>
  </div>
</form>
      </div>
      <div className="col-3"></div>
      </div>
      <ToastContainer position='bottom-right'/>
    </div>
  )
}
