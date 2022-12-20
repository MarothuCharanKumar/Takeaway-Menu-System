import React,{useState,useEffect} from 'react'
import axios from '../axios/axios';
import Session from 'react-session-api'
import Loading from '../Loading/Loading';
import Table from 'react-bootstrap/Table'


export default function Orders() {
    
    const [data, setData] = useState('');
    const id= Session.get('_id')

     useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.userById({id});
        setData(response.data.data.orders)
    }
    fetchData();
    return () => {
      
    }
  }, [id])
  

if(data === ''){
    return <Loading/>
  }
  if(data.length===0){
    return <div className="container fluid">
        {
            <div className="alert alert-dark text-center my-5" role="alert">
                You have placed no orders!!.
          </div>
        }
    </div>
}
  else
  return (
    <div className='container-fluid'>

        <div className="row my-5 text-center">
          <h4 className="text-center mb-3">Your Orders</h4>
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
        data.map((order,key)=>{
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
