import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React,{useState} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import axios from '../axios/axios';
import { storage  } from '../Firebase-storage/firebase';
export default function AddImage() {
  
  const [content, setContent] = useState('')
  const [subcon, setSubcon] = useState('')
  const [file,setFile] = useState('')
  const addItem = async(e)=>{
    e.preventDefault();
    //upload to firebase 
    const reference = ref(storage,`home-images/${file.name}`)
    const snap = await uploadBytes(reference,file)
    //getting image url from firebase
    const url =  await getDownloadURL(snap.ref)
    const payload = {content,subcon,url}
    await axios.add_home(payload).then(res=>{
      toast.success('added successfully')
    })
    .catch(e=>console.log(e))
  }
  return (
    <div className='container-fluid'>
      
    <div className="row ">
    <div className="col-1"></div>
    <div className="col-8 border rounded p-3">
    <h4 className="text-center">Add Home Page Content</h4>
    <form onSubmit={addItem}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Content</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="content" value={content} onChange={e=>{
            setContent(e.target.value)
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Subcontent</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="ingredients" placeholder="Sub Contents" value={subcon} onChange={e=>setSubcon(e.target.value)} required/>
      </div>
    </div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Image of the Item</label>
  <div className="col-sm-10">
        <input type="file" className="form-control" id="image" placeholder="select image of the item"  onChange={e=>setFile(e.target.files[0])} required/>
      </div>
</div>
<div className="form-group row my-1">
  <div className="col-sm-10">
    <button type="submit" className="btn btn-primary">Add Item</button>
  </div>
</div>
</form>
    </div>
    <div className="col-3"></div>
    </div>
    <ToastContainer position='bottom-right'/>
  </div>
  )
}
