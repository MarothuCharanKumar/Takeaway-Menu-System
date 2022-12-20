import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './Payment';



export default function Strip(props) {

  const stripePromise = loadStripe("pk_test_51LVyjMDqAnDrwZTikchpOWqrQBG6VKp8dS2PWffFtPixxxRmOkUtbsicV9T6C3QocObIHBFmFHmtNYTUXn9uvpdy00Wa48jBDa");


  
  
  return (
    <Elements  stripe={stripePromise}>
       <Payment amount={props.amount} id={props.id}/>
    </Elements>
  )

  
}


