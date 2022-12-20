import React,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from '../axios/axios';
import {ToastContainer,toast} from 'react-toastify'
import Loading from '../Loading/Loading';
import {  Row } from "react-bootstrap";

export default function TelephonicOrder() {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalcode , setPostalcode] = useState('')
  const [phone,setPhone] = useState('')
  const [sum, setSum] = useState(0)
  const [instructions,setInstructions] = useState('')

  const handleClose = () => {
      setShow(false);
      setShow2(false);
      setShow3(false);
  }
  const [show3, setShow3] = useState(false)
  const [show, setShow] = useState(false);
  const [data, setData] = useState('')
  const [quantity,setQuantity] = useState(new Array(100).fill(1))
  const [update,setUpdate] = useState(false)
  const [fixedData,setFixedData] = useState('');
  const [keyword,setKeywords] = useState('');
  const [basket,setBasket] = useState([]);
  const [show2, setShow2] = useState(false)
  
  const handleSearch =(keywords)=>{
    setKeywords(keywords)
    if(keywords.length===0)
        setData(fixedData)
    else{
        let temp =[];
        //serching based on the name of the item
        fixedData.forEach(element => {
            if(element.name.toLowerCase().match(keywords.toLowerCase()))
                temp.push(element)
        });
        setData(temp)
    }
  }
  
  useEffect( () => {
      
    const fetchData=async()=>{
        let response = await axios.all_items();
        setData(response.data.data);
        setFixedData(response.data.data)
       
    }
    fetchData();
    return () => {
      
    }
  }, [])

  const handleMinus=(e,key)=>{
      e.preventDefault();
      let temp = quantity;
      let k = temp[key]
      if(k>1)
        k = k-1;
      temp[key]=k;
      setQuantity(temp)
      setUpdate(!update)

  }
  const handlePlus=(e,key)=>{
    e.preventDefault();
    let temp = quantity;
    let k = temp[key]
    k = k+1;
    temp[key]=k;
    setQuantity(temp)
    setUpdate(!update)
  }
  const addToBasket=async(e,key)=>{
    
    e.preventDefault();
    let order = data[key];
    let number = quantity[key];
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 
    const selected_item ={
        'order_id':order._id,
        'order_name':order.name,
        'order_price':parseFloat(order.price),
        'order_quantity':parseInt(number),
        'order_date':date     
    }
    let previous_basket = basket
    let count = 0;
    
    for (let i = 0; i < basket.length; i++) {
        const element = basket[i];
        if(element.order_id===selected_item.order_id){
            previous_basket[i].order_quantity+=selected_item.order_quantity
            count++;
        }
        
    }
    
    if(count===0){
        previous_basket.push(selected_item)
    }
            
    setBasket(previous_basket)
    toast.success('Item addet to basket')
    
      
  } 
  const handleOrder = async()=>{
      if(name===''||address===''||city===''||postalcode===''||phone==='')
            {
                toast.error('Please fill all the user details');
                return 
            }
      if(basket.length===0){
          toast.error('Plese add items to the basket');
          return 
      }
      const user = {
          name,address,city,postalcode,phone
      }
      const order ={basket}
      const payload = {user,order,instructions}
      console.log(payload)

      axios.telephonic_order(payload).then(()=>toast.success('order Placed successfully'))
      .catch(()=>toast.error('error happened. Please try after sometime'))
      setShow3(false)

  }
  return (
    <div className="container">
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
           
            }} required/>
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
        <input type="number" className="form-control" id="phone" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} required/>
      </div>
</div>

</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                data===''? <Loading/>:
                <>
                <Row className='my-5 mx-2'>
                       <div className="row-2"></div>
                       <div className="row-8">
                       <div class="input-group mb-3">
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={keyword} onChange={(e)=>{handleSearch(e.target.value);setKeywords(e.target.value)}}/>
                            <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
                            </div>
                       </div>
                       <div className="row-2"></div>
                </Row>
                {data.length===0?
                            <Row className='my-5 mx-2'>
                            <div className="row-2"></div>
                            <div className="row-8">
                            <div class="alert alert-danger" role="alert">
                                No items found
                                </div>
                            </div>
                            <div className="row-2"></div>
                     </Row>:
                                
                        <div className="items" style={{overflowY: 'scroll', height:'400px', overflowX:'hidden'}}>
                             {
                                     Object.keys(data).map(key=>{
                                         
                                        return (
                                            <div className="row border rounded border-5 my-2 mx-3 p-1">
                                                <p className="text-center"><b>{data[key].name}</b></p>
                                                <div className="row">
                                                    <div className="col">
                                                        Ingredients
                                                    </div>
                                                    <div className="col">
                                                    {data[key].Ingredients.join(",")}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        Price
                                                    </div>
                                                    <div className="col">
                                                    £ {data[key].price}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">Quantity</div>
                                                    <div className="col">
                                                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                            <button type="button" class="btn btn-outline-secondary" onClick={(e)=>handleMinus(e,key)}>-</button>
                                                            <button type="button" class="btn btn-outline-secondary">{quantity[key]}</button>
                                                            <button type="button" class="btn btn-outline-secondary" onClick={(e)=>handlePlus(e,key)}>+</button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row p-5">
                                                {data[key].availability?<Button className='mt-auto' variant="btn btn-warning" onClick={(e)=>addToBasket(e,key)}>Add to Basket</Button>:<p className='text-danger'>Unavailable</p>}
                                                </div>
                                            </div>

                                        )
                                         
                                     })
                                 } 
                        </div>
                        
                                }
                                </>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                basket.length===0?<b>Please add items first</b>:
                <>
                        <table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
  {
            
            basket.map((item,key)=>{
              //  setTotal(total+(parseFloat(item.order.price)*parseInt(item.number)))
                return(
                    <tr key={key}>
                    <td>{key+1}</td>
                    <td>{item.order_name}</td>
                    <td>{item.order_quantity}</td>
                    <td>{item.order_price}</td>
                    <td>{(parseFloat(item.order_price)*parseInt(item.order_quantity)).toFixed(2)}</td> 
                    </tr>
                )
            })
        }
  </tbody>
 
</table>
        <b>Total=£{sum.toFixed(2)}</b>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Add Cooking Instructions(Optional)</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={instructions} onChange={e=>setInstructions(e.target.value)}></textarea>
          <button type="button" class="btn btn-outline-secondary my-3" onClick={(e)=>{
            setInstructions(instructions);
            toast.success('instructions saved!!')
            }}>Save Instructions</button>
        </div>
                </>
            }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="row">
            <h6>Follow Below Steps</h6>           
        </div>
        <div className="row my-3">
         <button type="button" class="btn btn-outline-secondary btn-sm" onClick={()=>setShow(true)}>Add User Details</button>
        </div>
        <div className="row my-3">
         <button type="button" class="btn btn-outline-secondary btn-sm" onClick={()=>setShow2(true)}>Add Order Details</button>
        </div>
        <div className="row my-3">
         <button type="button" class="btn btn-outline-secondary btn-sm" onClick={()=>{
             setShow3(true);
             let total =0;
             basket.forEach(item => {
             total+=parseFloat(item.order_price)*parseInt(item.order_quantity)
              });
             setSum(total)
             }}>Check Out</button>
        </div>

        <ToastContainer position='bottom-right'/>
    </div>
  )
}
