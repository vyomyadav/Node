var amqp = require("amqplib/callback_api");
amqp.connect('amqp://vyomy:batman@localhost',(connerror,conn)=>{
    if(connerror){
        throw connerror;
    }
    conn.createChannel((err,ch)=>{
        if(err)
         throw err;
         const queue ='FirstQueue' 
         ch.assertQueue(queue);
         //Reading from the queue
         ch.consume(queue,(msg)=>{
             console.log(msg.content.toString());
         },{
             noAck:true
         }) 
    })
})