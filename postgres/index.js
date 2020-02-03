const Client = require('pg').Client;
const client = new Client({user:"postgres",
                          password:"postgres",
                          host:"localhost",
                          port:5432,
                          database:"test"});
client.connect().then(() => console.log("Success"))
.then(() => client.query("select * from person "))
.then(results=> console.table(results.rows))
.catch(e=>console.log("Error"))
.finally(()=>client.end());



