import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import {ToastContainer,toast} from 'react-toastify'
import React,{useState} from 'react'
import axios from '../axios/axios'
import Modal from 'react-bootstrap/Modal';
import Loading from '../Loading/Loading';
import { useHistory } from "react-router-dom";

export default function Payment(props) {
    const stripe = useStripe()
    const elements = useElements()
    const [show, setShow] = useState(false);
    const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault()
        handleShow();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if(error){
            setShow(false)
            toast.error(error.message);
        }
        if(!error) {
            const {id} = paymentMethod
            const user_id = props.id
            let result = await axios.payment( {  amount: props.amount*100,id })
            .catch(()=>toast.error('error happend please try again'))
            if(result.data.data==="succeeded"){
                handleClose();
                toast.success('Order placed succesful')
                await axios.order({user_id}).then(res=>{
                   history.push('/user/orders')
                })
                .catch(e=>console.log(e))
            }
           
        }
    }

    return (
        <>
        <Modal show={show} >
            <Modal.Header >
                <Modal.Title className='text-center'>Please wait..</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center"><Loading /></Modal.Body>
      </Modal>
        <form className='my-4 border border-rounded p-3' onSubmit={handleSubmit}>
            <h4 className="text-center">Checkout</h4>
             <div class="form-group my-2">
                <label for="exampleInputEmail1">Name on Card</label>
                <input type="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name" required/>
            </div>
            <div class="form-group my-2">
             <label for="card-element">Credit or debit card</label>
                 <div id="card-element" class="form-control" style={{height: '2.4em', paddingTop: '.7em'}}>
                     <CardElement options={{ hidePostalCode: true }}/>
                </div> 
            </div>
            <button type="submit" className="btn btn-primary my-2">Checkout</button>
      </form>
      <ToastContainer position='bottom-right'/>         
      </>
    )
}
