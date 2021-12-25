const express = require('express')
const cors = require('cors')
require('./config/DB')
const subsController = require('./controllers/subsController')
const usersController = require('./controllers/usersController')
const membersController = require('./controllers/membersController')
const moviesController = require('./controllers/moviesController')
const app = express()
// node cinemaWS.js to init
const corsOptions ={
    origin:"*",//['http://localhost:3000',process.env.baseURL], 
    credentials:true,                   //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,PUT,POST,DELETE"
}
 
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersController)
app.use('/api/movies', moviesController)
app.use('/api/subs', subsController)
app.use('/api/members', membersController)

const path = require("path");
app.use(express.static(path.resolve(__dirname, "./my-app/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
});

app.listen(process.env.PORT || 8000,
    () => console.log("The server is Running on port 8000")
);
