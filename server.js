/////////////////////////////////////////////
// Import Our Dependencies --> commented out bits moved to connection for refactoring
/////////////////////////////////////////////
// require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
//const mongoose = require("mongoose")
const Movie = require("./models/movie")
const path = require("path")
const moviesController = require("./controllers/movie")
const userRouter = require("./controllers/user")

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
app.engine('jsx', require('express-react-views').createEngine())
app.set('view engine', 'jsx')


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
//why we're not using the next() middleware is because we're using router in the controllers/movie.js which has built in next()
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically


/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.use("/movies", moviesController)// send all "/fruits" routes to fruit router
app.use("/user", userRouter)// send all "/user" routes to user router

app.get("/", (req, res) => {
  // res.send("your server is running... better catch it.");
  res.render("Index.jsx")
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


//STUFF THAT WAS MOVED TO ITS OWN FILE

// /////////////////////////////////////////////
// // Database Connection
// /////////////////////////////////////////////
// // Setup inputs for our connect function --> moved when refactoring
// const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

// //Establish Connection
// mongoose.connect(DATABASE_URL, CONFIG)

// // Events for when connection opens/disconnects/errors
// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"))
//   .on("error", (error) => console.log(error))


// ////////////////////////////////////////////////
// // Our Models
// ////////////////////////////////////////////////
// // pull schema and model from mongoose using object destructuring
// const { Schema, model } = mongoose

// // make movie schema
// const movieSchema = new Schema({
//   title: {type: String, required: true},
//   releaseDate: String,
//   length: Number,
//   genre: String,
//   poster: {type: String, required: true},
//   director: {type: String, required: true},
//   rating: String,
//   watchAgain: Boolean,
//   cast: [{type: String}]
// })

// // make movie model
// const Movie = model("Movie", movieSchema)

//routes were here but moved to controllers folder