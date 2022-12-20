import React, {useEffect,useState} from 'react'
import Session from 'react-session-api';
import axios from '../axios/axios'
import Loading from '../Loading/Loading'

export default function Welcome() {
  const [data, setData] = useState('');
  const id= Session.get('_id')
  
  useEffect( () => {
    
    const fetchData=async()=>{
        let response = await axios.userById({id});
        setData(response.data.data);
        
    }
    fetchData();
    return () => {
      
    }
  }, [id])
  if(data === ''){
    return <Loading />
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
