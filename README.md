**IMPORTANT NOTES for GRADER**
----------------------------------------------------------------------------------------------------------------
----> p.s. thank you so much for a great quarter & grading our project!

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
- **Note on essential steps of HOW TO TEST/PLAY WITH OUR PROJECT:**
  - First, clone the project from github, and then `yarn install` to make sure everything is installed, including the font-awesone packages. 
  - Second, `$ node server.js` to start the server. Make sure that after you did this command, the console says, **No database file - creating one** If this is not displaying, please make sure that you closed all the tabs or any other servers you forgot to close. 
  - Third, `yarn start` as long as you have all the packages installed, and make sure theres no other servers are running or data base files. It should be fine to run. If there is any errors, please let us know. 
  - Fourth, make sure you open the gameroom link on the homepage of our project in a **new tab** instead of just clicking on it. Make sure homepage does not close, and it stays there during the game time. 
  - Fifth, the game will enter to the next round only when everyone finishes with swiping cards. When a card swiped right by everyone, a message will pop up to display the winner. 
  - Sixth, if you want to start a new game, make sure you closed all of the servers and new tabs, and then repeat from the first step. 
----------------------------------------------------------------------------------------------------------------







**Notes for the team:**
- Make sure you have either "yarn" or "npm" installed (these are package managers)
- If this is your first time cloning the project to your local env, make sure you do "yarn install" or "npm install" first to download all the dependencies.
- To start the project locally
- 1. run "node server.js" to start the server
- 2. run "yarn start" or "npm start" in terminal (make sure you do this in the project directory)
** MAKE SURE you close the original "host" tab (original homepage) and restart the server each time so the DB will be dropped/created correctly **
