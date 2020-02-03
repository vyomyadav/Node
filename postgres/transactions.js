const Client = require('pg').Client;
const client = new Client({user:"postgres",
                           password:"postgres",
                           host:"localhost",
                           port:5432,
                           database:"test"
                          });
execute();
async function execute(){ 
    try{
        await client.connect();
        await client.query("BEGIN");
        await client.query("insert into person values ($1,$2,$3)",[2,"Vinod","Chopra"]);
        console.log("Inserted new String");
        await client.query("COMMIT");
    }
    catch(ex){
        console.log(`Failed ${ex}`);
        await client.query("ROLLBACK");
    }
    finally{
       
        await client.end();
        console.log("Cleaned");
    }
}                          