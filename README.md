Team Members: Che-An(Andy) Wu, Xiaoxiao(Annie) Qin, Tammer Mohamed
----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
**Introduction:**
- Web app that gamifies the painful experience of picking a restaurant to eat at with friends. Similar to Tinder, users can invite their friends to the game room, and all of them can like(swipe left) or dislike(swipe right) on the restaurant cards until they reach a reasonable consensus!
- Tech Stack: 
   - front-end: React.js, Javascript, CSS, HTML, Axios
   - back-end: Node.js, Express, REST APIs, Sqlite3, Websockets


**Key Features:**
- Restaurant cards are generated based on user-defined preferences (e.g. location, restaurant type, cuisine type, price range...etc)
- Real-time communication among clients. Once every player "likes" a restaurant, the result gets broadcasted to everyone.
- Simple, intuitive UI/UX that are pixel perfect and easy to use.


**Steps to run the project locally:**
- Git clone this project
- In project's directory, "yarn install" (or npm) to download the dependecies
- To start the project locally
- 1. run "node server.js" to start the server
- 2. run "yarn start" (or npm) to start the client
- MAKE SURE you close the original "host" tab (original homepage) and restart the server each time so the DB will be dropped/created correctly **
