const WebSocket = require('ws');
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const http = require("http");

app.use(bodyParser.json());

const sql = require("sqlite3").verbose();
const port = process.env.PORT || 5000;
const gameDB = new sql.Database("tinderTable.db");

//console.log("SERVER IS SETUP")
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let emptydb = 0; //used later in the post request when inserting the vals into the db to ensure they dont get reinserted into the db everytime it runs.
let tableRdy = 0;
//check that db isnt made yet
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='TinderTable' ";
gameDB.get(cmd, function (err, val) {
  console.log(err, val);
  if (val == undefined) {
    console.log("No database file - creating one");
    //emptydb = 0;
    createDB();
  } else {
    emptydb = 1;
    console.log("Database file found");
  }
});

function createDB() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE TinderTable ( id INTEGER PRIMARY KEY, name TEXT, img_url TEXT, rating INTEGER, price TEXT, votes INTEGER, round INTEGER)';
  gameDB.run(cmd, function (err, val) {
    if (err) {
      console.log("Database creation failure", err.message);
    } else {
      console.log("Created database");
    }
  });
}
let dbObj = []; //This is the new restaurant object where I will be storing the restaurants from the db

function getDB() { //puts the db into dbObj

  const cmd = 'SELECT * FROM TinderTable';
  gameDB.all(cmd, function (err, val) {
    if (err) {
      console.log("Database retrieval failure", err.message);
    } else {
      console.log("got database");
      //console.log(val);
      dbObj = val;
      //console.log("database contains: ", dbObj);

    }
  });

}

app.post("/restList", async function (request, response, next) {
  //console.log("Server recieved",request.body);
  //newRestObj = request.body.businesses;
  //console.log(newRestObj);
  //console.log(request.body.Restaurants[0][0]);
  if (emptydb == 0) {
    for (let i = 0; i < request.body.Restaurants.length; i++) {

      let restName = request.body.Restaurants[i].name;
      let imgurl = request.body.Restaurants[i].image_url;
      let rating = request.body.Restaurants[i].rating;
      let price = request.body.Restaurants[i].price;



      cmd = "INSERT INTO TinderTable (name, img_url, rating, price, votes, round) VALUES (?,?, ?, ?, ?, ?) ";
      gameDB.run(cmd, restName, imgurl, rating, price, 0, 1, function (err) {
        if (err) {
          console.log("DB insert error", err.message);
          next();
        } else {
          // response.send("Got new item, inserted with rowID: "+newId);
        }
      });



    }

  }
  emptydb = 1;

  //calls getDB()

  getDB();

});


let numClients = 0;
let restIndex = 0;
let players = []; //players array to store their ws
let playersDone = 0;


wss.on('connection', (ws) => {

  ws.id = numClients++;
  ws.restIndex = 0;
  players[ws.id] = ws;
  console.log("connected");

  ws.on('message', (message) => {
    let cmdObj = JSON.parse(message);
    if (cmdObj.type == "test") {
      let rest = {
        'type': "restlist",
        'name': dbObj
      }
      // console.log("img url is: ", dbObj[0].img_url);
      console.log("in ws.on");
      broadcast(JSON.stringify(rest));
    }
  })
  ws.send('connected!')

})


function broadcast(data) { //send next restaurant in db
  wss.clients.forEach((client) => { //clients is the set of connections and client is the set of 
    if (client.readyState === WebSocket.OPEN) {
      client.send(data); //forwards string to other sockets
    }
  });
}

//app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});