import React,{useState,useEffect} from 'react'
import Session from 'react-session-api'
import { toast } from 'react-toastify';
import axios from '../axios/axios'
import Strip from '../Payment/Strip';

export default function Cart() {
  
  const [data, setData] = useState('')
  const id = Session.get('_id');
  const [total,setTotal] = useState(0)
  const [update,setUpdate] = useState(false)
  const [instructions,setInstructions] = useState('')
  const clearBasket=async(req,res)=>{
    await axios.clearBasket({id}).then(()=>{
      toast.success('Basket has been cleared')
      setTimeout(() => {
        setUpdate(!update)
      }, 3000);
    })
  }
  const handleInstructions=async(req,res)=>{
    if(instructions==='')
      {
        toast.info('instructions can not be empty')
        return
      }

    const payload = {
      user_id:id,
      instructions:instructions
    }
    await axios.instructions(payload).then(()=>{
      toast.success('Instructions saved successfully')
    })
  }
  useEffect(() => {
    const fetch=async()=>{
       await axios.userById({id}).then(res=>{
          setData(res.data.data.basket)
          let sum =0;
          res.data.data.basket.forEach(item => {
             
              sum+=parseFloat(item.order_price)*parseInt(item.order_quantity)
              console.log(parseFloat(item.order_price)*parseInt(item.order_quantity))
          });
          setTotal(sum.toFixed(2))
       }) 
    }
    fetch();
    return () => {
      
    }
  }, [id,update])
  if(data.length===0){
      return <div className="container fluid">
          {
              <div className="alert alert-dark text-center my-5" role="alert">
                  Your Basket is empty!!.
            </div>
          }
      </div>
  }
  return (
    <div className="container fluid">
        <div className="row my-5">
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
            
            data.map((item,key)=>{
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
        
        </div>
        <div className="row">
          <div className="col m-1">
            <div className="row">
            <button type="button" class="btn btn-outline-secondary" onClick={clearBasket}>Clear Basket</button>
            </div>
          </div>
          <div className="col m-1">
            <div className="row">
            <button type="button" class="btn btn-outline-secondary" disabled><b>Total = £{total}</b></button>
            </div>
          </div>
        </div>
        <div className="row my-3">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Add Cooking Instructions(Optional)</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={instructions} onChange={e=>setInstructions(e.target.value)}></textarea>
          <button type="button" class="btn btn-outline-secondary my-3" onClick={handleInstructions}>Save Instructions</button>
        </div>
        </div>
        <div className="row my-5">
          <Strip amount={total} id={id}/>
        </div>
    </div>
  )
}
