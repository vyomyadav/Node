const {Client} = require("pg");
const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());
const client = new Client({user:"postgres",
                           password:"postgres",
                           host:"localhost",
                           port:5432,
                           database:"todo"
});
app.get("/todos",async (req,res)=>{
    const rows = await readtodo();
    res.send(rows);
})
app.post("/todos",async (req,res)=>{
    let result = {};
    try{
    await createtodo(req.body.test);
    result.success = true;
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);
        }
})
app.delete("/todos",async (req,res)=>{
    let result = {};
    try{
      await deletetodo(req.body.id);
      result.success = true;
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);

    }
})
app.put("/todos",async(req,res)=>{
    let result = {};
    try{
        result.success = await puttodo(req.body.id,req.body.test);
    }
    catch(e){
         console.log(e);
         result.success = false;
    }
    finally{
       res.send(result);
    }
  
})
start()
async function start(){
    await connect();
    /*const todo = await readtodo();
    console.log(todo);
    const SuccessCreate = await createtodo("Amara");
    console.log(`The SuccessCreate is ${SuccessCreate}`);
    const SuccessDelete = await deletetodo(1);
    console.log(`The DeleteCreate is ${SuccessDelete}`);
    await disconnect();*/
}                           
async function connect(){
    try{
        await client.connect();
    }
    catch(ex){
        console.log("Error failed to connect");
    }
}
async function disconnect(){
    try{
        await client.end();
    }
    catch(ex){
        console.log("Error failed to disconnect");
    }
}
async function readtodo(){
    try{
        const result = await client.query("Select id, test from todo");
        return result.rows;
    }
    catch(e){
        return [];
    }   
}
async function createtodo(test){
    try{
        await client.query("Insert into todo (test) values($1)",[test]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deletetodo(id){
    try{
        await client.query("delete from todo where id = $1",[id]);
        return true; 
    }
    catch(e){
        console.log(e);
        return false;
    }   
    
}  
async function puttodo(id,test){
    try{
       const result = await client.query("select count(*) from todo where id = $1",[id]);
       if(result.rows[0].count==0)
       return false
       else
       await client.query("update todo set test = $1 where id = $2",[test,id]);
       return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}                        

// port enivronment variable
const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listen on port ${port}...`));