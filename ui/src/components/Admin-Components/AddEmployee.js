import React,{useState} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import messageDigest from 'js-md5';
import axios from '../axios/axios';

export default function AddEmployee() {

    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode , setPostalcode] = useState('')
    const [phone,setPhone] = useState('')

    const addEmployee = async(e)=>{
        e.preventDefault();
        if(password===confirmPassword){
          let pass = messageDigest(password);
          const payload = {name,id,pass,address,city,postalcode,phone};
          await axios.add_employee(payload).then(res=>{
            if(res.data.alerdyExist){
              toast.error('Employee Id is  already present')
            }
            else{
              toast.success('Successfully Added.')
            }
          })
    }
}

  return (
    <div className='container-fluid'>
      
    <div className="row ">
    <div className="col-1"></div>
    <div className="col-8 border rounded p-3">
    <h4 className="text-center">Add Employee</h4>
    <form onSubmit={addEmployee}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
            let temp = e.target.value;
            setId(temp.split(' ').join('.').toLowerCase())
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Employee ID</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputEmail3" placeholder="Employee Id" value={id} onChange={e=>setId(e.target.value)} required/>
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
    <button type="submit" className="btn btn-primary">Add Employee</button>
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
