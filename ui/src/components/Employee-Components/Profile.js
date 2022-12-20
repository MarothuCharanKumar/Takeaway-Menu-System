import React,{useState,useEffect} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import axios from '../axios/axios';
import Spinner from 'react-bootstrap/Spinner'
import Session from 'react-session-api'


export default function Profile() {
    const [name, setName] = useState('')
    const [eid, setId] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode , setPostalcode] = useState('')
    const [phone,setPhone] = useState('')
    const [data, setData] = useState('');
    const [pass,setPass] = useState('');
    const id= Session.get('_id')
     useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.empById({id});
        setData(response.data.data);
        setName(response.data.data.name)
        setId(response.data.data.id)
        setAddress(response.data.data.address)
        setCity(response.data.data.city)
        setPostalcode(response.data.data.postalcode)
        setPhone(response.data.data.phone)
        setPass(response.data.data.pass)
        
    }
    fetchData();
    return () => {
      
    }
  }, [id])
  
    const updateEmployee = async(e)=>{
        e.preventDefault();
        let emp_objectId = id
        const payload = {emp_objectId,name,id,pass,address,city,postalcode,phone};
        await axios.updateEmp(payload).then(res=>{
          if(res.data.data.acknowledged){
            toast.success('Employee Details are updated')

          }
          else{
            toast.error('Error happened please try again later.')
          }
        })
        
  }
if(data === ''){
    return <div className="loading">
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <p>Loading ... </p>
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </div>
  }
  else
  return (
    <div className='container-fluid'>
      
    <div className="row ">
    <div className="col-1"></div>
    <div className="col-8 border rounded p-3">
    <h4 className="text-center">Your Details</h4>
    <form onSubmit={updateEmployee}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
           
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Employee ID</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputEmail3" placeholder="Employee Id" value={eid} onChange={e=>setId(e.target.value)} disabled/>
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
    <button type="submit" className="btn btn-primary">Update Details</button>
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
