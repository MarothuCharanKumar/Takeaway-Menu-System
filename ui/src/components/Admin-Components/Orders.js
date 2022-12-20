import React,{useState,useEffect} from 'react'
import axios from '../axios/axios';
import Loading from '../Loading/Loading';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';


export default function Orders() {
    
    const [data, setData] = useState('');
    const [dates,setDate] = useState('');
    const [fixedData,setFixedData] = useState('')


     useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.all_orders();
        let temp=[];
        response.data.data.forEach(order=>temp.push(order.date))
        let unique_dates = [...new Set(temp)]
        setDate(unique_dates)
        setData(response.data.data)
        setFixedData(response.data.data)
    }
    fetchData();
    return () => {
      
    }
  }, [])
  const handleDate=(e,date)=>{
      e.preventDefault();
      let temp = [];
      fixedData.forEach(order=>{
          if(date===order.date)
            temp.push(order)
      })
      setData(temp)
  }
  if(data==='')
    return <Loading/>
  else
    return(
        <div className='container-fluid'>
         <div className="row">
          <div className="col-8 m-1">
            
            <Dropdown className='row'>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Get Order Details based on Date
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            dates.map(date=>{
                return <Dropdown.Item onClick={(e)=>handleDate(e,date)}>{date}</Dropdown.Item>
            })
        }
       
      </Dropdown.Menu>
    </Dropdown>
             
          </div>
          <div className="col m-1">
            <div className="row">
            <button type="button" class="btn btn-outline-secondary" onClick={()=>setData(fixedData)} ><b>Get All Data</b></button>
            </div>
          </div>
        </div>
        <div className="row my-5 text-center">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>User Details</th>
          <th>Item*Quantity</th>
          <th>Instructions</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {
       data && data.map((order,key)=>{
          let sum =0;
          return(
            <tr>
                <td>{key+1}</td>
                <td>{order.date}</td>
                <td>Name: {order.user.name} <br/>
                    Address: {order.user.address} <br/>
                    Postal Code: {order.user.postalcode} <br/>
                </td>
                <td>
                
                {
                
                Object.keys(order.order).map((i,index)=>{
                  sum= sum+ parseFloat(order.order[i].order_price)*parseInt(order.order[i].order_quantity)
                  return <p>
                    {
                      order.order[i].order_name 
                    }
                    *
                    {
                      order.order[i].order_quantity
                    }
                  </p>
                })
                
                }
                </td>
                <td>{order.instructions}</td>
                <td>
                
                {
                
                Object.keys(order.order).map((i,index)=>{
                  return <p className='text-right'>
                  {
                      order.order[i].order_price
                  }
                  *
                  {
                      order.order[i].order_quantity
                  }
                   
                  </p>
                })
                
                }
                 <hr/>
                 <b>Total={sum.toFixed(2)}</b>
                </td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
        </div>

  </div>
    )
}
