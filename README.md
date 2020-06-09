**IMPORTANT NOTES for GRADER**
----------------------------------------------------------------------------------------------------------------
----> p.s. thank you so much for a great quarter & grading our project!

----> Please look at the "**Note on essential steps of HOW TO TEST/PLAY WITH OUR PROJECT LOCALLY:**" section for how to test our project locally. 

----> The game is functional and meets all the project specs. If something is missing or not working, it is most likely error with the steps tester take when starting our project locally(for ex, closing down host tab while game is still in play, or not restarting server and closing all browser localhost tabs when playing new game.    **If needed, please feel free to email our team at chewu@ucdavis.edu, xaqin@ucdavis.edu or reach us directly via (408) 750 - 0852. Our team will check regulary and help clarify things ASAP**
----------------------------------------------------------------------------------------------------------------

**GRADING INFO**

**1) Why are we submitting this github repo instead of a glitch project?**
- because our project got **suspended** by Glitch at June 6th evening around 9pm for "Violating Terms of Service" for unknown reasons. We don't have access to our code/project on glitch anymore and switeched back to developing locally. IT IS A LOT OF CODE THAT WAS LOST! We started early and were on track to finish on time, but we had to rewrite huge chunk of our code again locally due to the glitch suspension.
- We notified the professor via both email and piazza post @1733 (https://piazza.com/class/k8eo96o9a0w1xn?cid=1733)
- Professor gave us permission to submit a github link instead via the email reply. 
- We emailed Glitch support but they still haven't gotten back to us :(
- The glitch project is still suspended as of 6/7/2020 6PM. Project link: https://tinder-project.glitch.me/
![screnshot](./Screen%20Shot%202020-06-06%20at%209.35.16%20PM.png)

**2) Why is our design different from Design Spec?**

- We started developing the project before it was announced that design spec for Tinder Project will be provided. We were pretty far down the road already, so professor told us to submit our design via the "Yearbook design" assignment on Canvas to get approval, in piazza post @1290(https://piazza.com/class/k8eo96o9a0w1xn?cid=1290)
- The Design TA, Emily, told us that we can continue to use our design via comment section under the "Yearbook design" assignment's submission. 
- ![screnshot](./Screen%20Shot%202020-06-07%20at%206.12.44%20PM.png)

**3) Other things to note **
- We did not add "Yes/No" buttons in game room for user to press on. This is because the instruction initially told us to implement card swiping instead of buttons. When the instruction was changed to use button instead, we have already implemented our card swiping feature. We also got approval from TA Emily that we can stick with our game room design.
- When you're grading locally, if anything does not work, please feel free to email us or text our teammate at 408-750-0852 if you need us to clarify anything. (The game should work perfectly)
- The game will enter to the next round only when everyone finishes with the cards

----------------------------------------------------------------------------------------------------------------
- **Note on essential steps of HOW TO TEST/PLAY WITH OUR PROJECT LOCALLY:**
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
