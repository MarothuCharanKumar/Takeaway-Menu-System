import React,{useEffect,useState} from 'react';
import axios from '../axios/axios';
import { Chart } from "react-google-charts";
import randomColor from "randomcolor";
import Loading from '../Loading/Loading';
import BarChart from 'react-easy-bar-chart';

export default function Welcome() {
  const [users, setUsers] = useState('')
  const [employees,setEmployees] = useState('')
  const [subscribers, setSubscribers] = useState('')
  const [orders, setOrders] = useState('');
  const [pie1,setPie1] = useState('');
  const [pie2,setPie2] = useState('');
  const [bar1,setBar1] = useState('');
  const [bar2,setBar2] = useState('');
  const [items,setItems] = useState('')

  useEffect(() => {
    
    const fetchAllDetails = async()=>{
      await axios.all_users().then((res)=>{
        setUsers(res.data.data)
      })
      await axios.all_employees().then(res=>{
        setEmployees(res.data.data)
      })
      await axios.all_subscribers().then(res=>{
        setSubscribers(res.data.data)
      })
      await axios.all_orders().then(res=>{
        setOrders(res.data.data)
        //grouping the data based on the date
        let result = res.data.data.reduce(function (r, a) {
          r[a.date] = r[a.date] || [];
          r[a.date].push(a);
          return r;
      }, Object.create(null));
      //calculating data for pie chart 1
   
      let keys = Object.keys(result)
      let temp =[["Date","No of Orders"]];
      keys.forEach(i=>{
        temp.push([i.toString(),result[i].length])
      })
      setPie1(temp);
      //calculating data for bar chart 1
      temp =[];
      keys.forEach(i=>{
        let color = randomColor();
        temp.push({
          title:i.toString(),
          value:result[i].length,
          color:color
        })
      })
      setBar1(temp);
      })

      await axios.all_items().then(res=>{
        setItems(res.data.data)
        //grouping the data based on the date
        let result = res.data.data.reduce(function (r, a) {
          r[a.type] = r[a.type] || [];
          r[a.type].push(a);
          return r;
        }, Object.create(null));
      //calculating data for pie chart 2
        let keys = Object.keys(result)
        let temp =[["items","quantity"]];
        keys.forEach(i=>{
          temp.push([
            i.toString(),result[i].length,
          
          ])
        })
        
      setPie2(temp);
      
      //calculating data for bar chart 2
      temp =[];
        keys.forEach(i=>{
          let color = randomColor();
          temp.push({
            title:i.toString(),
            value:result[i].length,
            color:color
          })
        })
        
      setBar2(temp);
      
      })
      
    }
    fetchAllDetails();
    
  }, [])
  if(bar2===''){
    return(
      <>
      <div className="row my-2 p-2">
        <div className="col"></div>
        <div className="col">
        <Loading />
        </div>
        <div className="col"></div>
      </div>
      </>
    )
  }
  return (
    <>
    <div className="row my-2">
      <div className="col border rounded p-2 m-1 border-primary">
          <p className='text-center'>No of Users <br/> {users.length}</p>
      </div>
      <div className="col border rounded p-2 m-1 border-warning">
          <p className='text-center'>No of Employees <br/> {employees.length}</p>
      </div>
      <div className="col border rounded p-2 m-1 border-danger">
          <p className='text-center'>No of Active Subscribers <br/> {subscribers.length}</p>
      </div>
      <div className="col border rounded p-2 m-1 border-info">
          <p className='text-center'>Total No of Orders <br/> {orders.length}</p>
      </div>
      <div className="col border rounded p-2 m-1 border-secondary">
          <p className='text-center'>Total No of Items <br/> {items.length}</p>
      </div>
    </div>
    <div className="row my-2 border rounded border-secondary">
      <h4 className="text-center m-1 p-2">
        Items Data
      </h4>
    </div>
    <div className="row my-2">
      <div className="col border rounded border-info m-1 p-2">
        <Chart chartType="PieChart" data={pie2} width={"100%"}   height={"400px"}/>
        <p className="text-center">Percentage of Items based on type</p>
      </div>
      <div className="col border rounded border-warning m-1 p-2">
      <BarChart 
          xAxis='Item Types'
          yAxis="Number of types"
          height={400}
          width={400}
          data={bar2}
        />
        </div>
    </div>
    <div className="row my-2 border rounded border-secondary">
      <h4 className="text-center m-1 p-2">
        Orders Data
      </h4>
    </div>
    <div className="row my-2">
      <div className="col border rounded border-info m-1 p-2">
      <Chart chartType="PieChart" data={pie1} width={"100%"}   height={"400px"}/>
        <p className="text-center">Percentage of Orders Date wise</p>
      </div>
      <div className="col border rounded border-warning m-1 p-2">
      <BarChart 
          xAxis='Dates'
          yAxis="Number of Orders"
          height={400}
          width={400}
          data={bar1}
        />
        </div>
    </div>

    </>
  )
}
