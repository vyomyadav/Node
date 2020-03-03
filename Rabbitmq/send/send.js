var express = require('express');
var app = express();
var ampq = require('amqplib/callback_api');
ampq.connect("amqp://vyomy:batman@localhost",(err,conn)=>{  
     if(err)
      throw err;
     conn.createChannel ((err,ch)=>{
        if(err)
         throw err 
        var queue ='FirstQueue';
        var message = {type:'2',content:'Hello RabbitMq'};
        ch.assertQueue(queue);
        ch.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
        console.log("Message was sent")
    });
    // setTimeout(()=>{
    //     conn.close();
    //     process.exit(0);},500);
    })
    
    