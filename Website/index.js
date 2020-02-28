
const _ = require('lodash');
const express = require('express');
const app = express();

const stores = require('./data/stores.js');

app.get('/', function(req, res){
  res.send('Hello World!')
});

app.get('/stores', function(req, res){
  var response = [];
  console.log(req.query)
  
  // this would usually adjust your database query

  if(typeof req.query.title != 'undefined'){
    stores.filter(function(store){
      if(store.title === req.query.title){
        response.push(store);
      }
    });
  }
  if(typeof req.query.category != 'undefined'){
    stores.filter(function(store){
      if(store.category === req.query.category){
        response.push(store);
      }
    });
  }  
  if(typeof req.query.location != 'undefined'){
    stores.filter(function(store){
      if(store.location === req.query.location){
        response.push(store);
      }
    });
  }


  response = _.uniqBy(response, 'id');

  if(Object.keys(req.query).length === 0){
    response = stores;
  }

  res.json(response);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});