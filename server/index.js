//importing express 
const express = require('express');
//importing body-parser
const bodyParser = require('body-parser');
//importing cors
const cors = require('cors');
//initialising app using express 
const app = express();
//server will run at following port
const port = 5000;
require('dotenv').config();
//importing user controllers 
const user = require('./controllers/User')
//importing from all controllers
const admin = require('./controllers/Admin');
const process_payment = require('./controllers/Payment');
const employee = require('./controllers/Employee');
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`server is running on port ${port}!`))

//handling signup

app.post('/signup',async (req,res)=>{
    const payload = req.body;
    let response = await user.signup(payload);
    res.status(200).send(response)
})

//handling sign in
app.post('/signin', async (req,res)=>{
    const payload = req.body;
    let response = await user.signin(payload);
    res.status(200).send(response);
})

//add employee by admin

app.post('/add-employee',async (req,res)=>{
    const payload = req.body;
    let response = await admin.add_employee(payload);
    res.status(200).send(response)
})

//get all employees

app.get('/all-employee',async(req,res)=>{
    let response = await admin.all_employees();
    res.status(200).send(response)
})

//get employee by Id

app.post('/empById',async(req,res)=>{
    const payload = req.body;
    let response = await admin.employee_byID(payload);
    res.status(200).send(response);

})

//delete employee by ID

app.post('/deleteEmp',async(req,res)=>{
    const payload = req.body;
    let response = await admin.delete_employee(payload);
    res.status(200).send(response);
})

//update employee by ID

app.post('/updateEmp',async(req,res)=>{
    const payload = req.body;
    let response = await admin.update_employee(payload);
    res.status(200).send(response);
})

//get all users
app.get('/all-users',async(req,res)=>{
    let response = await admin.all_users();
    res.status(200).send(response);
})

//get employee by Id

app.post('/userById',async(req,res)=>{
    const payload = req.body;
    let response = await admin.user_byID(payload);
    res.status(200).send(response);

})

//delete user
app.post('/deleteUser',async(req,res)=>{
    const payload = req.body;
    let response = await admin.delete_user(payload);
    res.status(200).send(response);
})

//update user by ID

app.post('/updateUser',async(req,res)=>{
    const payload = req.body;
    let response = await admin.update_user(payload);
    res.status(200).send(response);
})

//add item 

app.post('/add-item',async (req,res)=>{
    const payload = req.body;
    let response = await admin.add_item(payload);
    res.status(200).send(response)
})

//get all items

app.get('/all-items',async(req,res)=>{
    let response = await admin.all_items();
    res.status(200).send(response)
})

//get all orders

app.get('/all-orders',async(req,res)=>{
    let response = await admin.get_orders()
    res.status(200).send(response)
})

//get all items

app.get('/all-subscribers',async(req,res)=>{
    let response = await admin.all_subscribers();
    res.status(200).send(response)
})

//verfication of user email id 
app.post('/verify',async(req,res)=>{
    const payload = req.body;
    let response = await user.verfication(payload)
    res.status(200).send(response)
})

//get item by Id

app.post('/itemById',async(req,res)=>{
    const payload = req.body;
    let response = await admin.item_byID(payload);
    res.status(200).send(response);

})

//delete item by ID

app.post('/deleteItem',async(req,res)=>{
    const payload = req.body;
    let response = await admin.delete_item(payload);
    res.status(200).send(response);
})

//update item by ID

app.post('/updateItem',async(req,res)=>{
    const payload = req.body;
    let response = await admin.update_item(payload);
    res.status(200).send(response);
})

// handle subscribe 

app.post('/subscribe', async(req,res)=>{
    const payload = req.body;
    let response = await user.handleSubscribe(payload);
    res.status(200).send(response)
})

//handle instructions

app.post('/instructions', async(req,res)=>{
    const payload = req.body;
    let response = await user.instructions(payload)
    res.status(200).send(response)
})
//handle basket 

app.post('/basket', async(req,res)=>{
    const payload = req.body;
    let response = await user.handleBasket(payload)
    res.status(200).send(response)
})
//clear basket 

app.post('/clear-basket', async(req,res)=>{
    const payload = req.body;
    let response = await user.clearBasket(payload)
    res.status(200).send(response)
})

app.post('/payment', async(req,res)=>{
    const payload = req.body;
    let success = await process_payment.payment(payload)
    res.status(200).send({data:success.status})
})

app.post('/orders', async(req,res)=>{
    const payload = req.body;
    let result = await user.handleOrder(payload).catch(e=>console.log(e));
    res.status(200).send({data:result})
})

//telephonic order by employee
app.post('/telephonic-order', async(req,res)=>{
    const payload = req.body;
    let result = await employee.handleOrder(payload).catch(e=>console.log(e));
    res.status(200).send({data:result})
})
//handle promotions

app.post('/promotions', async(req,res)=>{
    const payload = req.body;
    let result = await admin.handle_promotions(payload)
    res.status(200).send({data:result})
})

//add home page content 

app.post('/add-home',async (req,res)=>{
    const payload = req.body;
    let response = await admin.add_homePageContent(payload);
    res.status(200).send(response)
})

//get all items

app.get('/all-home',async(req,res)=>{
    let response = await admin.get_homePageContent();
    res.status(200).send(response)
})


//delete home item by ID

app.post('/deleteHomeItem',async(req,res)=>{
    const payload = req.body;
    let response = await admin.delete_homeitem(payload);
    res.status(200).send(response);
})

//update home item by ID

app.post('/updateHomeItem',async(req,res)=>{
    const payload = req.body;
    let response = await admin.update_homeitem(payload);
    res.status(200).send(response);
})
