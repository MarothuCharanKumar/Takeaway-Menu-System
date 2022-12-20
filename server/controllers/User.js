//importing database
const db = require('../database/database');
const sendEmail = require('../Hotmail/sendEmail');
const ObjectId = require('mongodb').ObjectID;
//configuring dotenv file 
require('dotenv').config();

//sign up 

const signup = async (payload) =>{
    let result = await db.collection('users').findOne({email:payload.email})
    if(result===null){
        await db.collection('users').insertOne(payload).then(()=>{
            let mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: payload.email,
                subject: 'Successful Registration',
                html: `<h1>Welcome</h1><b>Hi ${payload.name}</b>
                <br/><br/>


                <h3>We are happy to have you!!!</h3>
                <p>Thanks for registering with us</p>
                



                <p>From</p>
                <p>The Chrunchy Spicy Resturent</p>
                
                `,
              };
            
             sendEmail(mailOptions);
            return({data:'inserted successfully',alerdyExist:0})
        })
    }
    else{
        return({alerdyExist:1})
    }
}

//sign in 
const signin = async (payload) =>{
    //checking whether it is admin
    let admin = await db.collection('admin').findOne({email:payload.email,pass:payload.pass})
    if(admin!==null){
        //role 1 means admin
        return({data:'user_found',user:admin,userFound:1,role:1})
    }
    //checking wheter is is employee
    let employee =  await db.collection('employee').findOne({id:payload.email,pass:payload.pass})
    if(employee!==null){
        //role 2 means employee
        return({data:'user_found',user:employee,userFound:1,role:2})
    }
    let result = await db.collection('users').findOne({email:payload.email,pass:payload.pass})
    if(result!==null){
        //role 3 means user
        return({data:'user_found',user:result,userFound:1,role:3})  
    }
    //if no one is found 
    return({userFound:0})
}

// unsubscribe 
const handleSubscribe = async(payload)=>{
    await db.collection('users').updateOne({_id:ObjectId(payload.emp_objectId)},{$set:{subscribed:payload.value}})
    //checking email id is already present in the subscription collection
    let found = await db.collection('subscriptions').findOne({email:payload.email})
    
    if(found!==null){
        //if present removing email id from collection
        await db.collection('subscriptions').deleteOne({email:payload.email})
    }
    else{
        //otherwise ineserting into collection
        await db.collection('subscriptions').insertOne({email:payload.email})
    }
    return {data:'success'}
}
// handle basket
const handleBasket = async (payload) =>{
    let result = await db.collection('users').updateOne({_id:ObjectId(payload.emp_objectId)},{$set:{basket:payload.basket}})
    return {data:result}
}

// clear basket
const clearBasket = async (payload) =>{
    let result = await db.collection('users').updateOne({_id:ObjectId(payload.id)},{$set:{basket:[]}})
    return {data:result}
}
//set instructions
const instructions = async(payload)=>{
    await db.collection('users').updateOne({_id:ObjectId(payload.user_id)},{$set:{instructions:payload.instructions}})
    .then(()=>{
        return {success:true}
    })
    .catch(e=>console.log('error',e))
    
}
//handle order
const handleOrder = async (payload) =>{
    let result = await db.collection('users').findOne({_id:ObjectId(payload.user_id)})
    //updating orders

    await db.collection('users').updateOne({_id:ObjectId(payload.user_id)},{$push:{orders:result.basket}},{$set:{basket:[]}}).catch(e=>console.log('error',e))
    //updating basket
    await db.collection('users').updateOne({_id:ObjectId(payload.user_id)},{$set:{basket:[],instructions:''}}).catch(e=>console.log('error',e))
    //inserting into orders collections
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 
    const data = {user:result,order:result.basket,date:date,instructions:result.instructions}
    await db.collection('orders').insertOne(data)
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: result.email,
        subject: 'Order Placed',
        html: `<h1>Hi</h1><b>Hi</b>
        <br/><br/>


        <h4>Your order placed successfully </h4>
        



        <p>From</p>
        <p>The Chrunchy Spicy Resturent</p>
        
        `,
      };
    
     sendEmail(mailOptions);
    return {success:true}
}
const verfication = async (payload) =>{
    let maximum = 9999;
    let minimum = 1000;
    let y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    let onetimePassword =y;
    let mailOptions = {
        from:process.env.EMAIL_USERNAME,
        to: payload.email,
        subject: 'Email Confirmation',
        html: `<h1>Hello, ${payload.name}</h1>
        <br/><br/>

       <p> Please use the following one time password for the confirmation </p>
       <h4>One Time Password is ${onetimePassword} </h4> <br/><br/>
        <p>From</p>
        <p>The Chrunchy Spicy Resturent</p>
        
        `,
    };
     sendEmail(mailOptions);
     return {otp:onetimePassword}
    
}
const user ={
    signup,
    signin,
    handleSubscribe,
    handleBasket, handleOrder,clearBasket,verfication,instructions
}

//exporting 

module.exports=user;