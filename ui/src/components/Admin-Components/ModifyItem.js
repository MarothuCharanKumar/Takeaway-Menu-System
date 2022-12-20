import React,{useEffect, useState} from 'react'
import axios from '../axios/axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import { ToastContainer,toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';


export default function ModifyItem() {
    const [data,setData] = useState('')
    const [show, setShow] = useState(false);
    const [update,setUpdate] = useState(false);
    const [item_objectId, setObjectId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = async (e,key) =>{
      e.preventDefault();
      let id = data[key]._id;
      let payload = {id}
      setObjectId(id);
      let response = await axios.itemById(payload)
      setName(response.data.data.name);
      setCalories(response.data.data.calories);
      setPrice(response.data.data.price);
      setIngredients(response.data.data.Ingredients)
      setType(response.data.data.type)
      setAvailability(response.data.data.availability)
      setShow(true);
     
    } 
    const handleDelete =async (e,key)=>{
      e.preventDefault();
      let id = data[key]._id;
      let payload = {id}
      await axios.deleteItem(payload).then(()=>{
          toast.success('Item Deleted..!')
          setUpdate(!update)
      })
      .catch(e=>console.log(e))
    }
    const [ingredients, setIngredients] = useState('');
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [price,setPrice] = useState('')
    const [type, setType] = useState('')
    const [availability,setAvailability] = useState(true);
    
  
    const updateItem = async()=>{
          if(name===''||ingredients===''||calories===''||price===''||type===''){
            toast.info('all fields must be filled');
            return 
          }
          let Ingredients;
          if(ingredients.includes(',')){
            Ingredients =  ingredients.split(',')
          }
          else{
            Ingredients = Array(1).fill(ingredients)
          }
         
        
          const payload = {item_objectId,name,Ingredients,calories,price,type,availability};
          await axios.updateItem(payload).then(res=>{
            if(res.data.data.acknowledged){
              toast.success('Item Details are updated')
              setUpdate(!update)
              setShow(false);
            }
            else{
              toast.error('Error happened please try again later.')
            }
          })
  }

 
    useEffect( () => {
      
      const fetchData=async()=>{
          let response = await axios.all_items();
          setData(response.data.data);
         
      }
      fetchData();
      return () => {
        
      }
    }, [update])
  
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
    else if(data.length===0){
      return <div className="no-data mt-5">
              <div class="alert alert-info" role="alert">
                  No data found in the database <br/>
                  Please add item to modify them
              </div>
      </div>
    }
    else{
      return <div className="container">
         
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={updateItem}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Item Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Ingredients</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="ingredients" placeholder="Ingredients" value={ingredients} onChange={e=>setIngredients(e.target.value)} required/>
      </div>
    </div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Calories in KCal</label>
  <div className="col-sm-10">
        <input type="number" className="form-control" id="calories" placeholder="calories in KCal" value={calories} onChange={e=>setCalories(e.target.value)}/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Amount of the Item</label>
  <div className="col-sm-10">
        <input type="number" className="form-control" id="amount" placeholder="Enter amount" value={price} onChange={e=>setPrice(e.target.value)}/>
      </div>
</div>

<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Type of the Item</label>
  <div className="col-sm-10">
        <input type="text" className="form-control" id="type" placeholder="Enter type of item like bread/rice/chicken/..." value={type} onChange={e=>setType(e.target.value.toLowerCase().trim())}/>
      </div>
</div>

<div class="form-group row my-1">  
<label for="calories" className="col-sm-2 col-form-label"> Available</label>
<div className="col-sm-10">
<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={availability?true:false} onChange={()=>{setAvailability(!availability)}}/>
      </div>
  
</div>
</form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateItem}>
              Update Details
            </Button>
          </Modal.Footer>
        </Modal>

              <Table striped bordered hover>
              <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Calories</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Type</th>
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
                          <td><ul>{
                            Object.keys(data[key].Ingredients).map(i=><li>{data[key].Ingredients[i]}</li>)
                          }</ul></td>
                          <td>
                              {data[key].calories}
                              
                          </td>
                          <td>{data[key].price}</td>
                          <td>{data[key].availability?"Available":"Not Available"}</td>
                          <td>{data[key].type}</td>
                         
                          <td>
                          <Button variant="primary" onClick={(event)=>handleShow(event,key)}>
                              Edit Item
                          </Button> 
                          </td>
                          <td> 
                          <Button variant="danger" onClick={(event)=>handleDelete(event,key)}>
                              Delete Item
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
