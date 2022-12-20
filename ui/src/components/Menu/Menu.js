import React,{useState,useEffect} from 'react'
import axios from '../axios/axios'
import Loading from '../Loading/Loading'
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from "react-bootstrap";
import Session from 'react-session-api';
import {ToastContainer,toast} from 'react-toastify'
import { BsFillCartFill } from "react-icons/bs";
import { Link} from 'react-router-dom';



export default function Menu() {
  const [data, setData] = useState('')
  const id = Session.get('_id');
  const [quantity,setQuantity] = useState(new Array(100).fill(1))
  const [update,setUpdate] = useState(false)
  const [fixedData,setFixedData] = useState('');
  const [keyword,setKeywords] = useState('');
  const [type,setType]  = useState([])
  
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
        //getting type of the items
        let temp =[];
        response.data.data.forEach(item=>{
            temp.push(item.type)
        })
        let unique = [...new Set(temp)]
        setType(unique)
       
    }
    fetchData();
    return () => {
      
    }
  }, [])

  const handleType=(e,item)=>{
    e.preventDefault();
    let temp =[];
        //serching based on the type
        console.log(fixedData)
        console.log(item)
        fixedData.forEach(element => {
            if(element.type===item)
                temp.push(element)
        });
        setData(temp)

  }
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
      if(id !== undefined){
            let order = data[key];
            console.log(order)
            let emp_objectId = id;
            let number = quantity[key];
            const date = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 
            const selected_item ={
                'order_id':order._id,
                'order_name':order.name,
                'order_price':parseFloat(order.price),
                'order_quantity':parseInt(number),
                'order_date':date     
            }
            let response = await axios.userById({id});
            let payload = response.data.data.basket;
            let previous_basket = payload
            let count = 0;
            
            for (let i = 0; i < payload.length; i++) {
                const element = payload[i];
                if(element.order_id===selected_item.order_id){
                    previous_basket[i].order_quantity+=selected_item.order_quantity
                    count++;
                }
                
            }
           
            if(count===0){
                previous_basket.push(selected_item)
            }
            payload = {
                'emp_objectId':emp_objectId,
                'basket':previous_basket,
            }
           
            await axios.handleBasket(payload).then(res=>{
                toast.success('successfully added to basket')
            })
            .catch(()=>toast.error('error happened'))

      }
      else{
          toast.info('Please login to add items to basket')
      }
  }
  if(data===''){
      return <div className="loading container-fluid">
          <div className="row m-5 p-5">
          <Loading/>
          </div>
      </div>
  }
  else{
      return (
        <Container fluid>
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
                        <div className="col-2"></div>
                        <div className="col-8">
                        <div class="alert alert-danger" role="alert">
                            No items found
                            </div>
                        </div>
                        <div className="col-2"></div>
                 </Row>:
                            <>
                            <div className="row gy-4  mx-2">
                                {
                                    type.map((i,key)=>{
                                        return (
                                            
                                            <div className="col m-1" key={key} onClick={(e)=>handleType(e,i)}>
                                               <div className="row">
                                               <button type="button" class="btn btn-outline-secondary">{i}</button>  
                                                </div>                                            
                                            </div>
                                          
        
                                        )
                                    })
                                }
                                <div className="col m-1">
                                               <div className="row" onClick={()=>{setData(fixedData)}}>
                                               <button type="button" class="btn btn-outline-secondary">Reset Filters</button>  
                                                </div>                                            
                                            </div>
                            </div>
                             <Row className="gy-4 my-5 mx-2">
                             {
                                 Object.keys(data).map(key=>{
                                     
                                    return (
                                     <Col key={key} xs={12} md={4} lg={3}>
                                         <Card className='h-100 d-flex  flex-column'>
                                             <Card.Img variant="top" src={data[key].url} />
                                             <Card.Body>
                                                 <Card.Title>{data[key].name}</Card.Title>
                                                 <Card.Text>
                                                     <Row className='p-2 border-top border-secondary'>
                                                         <Col xs={5} md={5} lg={5}><b>Ingredients</b></Col>
                                                         <Col xs={7} md={7} lg={7}><p>{data[key].Ingredients.join(",")}</p></Col> 
                                                     </Row>
                                                     <Row className='p-2 border-top border-secondary'>
                                                         <Col><b>Price</b></Col>
                                                         <Col><p>£ {data[key].price}</p></Col>
                                                     </Row>
                                                     <Row className='p-2 border-top border-secondary'>
                                                         <Col><b>Calories</b></Col>
                                                         <Col><p>{data[key].calories}KCal</p></Col>
                                                     </Row>
                                                     <Row className='p-2 border-top border-secondary form-row'>
                                                    
                                                         <Col>
                                                         <label for="colFormLabel" class="col-form-label"><b>Quantity</b></label>
                                                         </Col>
                                                         <Col>
                                                         <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                             <button type="button" class="btn btn-outline-secondary" onClick={(e)=>handleMinus(e,key)}>-</button>
                                                             <button type="button" class="btn btn-outline-secondary">{quantity[key]}</button>
                                                             <button type="button" class="btn btn-outline-secondary" onClick={(e)=>handlePlus(e,key)}>+</button>
                                                             
                                                         </div>
                                                         </Col>
                                                     </Row>
                                                 </Card.Text>
                                                 {data[key].availability?<Button className='mt-auto' variant="btn btn-warning" disabled={Session.get('role')===3||Session.get('role')===undefined?false:true} onClick={(e)=>addToBasket(e,key)}>Add to Basket</Button>:<p className='text-danger'>Unavailable</p>}
                                             </Card.Body>
                                         
                                        </Card>
                                    </Col>
                                    )
                                     
                                 })
                             } 
                             </Row>
                             </>
        }

            <ToastContainer position='bottom-right'/>
            { Session.get('role')===3?
        <>
        <Link className='float' to="/user/basket">
        <BsFillCartFill className='my-float' style={{width:'36px',height:'36px'}}/>
      </Link>
        </>:<></>
      }
        </Container>
      )
  }
}
