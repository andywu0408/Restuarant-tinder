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
  const cmd = 'CREATE TABLE TinderTable ( id INTEGER PRIMARY KEY, name TEXT, img_url TEXT, rating INTEGER, price TEXT, votes INTEGER, totalVotes INTEGER, round INTEGER)';
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

function updateDB(idnum, voteNum, totalVoteNum, roundnum) {
  console.log("updating votes");
  let id = idnum++;
  let votes = voteNum;
  let totvotes = totalVoteNum;
  let round = roundnum;

  gameDB.run('UPDATE TinderTable SET votes = $votes, totalVotes = $totvotes, round = $round WHERE id = $id',
    { $votes: votes, $id: id, $totvotes: totvotes, $round: round }, function (err, val) {
      if (err) {
        console.log("update failure", err.message);
      } else {
        console.log("update success");
      }
    });

}

function dropDB() {
  //delete the table dont need but maybe
  // table is compacted; not an issue here, but good practice
  const cmd = 'DROP TABLE TinderTable';
  gameDB.run(cmd, function (err, val) {
    if (err) {
      console.log("DROP failure", err.message);
    } else {
      emptydb = 0;
      console.log("DROP success");
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



      cmd = "INSERT INTO TinderTable (name, img_url, rating, price, votes, totalVotes, round) VALUES (?,?, ?, ?, ?, ?, ?) ";
      gameDB.run(cmd, restName, imgurl, rating, price, 0, 0, 1, function (err) {
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



});


let numClients = 0;
let players = []; //players array to store their ws
let playersDone = 0;
let round = 1;

wss.on('connection', (ws) => {

  ws.id = numClients++;
  ws.restIndex = 0;
  players[ws.id] = ws;

  console.log("new user joined, player number --", numClients)

  ws.on('message', (message) => {

    let cmdObj = JSON.parse(message);
    if (cmdObj.type == "test") {
      getDB();
      let rest = {
        'type': "restlist",
        'name': dbObj
      }

      broadcast(JSON.stringify(rest));
    }



    if (cmdObj.type == 'command' && cmdObj.selection == 0) { //vote no

      // updateDB(players[ws.id].restIndex, dbObj[players[ws.id].restIndex].votes, dbObj[players[ws.id].restIndex].totalVotes, round);

      if (players[ws.id].restIndex < dbObj.length - 1) {
        players[ws.id].restIndex++;

        /* let nextRest = {
           'type' : 'nextRest',
           'info' : dbObj[players[ws.id].restIndex]
         }
         players[ws.id].send((JSON.stringify(nextRest)));*/

        /*update progress
        let progressObj = {
            'type' : "prog",
            'votes': dbObj[players[ws.id].restIndex].votes,
            'numPlayers': numClients
          }
        broadcast(JSON.stringify(progressObj));
        */

      }

      else {
        playersDone++;
        if (playersDone == (numClients - 1)) {
          //will be adding in code to increment the round and the votes in db
          if (round == 3) {
            let winIndex = getMaxChosen(dbObj);

            let winner = {
              'type': "final",
              'value': dbObj[winIndex]
            }

            broadcast(JSON.stringify(winner))

          }
          else {
            players[ws.id].restIndex = 0;
            console.log("players done is ", playersDone, " and num clients is ", numClients);
            dbObj = removeandshuffle(dbObj);  //will remove 0 vote restaurants and shuffle them around
            playersDone = 0;
            round++;
            console.log("next round's dbobj has length: ", dbObj.length);
            let nextRound = {
              'type': "next",
              'value': dbObj,
              'roundNum': round
            } //send next round to everyone

            console.log("round is: ", round);
            broadcast(JSON.stringify(nextRound));

          }
        }
      }
    }

    if (cmdObj.type == 'command' && cmdObj.selection == 1) {
      dbObj[players[ws.id].restIndex].votes++; //increment the number of times chosen
      dbObj[players[ws.id].restIndex].totalVotes++;
      console.log(dbObj[players[ws.id].restIndex].name, " has been chosen ", dbObj[players[ws.id].restIndex].votes, " times this round",
        " and has ", dbObj[players[ws.id].restIndex].totalVotes, " cumulative votes");


      // updateDB(players[ws.id].restIndex, dbObj[players[ws.id].restIndex].votes, dbObj[players[ws.id].restIndex].totalVotes, round);

      /* check if one has been chosen 3 times will need to add*/
      if (dbObj[players[ws.id].restIndex].votes == (numClients - 1)) {

        console.log("You all chose: ", dbObj[players[ws.id].restIndex].name);
        /*send msg of winner*/
        let winner = {
          'type': "final",
          'value': dbObj[players[ws.id].restIndex]
        }
        broadcast(JSON.stringify(winner));

      }
      if (players[ws.id].restIndex < dbObj.length - 1) {
        players[ws.id].restIndex++;

        console.log("current restIndex for player ", ws.id, " is ", players[ws.id].restIndex);

        /*let nextRest = {
          'type': 'command',
          'info': dbObj[players[ws.id].restIndex] //send next restaurant to respective client
        }
        
        players[ws.id].send((JSON.stringify(nextRest)));*/
        /*update progress
        let progressObj = {
          'type' : "prog",
          'votes': dbObj[players[ws.id].restIndex].votes,
          'numPlayers': numClients
        }
      broadcast(JSON.stringify(progressObj)); */
      }

      else {
        playersDone++;
        console.log("player number ", ws.id, "is done, number of players done is: ", playersDone, " number of clients is ",
          numClients);
        players[ws.id].restIndex = 0;

        if (playersDone == (numClients - 1)) {
          if (round == 3) {
            let winIndex = getMaxChosen(dbObj);

            let winner = {
              'type': "final",
              'value': dbObj[winIndex]
            }

            broadcast(JSON.stringify(winner))

          }
          else {
            console.log("players done is ", playersDone, " and num clients is ", numClients);
            dbObj = removeandshuffle(dbObj);
            playersDone = 0;
            round++;
            console.log("next round's dbobj has length: ", dbObj.length);
            let nextRound = {
              'type': "next",
              'value': dbObj,
              'roundNum': round
            }
            console.log("round is: ", round);
            broadcast(JSON.stringify(nextRound)); //send next round of restaurants do this at end
          }
        }
      }
    }


  })
  ws.on('close', () => {
    numClients--;
    players.slice(ws.id, 1);
    console.log("a user disconnected now number of players is --", numClients);
    if (numClients == 0 && (emptydb == 1)) {
      console.log("host exited... dropping table");
      dropDB();
    }
    else if (ws.id == 0) {
      console.log("host exited... dropping table");
      dropDB();
    }
  });



  ws.send('connected!')

})

function removeandshuffle(restaurantObject) {

  //let newRests = [];
  let x, y;

  for (let i = 0; i < restaurantObject.length - 1; i++) {
    if (restaurantObject[i].votes == 0) {
      restaurantObject.splice(i, 1);
    }
  }

  //shuffle them 

  for (let i = restaurantObject.length - 1; i > 0; i--) {

    x = Math.floor(Math.random() * (i + 1));
    y = restaurantObject[i];
    restaurantObject[i] = restaurantObject[x];
    restaurantObject[x] = y;
  }

  for (let i = restaurantObject.length - 1; i > 0; i--) {
    restaurantObject[i].votes = 0;
  }

  return restaurantObject
}


function getMaxChosen(restobj) {

  let indexOfMax;
  let max;

  max = restobj[0].totalVotes;
  indexOfMax = 0;
  for (let i = 1; i < restobj.length - 1; i++) {

    if (restobj[i].totalVotes > max) {
      max = restobj[i].totalVotes;
      indexOfMax = i;
    }
    else if (restobj[i].totalVotes == max) {
      let newMaxIndex = Math.floor(Math.random() * (i - indexOfMax + 1)) + indexOfMax; //
      indexOfMax = newMaxIndex;
    }


  }

  return indexOfMax;

}

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