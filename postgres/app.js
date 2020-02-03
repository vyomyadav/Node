const {Client} = require('pg');
const client = new Client({user:"postgres",
                           password:"postgres",
                           host:"localhost",
                           port:5432,
                           database:"test"});
start()
async function start(){
    await connect();
    const todo = await readtodo();
    console.log(todo);
    const SuccessCreate = await createtodo(4,"GrandMaster","Jojo");
    console.log(`The SuccessCreate is ${SuccessCreate}`);
    const SuccessDelete = await deletetodo(2);
    console.log(`The SuccessCreate is ${SuccessDelete}`);
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
        const result = await client.query("Select id, first_name from person");
        return result.rows;
    }
    catch(e){
        return [];
    }   
}
async function createtodo(id,first_name,last_name){
    try{
        await client.query("Insert into person (id,first_name,last_name) values($1,$2,$3)",[id,first_name,last_name]);
        return true;
    }
    catch(e){
        return false;
    }   
}
async function deletetodo(id){
    try{
        await client.query("delete from person where id = $1",[id]);
        return true; 
    }
    catch(e){
        return false;
    }   
    
}


