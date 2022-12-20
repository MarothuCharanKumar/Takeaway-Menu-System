import axios from 'axios';
//creating base url
const api_calls = axios.create({baseURL:'http://localhost:5000'})

//signup api 
const signUp = payload => api_calls.post('/signup',payload);
//sign in api 
const signIn = payload => api_calls.post('/signin',payload);
//add employee api 
const add_employee = payload => api_calls.post('/add-employee',payload);
//get all employees
const all_employees =()=> api_calls.get('/all-employee');
//get emp by id
const empById =(payload)=> api_calls.post('/empById',payload);
//delete emp by id 
const deleteEmp = (payload) => api_calls.post('/deleteEmp',payload);
//update employee
const updateEmp = (payload) => api_calls.post('/updateEmp',payload);
//get all users
const all_users = ()=>api_calls.get('/all-users');
//get user by id
const userById = (payload) => api_calls.post('/userById',payload);
//delte user by id
const deleteUser = payload => api_calls.post('/deleteUser',payload)
//update user by id 
const updateUser = payload => api_calls.post('updateUser',payload)
//add item 
const addItem = payload => api_calls.post('/add-item',payload)
//get all employees
const all_items =()=> api_calls.get('/all-items');
//get emp by id
const itemById =(payload)=> api_calls.post('/itemById',payload);
//delete item by id 
const deleteItem = (payload) => api_calls.post('/deleteItem',payload);
//update item
const updateItem = (payload) => api_calls.post('/updateItem',payload);
//handle subscribe 
const handleSubscribe = payload => api_calls.post('/subscribe',payload)
//handle basket 
const handleBasket = payload =>api_calls.post('/basket',payload)
//clear basket 
const clearBasket = payload =>api_calls.post('/clear-basket',payload)
// handle instructions
const instructions = payload =>api_calls.post('/instructions',payload)
//handle payment 
const payment = payload => api_calls.post('/payment',payload)
//handle order 
const order = payload => api_calls.post('/orders',payload)
//handle promotions
const promotion = payload => api_calls.post('/promotions',payload)
//telephonic order 
const telephonic_order = payload => api_calls.post('/telephonic-order',payload)
//get all subscribers 
const all_subscribers =()=>api_calls.get('/all-subscribers');
//get all orders 
const all_orders =()=>api_calls.get('/all-orders');
//verify user 
const verify_user=(payload)=>api_calls.post('/verify',payload)
//add home
const add_home=(payload)=>api_calls.post('/add-home',payload)
//all home
const all_home =()=>api_calls.get('/all-home')
//delete home item by id 
const deleteHOMEItem = (payload) => api_calls.post('/deleteHomeItem',payload);
//update HOEM item
const updateHOMEItem = (payload) => api_calls.post('/updateHomeItem',payload);

//exporting all functions
const apis = {
    signUp,add_home,all_home,
    signIn,deleteHOMEItem,updateHOMEItem,
    add_employee,
    all_employees,
    empById,
    deleteEmp,
    updateEmp,
    all_users,instructions,
    userById,
    deleteUser,all_subscribers,verify_user,
    updateUser, handleSubscribe,handleBasket,clearBasket,
    addItem,all_items,itemById,deleteItem,updateItem,
    payment,order,promotion,telephonic_order,all_orders,
}

export default apis;