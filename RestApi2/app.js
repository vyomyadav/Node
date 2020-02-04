const {Client} = require("pg");
const client = new Client({user:"postgres",
                           password:"postgres",
                           host:"localhost",
                           port:5432,
                           database:"todo"
});
start()
async function start(){
    console.log("a");
    await connect();
    console.log("b");
    const todo = await readtodo();
    console.log(todo);
    const SuccessCreate = await createtodo("Amara");
    console.log(`The SuccessCreate is ${SuccessCreate}`);
    const SuccessDelete = await deletetodo(1);
    console.log(`The DeleteCreate is ${SuccessDelete}`);
    await disconnect();
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
        return false;
    }   
    
}                          
