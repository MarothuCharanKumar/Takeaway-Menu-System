import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React,{useState} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import axios from '../axios/axios';
import { storage  } from '../Firebase-storage/firebase';
export default function AddItem() {
  const [ingredients, setIngredients] = useState('');
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [price,setPrice] = useState('')
  const [file,setFile] = useState('')
  const [type,setType] = useState('')
  const availability = true;
  const addItem = async(e)=>{
    e.preventDefault();
    //upload to firebase 
    const reference = ref(storage,`images/${file.name}`)
    const snap = await uploadBytes(reference,file)
    //getting image url from firebase
    const url =  await getDownloadURL(snap.ref)
    let Ingredients = ingredients.split(',')
    const payload = {name,Ingredients,calories,price,type,availability,url}
    await axios.addItem(payload).then(res=>{
      if(res.data.alerdyExist){
        toast.error('Item is  already present')
      }
      else{
        toast.success('Successfully Added.')
        
      }
    })
  }
  return (
    <div className='container-fluid'>
      
    <div className="row ">
    <div className="col-1"></div>
    <div className="col-8 border rounded p-3">
    <h4 className="text-center">Add Item</h4>
    <form onSubmit={addItem}>
    <div className="form-group row my-1">
      <label for="Name" className="col-sm-2 col-form-label">Item Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={e=>{
            setName(e.target.value)
            }} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputId" className="col-sm-2 col-form-label">Ingredients</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="ingredients" placeholder="Ingredients" value={ingredients} onChange={e=>setIngredients(e.target.value)} required/>
      </div>
    </div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Calories in KCal</label>
  <div className="col-sm-10">
        <input type="number" className="form-control" id="calories" placeholder="calories in KCal" value={calories} onChange={e=>setCalories(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Amount of the Item</label>
  <div className="col-sm-10">
        <input type="number" className="form-control" id="amount" placeholder="Enter amount in £" value={price} onChange={e=>setPrice(e.target.value)} required/>
      </div>
</div>
<div className="form-group row my-1">
  <label for="calories" className="col-sm-2 col-form-label"> Type of the Item</label>
  <div className="col-sm-10">
        <input type="text" className="form-control" id="type" placeholder="Enter type of the item like bread or rice" value={type} onChange={e=>setType(e.target.value.toLowerCase().trim())} required/>
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
