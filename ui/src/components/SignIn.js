import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import messageDigest from 'js-md5';
import axios from './axios/axios';
import {useHistory} from 'react-router-dom';
import Session from 'react-session-api';

export default function SignIn(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSignIn= async(e)=>{
    e.preventDefault();
    let pass = messageDigest(password);
    const payload = {email,pass};
    await axios.signIn(payload).then(res=>{
      if(res.data.userFound===1){
        toast.success('successfully loged in. Please wait for a moment');
        
        setTimeout(() => {
          if(res.data.role===1){
            Session.set('role',1);
            Session.set('_id',res.data.user._id);
            props.manageLogin(true);
            history.push('/admin');
          }
          if(res.data.role===2){
            Session.set('role',2);
            Session.set('_id',res.data.user._id);
            props.manageLogin(true);
            history.push('/employee');
          }
          if(res.data.role===3){
            Session.set('role',3);
            Session.set('_id',res.data.user._id);
            props.manageLogin(true);
            history.push('/user');
          }
        }, 3000);

      }
      else{
        toast.error('please check your credentials')
      }
    })
    


  }
  return (
    <>
      
    <div className="row my-5">
    <div className="col-3"></div>
    <div className="col-6 border border-info rounded p-3">
    <h4 className="text-center">Sign In</h4>
    <form onSubmit={handleSignIn}>
    <div className="form-group row my-1">
      <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
      <div className="col-sm-10">
        <input type="input" className="form-control" id="inputEmail3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
      </div>
    </div>
    <div className="form-group row my-1">
      <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
      <div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </div>
    </div>
    <div className="form-group row my-2">
      <div className="col-sm-10">
        <button type="submit" className="btn btn-primary">Sign in</button>
      </div>
    </div>
    </form>
        </div>
        <div className="col-3"></div>
        </div>
        <div className="row my-3">
          <div className="col-3"></div>
          <div className="col-6">
            <p className="text-center">
              Do not have Account?
              <Link className="nav-link" to="/signup">Sign Up Here..</Link>
            </p>
          </div>
          <div className="col-3"></div>
        </div>
        <ToastContainer position='bottom-right'/>
      </>
  )
}
