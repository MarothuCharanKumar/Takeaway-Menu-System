import React,{useEffect, useState} from 'react'
import axios from '../axios/axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import messageDigest from 'js-md5';
import { ToastContainer,toast } from 'react-toastify';
import Loading from '../Loading/Loading';

export default function ModifyUser() {
    const [data,setData] = useState('')
    const [show, setShow] = useState(false);
    const [update,setUpdate] = useState(false);
    const [emp_objectId, setObjectId] = useState('');
    const [user_orders, setUser_orders] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = async (e,key) =>{
      e.preventDefault();
      let id = data[key]._id;
      let payload = {id}
      setObjectId(id);
      let response = await axios.userById(payload)
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setAddress(response.data.data.address);
      setCity(response.data.data.city);
      setPhone(response.data.data.phone);
      setPostalcode(response.data.data.postalcode);
      setOldPass(response.data.data.pass);
      setShow(true);
      updateUser();
    } 
    const handleDelete =async (e,key)=>{
      e.preventDefault();
      let id = data[key]._id;
      let payload = {id}
      await axios.deleteUser(payload).then(()=>{
          toast.success('User Deleted..!')
          setUpdate(!update)
      })
      .catch(e=>console.log(e))
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode , setPostalcode] = useState('')
    const [phone,setPhone] = useState('')
    const [changePass,setChangePass] = useState(false)
    const [oldPassword,setOldPass] = useState('')
    const [showOrders,setShowOrders] = useState(false)

  
    const updateUser = async(e)=>{
        e.preventDefault();
        if(name===''||email===''||address===''||city===''||postalcode===''||phone===''){
          toast.info('all fields must be filled');
          return 
        }
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
              setShow(false);
            }
            else{
              toast.error('Error happened please try again later.')
            }
          })
  }

  const handleShowOrders = async (e,key)=>{
      e.preventDefault();
      setShowOrders(true);
      let id = data[key]._id;
      let payload = {id}
      setObjectId(id);
      let response = await axios.userById(payload)
      setUser_orders(response.data.data.orders)
      
      
  }
  
    useEffect( () => {
      
      const fetchData=async()=>{
          let response = await axios.all_users();
          setData(response.data.data);
      }
      fetchData();
      return () => {
        
      }
    }, [update])
  
    if(data === ''){
      return <Loading />
    }
    else{
      return <div className="container">
         
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          <input type="text" className="form-control" id="inputEmail3" placeholder="Employee Id" value={email} onChange={e=>setEmail(e.target.value)} required disabled/>
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
          <input type="number" className="form-control" id="phone" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)}/>
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
  </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Update Details
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showOrders} onHide={()=>setShowOrders(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='container-fluid'>
        <div className="row my-5 text-center">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Item*Quantity</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {
        user_orders.map((order,key)=>{
          let sum =0;
          return(
            <tr>
              <td>{key+1}</td>
              <td>{order[0].order_date}</td>
              <td>
                
                {
                
                Object.keys(order).map((i,index)=>{
                  sum= sum+ parseFloat(order[i].order_price)*parseInt(order[i].order_quantity)
                  return <p>
                    {
                      order[i].order_name 
                    }
                    *
                    {
                      order[i].order_quantity
                    }
                  </p>
                })
                
                }
                </td>
                <td>
                
                {
                
                Object.keys(order).map((i,index)=>{
                  return <p className='text-right'>
                    {
                      order[i].order_price 
                    }
                    *
                    {
                      order[i].order_quantity
                    }
                    =
                    {
                      parseFloat(order[i].order_price)*parseInt(order[i].order_quantity)
                    }
                   
                  </p>
                })
                
                }
                 <hr/>
                 <b>Total={sum}</b>
                </td>
              

            </tr>
          )
        })
      }
      </tbody>
    </Table>
        </div>

  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowOrders(false)}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      
              <Table striped bordered hover>
              <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Modify</th>
                  <th>Delete</th>
              </tr>
              </thead>
              <tbody>
                  {
                    Object.keys(data).map(key=>{
                      return(
                        <tr key={key}>
                          <td>{parseInt(key)+1}</td>
                          <td>{data[key].name}</td>
                          <td>{data[key].email}</td>
                          <td>
                              {data[key].address}<br/>
                              {data[key].city}, {data[key].postalcode}
                          </td>
                          <td>{data[key].phone}</td>
                          <td>
                          <Button variant="primary" onClick={(event)=>handleShowOrders(event,key)}>
                              Orders
                          </Button> 
                          </td>
                          <td>
                          <Button variant="primary" onClick={(event)=>handleShow(event,key)}>
                              Edit User
                          </Button> 
                          </td>
                          <td> 
                          <Button variant="danger" onClick={(event)=>handleDelete(event,key)}>
                              Delete User
                          </Button> 
                          </td>
                        </tr>
                      )
                    })
                  }    
             </tbody>
              </Table>
              <ToastContainer position='bottom-right'/>    
          </div>
  
  
    }
}
