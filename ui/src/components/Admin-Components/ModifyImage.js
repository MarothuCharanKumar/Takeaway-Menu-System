import React,{useEffect, useState} from 'react'
import axios from '../axios/axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import { ToastContainer,toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';


export default function ModifyImage() {
    const [data,setData] = useState('')
    const [show, setShow] = useState(false);
    const [update,setUpdate] = useState(false);
    const [item_objectId, setObjectId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = async (e,key) =>{
      e.preventDefault();
      let id = data[key]._id;
      setObjectId(id);
      setContent(data[key].content)
      setSubcon(data[key].subcon)
      setShow(true);
     
    } 
    const handleDelete =async (e,key)=>{
      e.preventDefault();
      let id = data[key]._id;
      let payload = {id}
      await axios.deleteHOMEItem(payload).then(()=>{
          toast.success('Item Deleted..!')
          setUpdate(!update)
      })
      .catch(e=>console.log(e))
    }
    const [content, setContent] = useState('')
    const [subcon, setSubcon] = useState('')

  
    const updateItem = async()=>{
          if(content===''||subcon===''){
            toast.info('all fields must be filled');
            return 
          }
          const payload = {item_objectId,content,subcon};
          await axios.updateHOMEItem(payload).then(res=>{
            if(res.data.data.acknowledged){
              toast.success('Item Details are updated')
              setUpdate(!update)
              setShow(false);
            }
            else{
              toast.error('Error happened please try again later.')
            }
          })
  }

 
    useEffect( () => {
      
      const fetchData=async()=>{
          let response = await axios.all_home()
          setData(response.data.data);
         
         
      }
      fetchData();
      return () => {
        
      }
    }, [update])
  
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
    else if(data.length===0){
      return <div className="no-data mt-5">
              <div class="alert alert-info" role="alert">
                  No data found in the database <br/>
                  Please add item to modify them
              </div>
      </div>
    }
    else{
      return <div className="container">
         
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={updateItem}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Content </label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Content " value={content} onChange={e=>{
            setContent(e.target.value)
            }} required/>
      </div>
    </div>

    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Sub Content</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="ingredients" placeholder="Sub Content" value={subcon} onChange={e=>setSubcon(e.target.value)} required/>
      </div>
    </div>
</form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateItem}>
              Update Details
            </Button>
          </Modal.Footer>
        </Modal>

              <Table striped bordered hover>
              <thead>
              <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Content</th>
                  <th>Sub Content</th>
                  <th>Modify</th>
                  <th>Delete</th>
              </tr>
              </thead>
              <tbody>
                  {
                    Object.keys(data).map(key=>{
                      return(
                        <tr key={key}>
                          <td>{parseInt(key)+1}</td>
                          <td><img src={data[key].url} width='150px' height='150px' alt=''></img></td>
                          <td>{data[key].content}</td>
                          <td>
                              {data[key].subcon}
                              
                          </td>
                         
                          <td>
                          <Button variant="primary" onClick={(event)=>handleShow(event,key)}>
                              Edit Item
                          </Button> 
                          </td>
                          <td> 
                          <Button variant="danger" onClick={(event)=>handleDelete(event,key)}>
                              Delete Item
                          </Button> 
                          </td>
                        </tr>
                      )
                    })
                  }    
             </tbody>
              </Table>
              <ToastContainer position='bottom-right'/>    
          </div>
  
  
    }
}
