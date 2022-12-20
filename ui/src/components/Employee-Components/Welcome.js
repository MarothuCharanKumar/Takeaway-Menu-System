import React, {useEffect,useState} from 'react'
import Session from 'react-session-api';
import axios from '../axios/axios'
import Spinner from 'react-bootstrap/Spinner'

export default function Welcome() {
  const [data, setData] = useState('');
  const id= Session.get('_id')
  useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.empById({id});
        setData(response.data.data);
        
    }
    fetchData();
    return () => {
      
    }
  }, [id])
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
  else{
    return(
      <div className="container">
        <div className="row my-5 p-3">
        <div class="alert alert-success" role="alert">
          <h3>Hello {data.name.toUpperCase()} , Welcome to Crunchy Spicy Restaurant</h3>
        </div>
        </div>
      </div>
    )
  }
}
