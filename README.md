Team Members: Che-An(Andy) Wu, Xiaoxiao(Annie) Qin, Tammer Mohamed
----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
- **Steps to run the project locally:**
----------------------------------------------------------------------------------------------------------------
**setup**
  - First, clone the project from github, and then in the project directory, do `yarn install` to install all dependencies listed in package.json. (or you can use 'npm' as well)
  
**starting the project locally**

  - Second, `$ node server.js` to start the server. Make sure that after you did this command, the console says, **No database file - creating one** If this is not displaying, please make sure that you closed all the tabs or any other servers you forgot to close. (We drop the db when all players/host quit, so it is essential that no server/localhost is active at the time of starting).     --> the game won't work as expected if you don't see the console log statement above and continue to play.
  - Third, `yarn start` as long as you have all the packages installed, and make sure theres no other servers are running or data base files. You should be directed to browser and see the host page with search control.
  - Fourth, after selecting all the search selections, click start game, please make sure you open the gameroom link on the homepage of our project in a **new tab** instead of just clicking on it and directing to it. Make sure homepage does not close, and it stays there during the game time. **The host page must be active throughout the game play, it can't be refreshed or closed down, or else our server will drop the database and stop the game. Due to the limited scope of our project requirement/time, we can't handle multiple games and a game must end before a new one can start. Also host page must stay active)
  - Fifth, start swiping! It is little hard to swipe because of the swipe library we're using (sorry, but it works!). The game will enter to the next round only when everyone finishes with swiping cards. (If a player finish swiping for a round but someone hasn't finish, the finished player will have blank card space and have to wait) When a card swiped right by everyone, a popup modal will be displayed for every player with the winner in it.
  - Sixth, if you want to start a new game, make sure you closed all of the servers and new tabs, and then repeat from the first step. 
----------------------------------------------------------------------------------------------------------------

**Notes for the team:**
- Make sure you have either "yarn" or "npm" installed (these are package managers)
- If this is your first time cloning the project to your local env, make sure you do "yarn install" or "npm install" first to download all the dependencies.
- To start the project locally
- 1. run "node server.js" to start the server
- 2. run "yarn start" or "npm start" in terminal (make sure you do this in the project directory)
** MAKE SURE you close the original "host" tab (original homepage) and restart the server each time so the DB will be dropped/created correctly **
