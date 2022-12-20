const db = require('../database/database');
//handle order
const handleOrder = async (payload) =>{
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 
    const data = {user:payload.user,order:payload.order.basket,date:date,instructions:payload.instructions}
    await db.collection('orders').insertOne(data)
    return {success:true}
}
const employee ={
 handleOrder
}

//exporting 

module.exports=employee;