import React,{useState} from 'react'
import {ToastContainer,toast} from 'react-toastify'
import axios from '../axios/axios'


export default function Promotion(props) {

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const payload ={subject,message}
    await axios.promotion(payload).then(()=>{
        toast.success('success')
    })
    .catch(e=>toast.error('error happened',e))
    
    
   


  }
  return (
    <>
      
    <div className="row my-5">
    <div className="col-1"></div>
    <div className="col-10 border border-info rounded p-3">
    <h4 className="text-center">Send Promotional Email</h4>
    <form onSubmit={handleSubmit}>
    <div className="form-group row my-1">
      <label for="inputEmail3" className="col-sm-2 col-form-label">Enter subject</label>
      <div className="col-sm-10">
        <input type="input" className="form-control" id="subject" placeholder="Enter subject of the email" value={subject} onChange={(e)=>setSubject(e.target.value)} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputPassword3" className="col-sm-2 col-form-label">Enter Message of the email</label>
      <div className="col-sm-10">
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"  value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
      </div>
    </div>
    <div className="form-group row my-2">
      <div className="col-sm-10">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </div>
    </form>
        </div>
        <div className="col-1"></div>
        </div>

        <ToastContainer position='bottom-right'/>
      </>
  )
}
