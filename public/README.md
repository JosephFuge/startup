# startup - Recursive Tic-Tac-Toe
Developed by Joseph Fuge, started in September 2023

## Spec/Description Deliverable

### Elevator Pitch

Just about everyone enjoyed a simple game of Tic-Tac-Toe as a child. Unfortunately, its simplicity and limited size means that strategy is limited and its novelty wears off quickly. All of this is remedied with **Recursive Tic-Tac-Toe**, where you can play a game up to three layers deep. Allow me to explain; in order to mark a square on the second layer, you have to win a Tic-Tac-Toe game within that square. Once you win three Tic-Tac-Toe games in a row on the second layer, you have now marked a square on the first layer. Feel free to leave your game and come back later or play it asynchronously when you have a spare moment until you prove your superior Tic-Tac-Toe strategy once and for all.

### Key Features

- User login
- Create games or continue in-progress matches
- Navigate through several layers of tic-tac-toe
- Participate in games asynchronously, advancing them even if only one user is online
- Alternatively, both users can play at the same time through realtime updates
- Send emoji reactions in realtime if both users are present
- User can see how many games they have won total

### Technologies
- HTML; structure of the website including login page, game pages, and score view
- CSS; styling for each page of HTML for an appealing aesthetic
- JavaScript; allows for dynamic functionality and display updates while on a page, communication with server
- Service; web service with endpoints for:
    - authentication
    - fetch in-progress games
    - send in and receive moves for ongoing games
    - create new games
    - allow emojis to be sent and received
- Database; store users, choices, and votes in database
- Login; register and login users, storing credentials in database
- WebSocket; as each user marks squares, their moves are sent to the other user, as are emoji reactions
- React; web framework to facilitate state changes and dynamic updates

### Design

This is what the game screen will look like when the user is actively playing a game of Recursive Tic-Tac-Toe.

![TicTacToe Game Screen](RecursiveTic-Tac-ToeDesign.png)

The following diagram demonstrates a typical flow of two users logging in and beginning a game with one another.

![TicTacToe Backend Server Diagram](RecursiveTic-Tac-ToeBackend.png)

## HTML Startup Deliverable

During this deliverable I built out the structure of my Recursive TicTacToe startup application in HTML.

**HTML:** Five HTML pages to account for logging in, creating a game, selecting a game, playing a game, and reading about Recursive TicTacToe.

**Links:** The login page links to the about page and to the game select page upon logging in or registering. From the game select page, you can navigate to an existing game or to the game creation page.

**Text Content:** The about page contains a description of Recursive TicTacToe.

**Images:** Added an image to the about page. Otherwise, I elected to use svg icons throughout the website.

**Login:** Username and password text inputs and a submit button for registration and login.

**Database:** The ongoing games will be generated from data pulled from the database.

**WebSocket:** Realtime game changes and emoji reactions on the game screen.

## CSS Startup Deliverable

During this deliverable I built out the styling of my Recursive TicTacToe startup application in CSS.

**Header, Footer, Main Content:** Header and footer stay at the bottom and tops of the pages and have their own background color and borders.

**Navigation elements:** Navigation buttons are styled with a separate color and glow on mouse hover

**Responsive to window resizing:** The Select Game and Play Game pages resize certain elements when the window is narrower

**Application elements:** Elements such as game cards, profile icon and emoji reactions, and other icons and elements are repositioned and styled using CSS. Includes gradients, glowing on hover, borders and border-radii, and more.

**Text content:** Text is realigned, colored, and has its font changed

**Images:** Gave glowing border to the image on the about page and positioned the svgs throughout the site.

## JavaScript Startup Deliverable

**Future Login Support:** User can type their name in and click login, which will store their name to LocalStorage and display it in headers throughout the website

**Future Database Data Support:** databaseAccess.js file contains a getUserGames() function to retrieve user games in the future. It also contains a saveNewGame() function to save user games in the future. This file will also be the home of any other future reads and writes to/from the database. 

**Future Websocket Support:** websocketAccess.js file contains a getUserEmoji function that will retrieve realtime emoji updates in the future. It also contains a sendUserEmoji function that will send realtime emoji updates in the future.

**Interaction Logic:** Game cards fill dynamically with database data. User can mark squares on the play game screen. TicTacToe board is marked with a bar when three circles or three x's are in a row, and new squares can't be marked. User can create new games on the create game page.


## Web Service Deliverable

During this deliverable I converted my static website into a RESTful web server with Node.js and Express

**HTTP Service using Node.js and Express:** Web content is served up by a Node.js server with Express routing, including static and json API responses

**Express static middleware:** See above

**Third party service endpoint:** About page has a different shiro dog image every time you load it

**Your backend provides service endpoints:** Updating and reading tictactoe game data uses server endpoints

**Your frontend calls your service endpoints:** Taking action such as creating games and playing them calls server endpoints

## Database Deliverable

**MongoDB Atlas database created:** Created a MongoDB Atlas database and connected it using information stored in dbConfig.json (not committed in GitHub for security)

**Provides backend endpoints for manipulating application data:** Users can create and play tictactoe games, which are uploaded  to the database by calling backend endpoints

**Stores application data in MongoDB:** MongoDB stores the current state of games including which marks have been made and whose turn it is.

## Login Deliverable

**Supports new user registration:** Use a register button on the home page to create new users.

**Supports existing user authentication:** Use a login page on the home page to authenticate and enter the website.

**Stores and retrieves credentials in MongoDB:** Node Express backend stores and retrieves users in/from MongoDB.

**Restricts application functionality based upon authentication:** APIs and pages that require authentication return a authenticate.