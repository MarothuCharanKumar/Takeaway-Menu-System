const db = require('../database/database');
const ObjectId = require('mongodb').ObjectID;
const sendEmail = require('../Hotmail/sendEmail');
//add employee
const add_employee = async (payload) =>{
    let result = await db.collection('employee').findOne({id:payload.id})
    if(result===null){
        await db.collection('employee').insertOne(payload).then(()=>{
            return({data:'inserted successfully',alerdyExist:0})
        })
    }
    else{
        return({alerdyExist:1})
    }
}

//get all employees
const all_employees = async () =>{
    let result =  await db.collection("employee").find({}).toArray();
    return {data:result}
}
//get employee by ID
const employee_byID = async (payload) =>{
    let result = await db.collection('employee').findOne({_id:ObjectId(payload.id)})
    return {data:result}
}
//delete employee by ID
const delete_employee = async (payload) =>{
    let result = await db.collection('employee').deleteOne({_id:ObjectId(payload.id)})
    return {data:result}
}
//update employee by ID
const update_employee = async (payload) =>{
    let result = await db.collection('employee').updateOne({_id:ObjectId(payload.emp_objectId)},{$set:{name:payload.name,pass:payload.pass,address:payload.address,city:payload.city,postalcode:payload.postalcode,phone:payload.phone}})
    return {data:result}
}
//get all users
const all_users = async ()=>{
    let result = await db.collection('users').find({}).toArray();
    return{data:result}
}

//get user by ID

const user_byID = async (payload) =>{
    let result = await db.collection('users').findOne({_id:ObjectId(payload.id)})
    return {data:result}
}

//delete user by ID
const delete_user = async (payload) =>{
    let result = await db.collection('users').deleteOne({_id:ObjectId(payload.id)})
    return {data:result}
}

//update user by ID
const update_user = async (payload) =>{
    let result = await db.collection('users').updateOne({_id:ObjectId(payload.emp_objectId)},{$set:{name:payload.name,pass:payload.pass,address:payload.address,city:payload.city,postalcode:payload.postalcode,phone:payload.phone}})
    return {data:result}
}
// add item
const add_item = async (payload) =>{
    let result = await db.collection('items').findOne({name:payload.name})
    if(result===null){
        await db.collection('items').insertOne(payload).then(()=>{
            return({data:'inserted successfully',alerdyExist:0})
        })
    }
    else{
        return({alerdyExist:1})
    }
}
//add home page content
// add item
const add_homePageContent = async (payload) =>{
        await db.collection('home-page').insertOne(payload).then(()=>{
            return({data:'inserted successfully',alerdyExist:0})
        })
}
//get all home page content 
const get_homePageContent = async () =>{
    let result =  await db.collection("home-page").find({}).toArray();
    return {data:result}
}
//get all items
const all_items = async () =>{
    let result =  await db.collection("items").find({}).toArray();
    return {data:result}
}


//get item by ID

const item_byID = async (payload) =>{
    let result = await db.collection('items').findOne({_id:ObjectId(payload.id)})
    return {data:result}
}

//delete item by ID
const delete_homeitem = async (payload) =>{
    let result = await db.collection('home-page').deleteOne({_id:ObjectId(payload.id)})
    return {data:result}
}

//update employee by ID
const update_homeitem = async (payload) =>{
   
    let result = await db.collection('home-page').updateOne({_id:ObjectId(payload.item_objectId)},{$set:{content:payload.content,subcon:payload.subcon}})
    return {data:result}
}

//handle promotions
const handle_promotions = async (payload)=>{
    let result = await db.collection('subscriptions').find({}).toArray();
    let emails =[];
    result.forEach(element=>emails.push(element.email))
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emails.join(','),
        subject: payload.subject,
        html: `${payload.message.replace(/\n/g, "<br />")}
        



        <p>From</p>
        <p>The Chrunchy Spicy Resturent</p>
        
        `,
      };
      sendEmail(mailOptions);

}
const all_subscribers = async (payload)=>{
    let result = await db.collection('subscriptions').find({}).toArray();
    return {data:result}
}
const get_orders = async ()=>{
    let result = await db.collection('orders').find({}).toArray();
    return {data:result}
}
//delete home item by ID
const delete_item = async (payload) =>{
    let result = await db.collection('items').deleteOne({_id:ObjectId(payload.id)})
    return {data:result}
}

//update item by ID
const update_item = async (payload) =>{
    let result = await db.collection('items').updateOne({_id:ObjectId(payload.item_objectId)},{$set:{name:payload.name,Ingredients:payload.Ingredients,calories:payload.calories,price:payload.price,type:payload.type,availability:payload.availability}})
    return {data:result}
}
const admin ={
    //exporting functions related to employee
    add_employee,  all_employees, employee_byID,delete_employee,update_employee,delete_homeitem,update_homeitem,
    //exporting user functions
    all_users,user_byID, update_user,delete_user,
    //exporting items functions
    add_item,all_items,item_byID,delete_item,update_item,get_orders,
    handle_promotions,all_subscribers,add_homePageContent,get_homePageContent
}



module.exports = admin;