const express = require("express");
const joi = require("joi");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const customer = [
    {title: "SAm",id:1},
    {title: "Josh",id:2},
    {title: "Tyler",id:3},
    {title: "Alice",id:4},
    {title: "Candice",id:5},
    {title: "ADS",id:6}
]
app.get("/",(req,res) => {
    res.send("Welcome to rest api");
});
app.get("/api/customer",(req,res)=> {
  res.send(customer);
});
app.get("/api/customer/:id",(req,res)=>{
    const customers = customer.find(c=>c.id===parseInt(req.params.id));
    if(!customers) res.status(404).send("Request not found");
    res.send(customers);
});
app.post("/api/customer",(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }
    const customers = {
        id:customer.length+1,
        title:req.body.title
    };
    customer.push(customers);
    res.send(customers);
});
app.put("/api/customer/:id",(req,res)=>{
    const customers = customer.find(c=>c.id===parseInt(req.params.id));
    if(!customers) res.status(404).send("Request not found");
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }
    customers.title = req.body.title;
    res.send(customers);

});
app.delete("/api/customer/:id",(req,res)=>{
    const customers = customer.find(c=>c.id===parseInt(req.params.id));
    if(!customers) res.status(404).send("Request not found");
   
    const index = customer.indexOf(customers);
    customer.splice(index,1);
    res.send(customers);
});
// port enivronment variable
const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listen on port ${port}...`));
function validateCustomer(customer){
    const schema ={
        title:joi.string().min(1).required()
    };
    return joi.validate(customer,schema);
}
