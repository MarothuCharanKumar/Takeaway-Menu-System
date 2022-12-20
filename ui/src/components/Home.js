import React,{useEffect,useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from './axios/axios';
import Loading from './Loading/Loading'


export default function Home() {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData=async()=>{
      await axios.all_home().then(res=>setData(res.data.data))
    }
    fetchData();
    
  }, [])
  

  if(data===''){
    return (
      <div className="row m-5 p-5">
      <div className="col-5"></div>
      <div className="col-5"><Loading/></div>
      <div className="col-2"></div>
      </div>
    )
  }

  return (
    <Carousel className='w-100 h-100'>
      {
        data.map(item=>{
          return(
            <Carousel.Item className='carousel-item'  interval={3000}>
            <img
              className="d-block w-100 bg"
              src={item.url}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className='text-warning'>{item.content}</h1>
              <h4 className='text-warning'>{item.subcon}</h4>
            </Carousel.Caption>
          </Carousel.Item>
          )
        })
      }
    </Carousel>

  )
}
