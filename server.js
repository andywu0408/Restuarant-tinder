const WebSocket = require('ws');
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const http = require("http");

app.use(bodyParser.json());

const sql = require("sqlite3").verbose();
const port = process.env.PORT || 5000;

console.log("SERVER IS SETUP")

// console.log that your server is up and running

app.post("/restList", function(request, response, next) {
    console.log("Server recieved",request.body);
    //newRestObj = request.body.businesses;
    //console.log(newRestObj);
    /*if(emptydb == 0) {
    for(let i = 0; i < request.body.businesses.length; i++) {
      
      let restName = request.body.businesses[i].name;
      let imgurl = request.body.businesses[i].image_url;
      let rating = request.body.businesses[i].rating;
      let price = request.body.businesses[i].price;
      
    
    
    cmd = "INSERT INTO TinderTable (name, imgurl, rating, price, votes, round) VALUES (?,?, ?, ?, ?, ?) ";
    gameDB.run(cmd,restName, imgurl, rating, price, 0, 1, function(err) {
      if (err) {
        console.log("DB insert error",err.message); 
        next();
      } else {
       // response.send("Got new item, inserted with rowID: "+newId);
      }
    });
      
    
    
    }
      
    }*/
    //emptydb = 1;
    
    //getDB(); //calls getDB()
    
    
  });



  app.listen(port, () => console.log(`Listening on port ${port}`));
